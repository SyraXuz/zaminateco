import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useIsMobile } from '../hooks/use-mobile';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

const FloatingCartIcon: React.FC = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const isMobile = useIsMobile();

  // Only show if cart has items AND cart is not open
  if (cartCount === 0 || isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className={cn(
          "fixed z-[60] rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500",
          "hover:from-green-600 hover:via-emerald-600 hover:to-teal-600",
          "flex items-center justify-center",
          "border-2 border-white",
          isMobile 
            ? "bottom-24 right-4 h-14 w-14" 
            : "bottom-6 right-6 h-16 w-16"
        )}
        aria-label="Open shopping cart"
      >
        <div className="relative">
          <img
            src="/images/add-to-cart.png"
            alt="Cart"
            className={cn(
              "object-contain filter drop-shadow-lg",
              isMobile ? "h-7 w-7" : "h-8 w-8"
            )}
          />
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2"
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
        </div>
        
        {/* Pulse animation ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingCartIcon;

