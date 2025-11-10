import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Car, Coffee, Utensils, Package, Plane, ExternalLink, Coins } from 'lucide-react';

const Partners = () => {
  const { t } = useTranslation();

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
      details: "Fresh fruits, vegetables, dairy products and cleaning supplies"
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
      details: "Taxi rides across Tashkent with comfort and economy options"
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
      details: "Coffee, tea, pastries and light meals in city center"
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
      details: "Traditional plov, shashlik, lagman and Uzbek cuisine"
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
      details: "Online grocery delivery: bread, meat, vegetables, household items"
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
      details: "Domestic and international flights from Tashkent airport"
    }
  ];

  return (
    <Layout title={t('ourPartners')}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('ourPartners')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('partnersDescription')}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-500">{t('activePartners')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-sm text-gray-500">{t('maxDiscount')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-gray-500">{t('minCoinsRequired')}</div>
              </div>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partners.map((partner) => {
              const IconComponent = partner.icon;
              return (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${partner.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {partner.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {partner.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{partner.details}</p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={`${partner.color} text-white hover:${partner.color}/80`}>
                          {partner.discount}% {t('off')}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Coins className="h-4 w-4 mr-1" />
                          {partner.coinsRequired} {t('required')}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={partner.coinsRequired <= 50 ? "default" : "outline"}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('viewOffer')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Separator className="my-12" />

          {/* How to Use Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">{t('howToUseOffers')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center font-bold text-lg mx-auto mb-3`}>
                    {item.step}
                  </div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-center text-white mb-20">
            <h3 className="text-2xl font-bold mb-4">{t('startEarningToday')}</h3>
            <p className="mb-6 opacity-90">
              {t('startEarningDescription')}
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              <Coins className="h-5 w-5 mr-2" />
              {t('startCollecting')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;