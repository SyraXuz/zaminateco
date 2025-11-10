import React from 'react';
import { ShoppingBag, TrendingUp, Phone, Info } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTranslation } from 'react-i18next';

// Sample product data with translation keys
const productData = [
  {
    id: 1,
    emoji: '🏗️',
    nameKey: 'products.epdmFreeTiles.name',
    descriptionKey: 'products.epdmFreeTiles.description',
    infoKey: 'products.epdmFreeTiles.info',
    categoryKey: 'products.epdmFreeTiles.category',
    price: '219 000 UZS',
    pricingKey: 'pricing.perSqM'
  },
  {
    id: 2,
    emoji: '🛝',
    nameKey: 'products.epdmRubberEcotiles.name',
    descriptionKey: 'products.epdmRubberEcotiles.description',
    infoKey: 'products.epdmRubberEcotiles.info',
    categoryKey: 'products.epdmRubberEcotiles.category',
    price: '539 000 UZS',
    pricingKey: 'pricing.perSqM'
  },
  {
    id: 3,
    emoji: '🧱',
    nameKey: 'products.ecoBrick.name',
    descriptionKey: 'products.ecoBrick.description',
    categoryKey: 'products.ecoBrick.category',
    price: '99 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 4,
    emoji: '🗑️',
    nameKey: 'products.wasteBin.name',
    descriptionKey: 'products.wasteBin.description',
    categoryKey: 'products.wasteBin.category',
    price: '79 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 5,
    emoji: '🪴',
    nameKey: 'products.gardenPlanter.name',
    descriptionKey: 'products.gardenPlanter.description',
    categoryKey: 'products.gardenPlanter.category',
    price: '149 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 6,
    emoji: '🪑',
    nameKey: 'products.ecoBench.name',
    descriptionKey: 'products.ecoBench.description',
    categoryKey: 'products.ecoBench.category',
    price: '790 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 7,
    emoji: '🚲',
    nameKey: 'products.ecobikeRack.name',
    descriptionKey: 'products.ecobikeRack.description',
    categoryKey: 'products.ecobikeRack.category',
    price: '490 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 8,
    emoji: '🚌',
    nameKey: 'products.ecobusStop.name',
    descriptionKey: 'products.ecobusStop.description',
    categoryKey: 'products.ecobusStop.category',
    price: '8 590 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 9,
    emoji: '🎨',
    nameKey: 'products.playgroundBlock.name',
    descriptionKey: 'products.playgroundBlock.description',
    categoryKey: 'products.playgroundBlock.category',
    price: '49 000 UZS',
    pricingKey: 'pricing.perPiece'
  },
  {
    id: 10,
    emoji: '🏙️',
    nameKey: 'products.ecostreetFurniture.name',
    descriptionKey: 'products.ecostreetFurniture.description',
    categoryKey: 'products.ecostreetFurniture.category',
    isCallForPrice: true
  }
];

// Category data with translation keys
const categoryData = [
  {
    emoji: '🏗️',
    nameKey: 'categories.construction.name',
    descriptionKey: 'categories.construction.description'
  },
  {
    emoji: '🛝',
    nameKey: 'categories.recreation.name',
    descriptionKey: 'categories.recreation.description'
  },
  {
    emoji: '🪑',
    nameKey: 'categories.furniture.name',
    descriptionKey: 'categories.furniture.description'
  },
  {
    emoji: '🏙️',
    nameKey: 'categories.infrastructure.name',
    descriptionKey: 'categories.infrastructure.description'
  }
];

