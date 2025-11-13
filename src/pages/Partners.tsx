import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Car, Coffee, Utensils, Package, Plane, ExternalLink, Coins } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import '../styles/mobile-responsive.css';

const Partners = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const partners = [
    {
      id: 1,
      name: t('carrefourTashkent'),
      category: t('grocery'),
      icon: ShoppingBag,
      color: 'bg-green-500',
      discount: '15',
      coinsRequired: 30,
      description: t('carrefourDesc'),
      details: t('partnerDescriptions.groceryStore', { ns: 'shop' })
    },
    {
      id: 2,
      name: t('yandexTaxi'),
      category: t('transport'),
      icon: Car,
      color: 'bg-yellow-500',
      discount: '10',
      coinsRequired: 25,
      description: t('yandexTaxiDesc'),
      details: t('partnerDescriptions.taxiRides', { ns: 'shop' })
    },
    {
      id: 3,
      name: t('coffeeBeanCafe'),
      category: t('food'),
      icon: Coffee,
      color: 'bg-orange-500',
      discount: '25',
      coinsRequired: 15,
      description: t('coffeeBeanDesc'),
      details: t('partnerDescriptions.coffeeShop', { ns: 'shop' })
    },
    {
      id: 4,
      name: t('samarkandDarvoza'),
      category: t('restaurant'),
      icon: Utensils,
      color: 'bg-red-500',
      discount: '25',
      coinsRequired: 40,
      description: t('samarkandDesc'),
      details: t('partnerDescriptions.restaurant', { ns: 'shop' })
    },
    {
      id: 5,
      name: t('korzinkaUz'),
      category: t('delivery'),
      icon: Package,
      color: 'bg-blue-500',
      discount: '12',
      coinsRequired: 20,
      description: t('korzinkaDesc'),
      details: t('partnerDescriptions.grocery', { ns: 'shop' })
    },
    {
      id: 6,
      name: t('uzbekistanAirways'),
      category: t('travel'),
      icon: Plane,
      color: 'bg-purple-500',
      discount: '5',
      coinsRequired: 100,
      description: t('uzbekistanAirwaysDesc'),
      details: t('partnerDescriptions.airline', { ns: 'shop' })
    }
  ];

  return (
    <Layout title={t('ourPartners')}>
      <div className={cn("min-h-screen bg-gradient-to-br from-green-50 to-blue-50", isMobile ? "p-2" : "p-4")}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={cn("text-center", isMobile ? "mb-6" : "mb-12")}>
            <h1 className={cn(
              "font-bold text-gray-900",
              isMobile ? "text-xl mb-2" : "text-4xl mb-4"
            )}>
              {t('ourPartners')}
            </h1>
            <p className={cn(
              "text-gray-600 max-w-3xl mx-auto",
              isMobile ? "text-xs px-2" : "text-lg"
            )}>
              {t('partnersDescription')}
            </p>
            
            {/* Stats */}
            <div className={cn(
              "flex justify-center",
              isMobile ? "gap-3 mt-4" : "gap-8 mt-8"
            )}>
              <div className="text-center">
                <div className={cn("font-bold text-green-600", isMobile ? "text-base" : "text-2xl")}>6</div>
                <div className={cn("text-gray-500", isMobile ? "text-[10px]" : "text-sm")}>{t('activePartners')}</div>
              </div>
              <div className="text-center">
                <div className={cn("font-bold text-blue-600", isMobile ? "text-base" : "text-2xl")}>25%</div>
                <div className={cn("text-gray-500", isMobile ? "text-[10px]" : "text-sm")}>{t('maxDiscount')}</div>
              </div>
              <div className="text-center">
                <div className={cn("font-bold text-purple-600", isMobile ? "text-base" : "text-2xl")}>15</div>
                <div className={cn("text-gray-500", isMobile ? "text-[10px]" : "text-sm")}>{t('minCoinsRequired')}</div>
              </div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className={cn(
            "grid grid-cols-1",
            isMobile ? "gap-3 mb-6" : "md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          )}>
            {partners.map((partner) => {
              const IconComponent = partner.icon;
              return (
                <Card key={partner.id} className={cn(
                  "transition-shadow",
                  isMobile ? "" : "hover:shadow-lg"
                )}>
                  <CardHeader className={cn(isMobile ? "pb-2 p-3" : "pb-3")}>
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        `rounded-lg ${partner.color} text-white flex items-center justify-center`,
                        isMobile ? "p-1.5" : "p-2"
                      )}>
                        <IconComponent className={cn(isMobile ? "h-4 w-4" : "h-6 w-6")} />
                      </div>
                      <Badge variant="secondary" className={cn(isMobile ? "text-[10px] px-1.5 py-0.5" : "text-xs")}>
                        {partner.category}
                      </Badge>
                    </div>
                    <CardTitle className={cn(isMobile ? "text-sm mb-1" : "text-lg")}>{partner.name}</CardTitle>
                    <CardDescription className={cn(isMobile ? "text-xs" : "text-sm")}>
                      {partner.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={cn(isMobile ? "p-3 space-y-2" : "space-y-3")}>
                    <p className={cn(isMobile ? "text-[10px] text-gray-600" : "text-sm text-gray-600")}>{partner.details}</p>
                    
                    <div className={cn(
                      "flex items-center justify-between",
                      isMobile ? "mb-2" : ""
                    )}>
                      <Badge className={cn(
                        `${partner.color} text-white`,
                        isMobile ? "text-[10px] px-1.5 py-0.5" : ""
                      )}>
                        {partner.discount}% {t('off')}
                      </Badge>
                      <div className={cn(
                        "flex items-center text-gray-500",
                        isMobile ? "text-[10px]" : "text-sm"
                      )}>
                        <Coins className={cn(isMobile ? "h-3 w-3 mr-0.5" : "h-4 w-4 mr-1")} />
                        {partner.coinsRequired} {t('required')}
                      </div>
                    </div>
                    
                    <Button 
                      className={cn(
                        "w-full",
                        isMobile ? "h-9 text-xs py-2" : ""
                      )}
                      variant="default"
                      style={{ touchAction: 'manipulation' }}
                    >
                      <ExternalLink className={cn(isMobile ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2")} />
                      {t('viewOffer')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Separator className={cn(isMobile ? "my-6" : "my-12")} />

          {/* How to Use Section */}
          <div className={cn(isMobile ? "mb-6" : "mb-12")}>
            <h2 className={cn(
              "font-bold text-center",
              isMobile ? "text-base mb-4" : "text-2xl mb-8"
            )}>
              {t('howToUseOffers')}
            </h2>
            <div className={cn(
              "grid grid-cols-2",
              isMobile ? "gap-3" : "md:grid-cols-2 lg:grid-cols-4 gap-6"
            )}>
              {[
                {
                  step: "1",
                  title: t('earnCoinsStep'),
                  color: "bg-green-100 text-green-800"
                },
                {
                  step: "2", 
                  title: t('checkOffersStep'),
                  color: "bg-blue-100 text-blue-800"
                },
                {
                  step: "3",
                  title: t('redeemStep'),
                  color: "bg-purple-100 text-purple-800"
                },
                {
                  step: "4",
                  title: t('enjoyStep'),
                  color: "bg-orange-100 text-orange-800"
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={cn(
                    `rounded-full ${item.color} flex items-center justify-center font-bold mx-auto mb-2`,
                    isMobile ? "w-10 h-10 text-sm" : "w-12 h-12 text-lg mb-3"
                  )}>
                    {item.step}
                  </div>
                  <p className={cn(isMobile ? "text-[10px] text-gray-600" : "text-sm text-gray-600")}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={cn(
            "bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-center text-white",
            isMobile ? "p-4 mb-16" : "p-8 mb-20"
          )}>
            <h3 className={cn(
              "font-bold",
              isMobile ? "text-base mb-2" : "text-2xl mb-4"
            )}>
              {t('startEarningToday')}
            </h3>
            <p className={cn(
              "opacity-90",
              isMobile ? "text-xs mb-3" : "mb-6"
            )}>
              {t('startEarningDescription')}
            </p>
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="secondary" 
              className={cn(
                "bg-white text-green-600 hover:bg-gray-100",
                isMobile ? "h-9 text-xs py-2 px-4" : ""
              )}
              style={{ touchAction: 'manipulation' }}
            >
              <Coins className={cn(isMobile ? "h-3 w-3 mr-1.5" : "h-5 w-5 mr-2")} />
              {t('startCollecting')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;