import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../hooks/use-mobile';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

const CartSidebar: React.FC = () => {
  const { t } = useTranslation(['shop', 'translation']);
  const isMobile = useIsMobile();
  const {
    cart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const [removingItem, setRemovingItem] = useState<number | null>(null);
  const total = getCartTotal();

  // Format price for display
  const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
    }
    return price;
  };

  // Calculate item total price
  const getItemTotal = (item: { price: string; quantity: number }): number => {
    const priceValue = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return priceValue * item.quantity;
  };

  const handleRemoveItem = (itemId: number) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
      toast.success(t('itemRemoved', { defaultValue: 'Item removed from cart', ns: 'translation' }));
    }, 200);
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    clearCart();
    toast.success(t('cartCleared', { defaultValue: 'Cart cleared', ns: 'translation' }));
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className={cn(
          "p-0 flex flex-col overflow-hidden bg-white [&>button]:hidden",
          isMobile 
            ? "w-[85vw] max-w-[360px]" 
            : "w-full sm:w-[420px] lg:w-[480px]"
        )}
      >
        {/* Mobile-Optimized Header */}
        <SheetHeader className={cn(
          "relative border-b bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white overflow-hidden flex-shrink-0",
          isMobile ? "p-3" : "p-4 sm:p-6"
        )}>
          {/* Simplified Background Pattern for Mobile */}
          {!isMobile && (
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <motion.div
                className="relative flex-shrink-0"
                animate={cartCount > 0 && !isMobile ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                } : {}}
                transition={{ duration: 0.5, repeat: cartCount > 0 && !isMobile ? Infinity : 0, repeatDelay: 2 }}
              >
                <img
                  src="/images/add-to-cart.png"
                  alt="Cart"
                  className={cn(
                    "object-contain drop-shadow-lg",
                    isMobile ? "w-9 h-9" : "w-12 h-12"
                  )}
                />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5"
                  >
                    <Badge
                      className={cn(
                        "bg-red-500 text-white border-2 border-white shadow-lg font-bold flex items-center justify-center",
                        isMobile ? "h-5 w-5 text-[10px] px-0" : "h-6 w-6 text-xs px-0"
                      )}
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
              <div className="flex-1 min-w-0">
                <SheetTitle className={cn(
                  "font-bold text-white drop-shadow-md truncate",
                  isMobile ? "text-base" : "text-xl"
                )}>
                  {t('cart', { defaultValue: 'Shopping Cart', ns: 'translation' })}
                </SheetTitle>
                {cartCount > 0 && (
                  <p className={cn(
                    "text-green-50 opacity-90 truncate",
                    isMobile ? "text-[11px] mt-0.5" : "text-sm mt-1"
                  )}>
                    {cartCount} {cartCount === 1 ? t('item', { defaultValue: 'item', ns: 'translation' }) : t('items', { defaultValue: 'items', ns: 'translation' })}
                  </p>
                )}
              </div>
            </div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className={cn(
                  "text-white hover:bg-white/20 hover:text-white",
                  isMobile ? "h-10 w-10" : "h-9 w-9"
                )}
              >
                <X className={cn(isMobile ? "h-5 w-5" : "h-5 w-5")} />
              </Button>
            </motion.div>
          </div>
        </SheetHeader>

        {/* Mobile-Optimized Product List */}
        <div className={cn(
          "flex-1 overflow-y-auto",
          isMobile ? "p-2" : "p-4 sm:p-6"
        )}>
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-full text-center"
                style={{ minHeight: isMobile ? '60vh' : 'auto' }}
              >
                <motion.div
                  animate={!isMobile ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ShoppingBag className={cn(
                    "text-gray-300",
                    isMobile ? "h-16 w-16" : "h-24 w-24"
                  )} />
                </motion.div>
                <div className={cn("space-y-2", isMobile ? "mt-4" : "mt-6")}>
                  <h3 className={cn(
                    "font-bold text-gray-700",
                    isMobile ? "text-base" : "text-xl"
                  )}>
                    {t('cartEmpty', { defaultValue: 'Your cart is empty', ns: 'translation' })}
                  </h3>
                  <p className={cn(
                    "text-gray-500",
                    isMobile ? "text-xs px-4" : "text-base"
                  )}>
                    {t('addItemsToCart', { defaultValue: 'Add items to get started', ns: 'translation' })}
                  </p>
                </div>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className={cn(
                    "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg mt-4",
                    isMobile ? "h-11 text-sm px-6" : "h-12 text-base px-8"
                  )}
                >
                  <ArrowRight className={cn("mr-2", isMobile ? "h-4 w-4" : "h-5 w-5")} />
                  {t('continueShopping', { defaultValue: 'Continue Shopping', ns: 'translation' })}
                </Button>
              </motion.div>
            ) : (
              <div className={cn("space-y-2", isMobile ? "" : "space-y-3 sm:space-y-4")}>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ 
                      opacity: 0, 
                      x: 20,
                      scale: 0.8,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.03
                    }}
                    className={removingItem === item.id ? "opacity-50" : ""}
                  >
                    <Card className={cn(
                      "border bg-white overflow-hidden",
                      isMobile 
                        ? "border-gray-200 shadow-sm" 
                        : "border-2 border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-300"
                    )}>
                      <CardContent className={cn(
                        isMobile ? "p-2.5" : "p-3 sm:p-4"
                      )}>
                        {/* Horizontal Layout for Both Mobile and Desktop */}
                        <div className="flex space-x-2.5 sm:space-x-3 sm:space-x-4">
                          {/* Product Image - Compact on Mobile */}
                          <div className={cn(
                            "flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200",
                            isMobile ? "w-16 h-16" : "w-20 h-20 sm:w-24 sm:h-24"
                          )}>
                            <img
                              src={item.image || '/images/art-tiles.png'}
                              alt={item.name}
                              className={cn(
                                "w-full h-full object-contain",
                                isMobile ? "p-1" : "p-1"
                              )}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/art-tiles.png';
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                            {/* Product Name & Description */}
                            <div>
                              <h4 className={cn(
                                "font-bold text-gray-800",
                                isMobile ? "text-sm leading-tight" : "text-base"
                              )}>
                                {item.name}
                              </h4>
                              {item.description && (
                                <p className={cn(
                                  "text-gray-600 mt-1",
                                  isMobile ? "text-xs line-clamp-2" : "text-sm line-clamp-2"
                                )}>
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Price Section - Mobile Optimized */}
                            <div className={cn(
                              isMobile ? "space-y-1.5" : "space-y-1"
                            )}>
                              <div className={cn(
                                "flex items-baseline gap-1.5",
                                isMobile ? "flex-wrap" : ""
                              )}>
                                <p className={cn(
                                  "font-bold text-green-600",
                                  isMobile ? "text-sm" : "text-base"
                                )}>
                                  {formatPrice(item.price)}
                                </p>
                                <span className={cn(
                                  "text-gray-400",
                                  isMobile ? "text-[10px]" : "text-xs"
                                )}>
                                  {t('perUnit', { defaultValue: 'each', ns: 'translation' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className={cn(
                                  "text-gray-500 font-medium",
                                  isMobile ? "text-[11px]" : "text-xs"
                                )}>
                                  {t('itemTotal', { defaultValue: 'Item Total', ns: 'translation' })}:
                                </span>
                                <span className={cn(
                                  "font-bold text-gray-700",
                                  isMobile ? "text-xs" : "text-sm"
                                )}>
                                  {formatPrice(getItemTotal(item))}
                                </span>
                              </div>
                            </div>

                            {/* Quantity Controls - Mobile Optimized with Larger Touch Targets */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <motion.div whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                      "border-2 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-colors",
                                      isMobile 
                                        ? "h-9 w-9 border-green-300" 
                                        : "h-8 w-8"
                                    )}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                                  </Button>
                                </motion.div>
                                <motion.div
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className={cn(
                                    "font-bold text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-md flex items-center justify-center",
                                    isMobile 
                                      ? "min-w-[2.5rem] h-9 text-xs px-2" 
                                      : "min-w-[2.5rem] text-sm px-3 py-1"
                                  )}
                                >
                                  {item.quantity}
                                </motion.div>
                                <motion.div whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                      "border-2 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-colors",
                                      isMobile 
                                        ? "h-9 w-9 border-green-300" 
                                        : "h-8 w-8"
                                    )}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                                  </Button>
                                </motion.div>
                              </div>
                              <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "text-red-500 hover:text-white hover:bg-red-500 transition-all",
                                    isMobile 
                                      ? "h-9 w-9" 
                                      : "h-8 w-8"
                                  )}
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className={cn(isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile-Optimized Cart Footer */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "border-t-2 border-gray-200 bg-gradient-to-br from-white via-green-50/30 to-white shadow-2xl flex-shrink-0",
              isMobile ? "p-3 space-y-3" : "p-4 sm:p-6 space-y-4"
            )}
          >
            {/* Summary Section */}
            <div className={cn("space-y-2", isMobile ? "" : "space-y-3")}>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "font-semibold text-gray-700",
                  isMobile ? "text-sm" : "text-base"
                )}>
                  {t('subtotal', { defaultValue: 'Subtotal', ns: 'translation' })}:
                </span>
                <span className={cn(
                  "font-bold text-green-600",
                  isMobile ? "text-sm" : "text-lg"
                )}>
                  {formatPrice(total)}
                </span>
              </div>
              
              <Separator className="bg-gray-200" />
              
              <div className={cn(
                "flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200",
                isMobile ? "p-2.5" : "p-3"
              )}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={cn(
                    "text-green-600 flex-shrink-0",
                    isMobile ? "h-4 w-4" : "h-5 w-5"
                  )} />
                  <span className={cn(
                    "font-bold text-gray-800",
                    isMobile ? "text-sm" : "text-lg"
                  )}>
                    {t('total', { defaultValue: 'Total', ns: 'translation' })}:
                  </span>
                </div>
                <motion.span
                  key={total}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "font-bold text-green-600",
                    isMobile ? "text-lg" : "text-2xl"
                  )}
                >
                  {formatPrice(total)}
                </motion.span>
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className={cn(
              "flex gap-2",
              isMobile ? "flex-col" : "flex-col sm:flex-row sm:gap-3"
            )}>
              <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className={cn(
                    "w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300",
                    isMobile ? "h-12 text-sm font-semibold" : "h-11 text-sm"
                  )}
                >
                  <Trash2 className={cn(
                    "mr-2",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  {t('clearCart', { defaultValue: 'Clear Cart', ns: 'translation' })}
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={() => {
                    toast.info(t('checkoutComingSoon', { defaultValue: 'Checkout coming soon!', ns: 'translation' }));
                  }}
                  className={cn(
                    "w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white shadow-lg font-bold",
                    isMobile ? "h-12 text-sm" : "h-11 text-sm"
                  )}
                >
                  <Sparkles className={cn(
                    "mr-2",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  {t('checkout', { defaultValue: 'Checkout', ns: 'translation' })}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