export default function SocialMissionShop() {
  const { t } = useTranslation(['shop', 'translation']);

  return (
    <Layout title={t('shop', { ns: 'translation' })}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-6 space-y-mobile">
          {/* Header */}
          <div className="text-center space-y-1 sm:space-y-2">
            <h2 className="text-lg sm:text-2xl font-bold section-title-mobile">
              {t('title', { ns: 'shop' })}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {t('subtitle', { ns: 'shop' })}
            </p>
          </div>

          {/* Stats */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 card-mobile">
            <CardContent className="p-3 sm:p-4 card-content-mobile">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-green-600 stats-value-mobile">2,500</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('stats.kgRecycled', { ns: 'shop' })}</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-600 stats-value-mobile">156</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('stats.productsSold', { ns: 'shop' })}</div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-purple-600 stats-value-mobile">12</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('stats.projectsFunded', { ns: 'shop' })}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eco Products Section */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center section-title-mobile">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 icon-md-mobile" />
              {t('sections.ecoProducts', { ns: 'shop' })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {productData.map((product) => (
                <Card key={product.id} className="eco-card-hover card-mobile">
                  <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3 card-content-mobile">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                          <span className="text-lg sm:text-2xl">{product.emoji}</span>
                          <div>
                            <h4 className="font-medium text-xs sm:text-sm">
                              {t(product.nameKey, { ns: 'shop' })}
                            </h4>
                            <Badge className="text-xs">
                              {t(product.categoryKey, { ns: 'shop' })}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1 sm:mb-2">
                          {t(product.descriptionKey, { ns: 'shop' })}
                        </p>
                        {product.infoKey && (
                          <p className="text-xs text-blue-600 mb-1 sm:mb-2">
                            <Info className="h-2 w-2 sm:h-3 sm:w-3 inline mr-0.5 sm:mr-1" />
                            {t(product.infoKey, { ns: 'shop' })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-center">
                        {product.isCallForPrice ? (
                          <div className="text-sm sm:text-lg font-bold text-orange-600 mb-1 sm:mb-2">
                            {t('pricing.callForPrice', { ns: 'shop' })}
                          </div>
                        ) : (
                          <>
                            <div className="text-sm sm:text-xl font-bold text-green-600 mb-1 stats-value-mobile">
                              {product.price}
                            </div>
                            <div className="text-xs text-gray-500">
                              {t(product.pricingKey, { ns: 'shop' })}
                            </div>
                          </>
                        )}
                      </div>
                      <Button 
                        className={`w-full text-xs sm:text-sm py-1 sm:py-2 h-7 sm:h-9 ${
                          product.isCallForPrice 
                            ? 'bg-background hover:bg-accent hover:text-accent-foreground border border-input' 
                            : 'bg-green-600 hover:bg-green-700 text-primary-foreground'
                        }`}
                        variant={product.isCallForPrice ? "outline" : "default"}
                      >
                        {product.isCallForPrice ? (
                          <>
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 icon-sm-mobile" />
                            {t('buttons.contactUs', { ns: 'shop' })}
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 icon-sm-mobile" />
                            {t('buttons.addToCart', { ns: 'shop' })}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <Card className="bg-blue-50 card-mobile">
            <CardHeader className="card-header-mobile">
              <CardTitle className="text-blue-800 text-lg sm:text-2xl section-title-mobile">
                {t('sections.howItWorks', { ns: 'shop' })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-700 card-content-mobile">
              <p>
                • <strong>{t('howItWorksPoints.recycledMaterials.title', { ns: 'shop' })}</strong> {t('howItWorksPoints.recycledMaterials.description', { ns: 'shop' })}
              </p>
              <p>
                • <strong>{t('howItWorksPoints.qualityGuaranteed.title', { ns: 'shop' })}</strong> {t('howItWorksPoints.qualityGuaranteed.description', { ns: 'shop' })}
              </p>
              <p>
                • <strong>{t('howItWorksPoints.localProduction.title', { ns: 'shop' })}</strong> {t('howItWorksPoints.localProduction.description', { ns: 'shop' })}
              </p>
              <p>
                • <strong>{t('howItWorksPoints.communityImpact.title', { ns: 'shop' })}</strong> {t('howItWorksPoints.communityImpact.description', { ns: 'shop' })}
              </p>
            </CardContent>
          </Card>

          {/* Popular Categories */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center section-title-mobile">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 icon-md-mobile" />
              {t('sections.popularCategories', { ns: 'shop' })}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {categoryData.map((category, index) => (
                <Card key={index} className="eco-card-hover cursor-pointer card-mobile">
                  <CardContent className="p-3 sm:p-4 text-center card-content-mobile">
                    <span className="text-2xl sm:text-3xl mb-1 sm:mb-2 block">{category.emoji}</span>
                    <h4 className="font-medium text-sm sm:text-base">
                      {t(category.nameKey, { ns: 'shop' })}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t(category.descriptionKey, { ns: 'shop' })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Bottom CTA Section */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 card-mobile">
            <CardContent className="p-4 sm:p-6 text-center card-content-mobile">
              <h3 className="text-lg sm:text-xl font-bold mb-2 bottom-title-mobile">
                {t('bottomSection.title', { ns: 'shop' })}
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base bottom-description-mobile">
                {t('bottomSection.description', { ns: 'shop' })}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Button className="bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 bottom-button-mobile">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 icon-sm-mobile" />
                  {t('buttons.startShopping', { ns: 'shop' })}
                </Button>
                <Button variant="outline" className="text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 bottom-button-mobile">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 icon-sm-mobile" />
                  {t('buttons.contactForBulkOrders', { ns: 'shop' })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}