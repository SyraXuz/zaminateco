import { Filter, Navigation, MapPin, Recycle } from 'lucide-react';
import Layout from '@/components/Layout';
import EcoCounter from '@/components/EcoCounter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { getCollectionPoints } from '@/lib/collectionData';
import '../styles/mobile-responsive.css';

export default function EcoMap() {
  const { t } = useTranslation();
  
  // Get translated collection points
  const collectionPoints = getCollectionPoints(t);

  return (
    <Layout title={t('ecoMap')}>
      <div className="p-2 sm:p-4 space-y-3 sm:space-y-4 space-y-mobile">
        {/* Stats Overview - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 gap-mobile">
          <EcoCounter
            title={t('totalCollected')}
            value="2.6K"
            unit={t('kg')}
            icon="waste"
            trend={12}
            color="green"
            description={t('plasticRubberDescription')}
          />
          <EcoCounter
            title={t('activePoints')}
            value="3"
            icon="projects"
            trend={8}
            color="blue"
            description={t('activePointsDescription')}
          />
        </div>

        {/* Filter Controls - Mobile Optimized */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 h-8 sm:h-9">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 icon-sm-mobile" />
              {t('filter')}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 h-8 sm:h-9">
              <Navigation className="h-3 w-3 sm:h-4 sm:w-4 mr-1 icon-sm-mobile" />
              {t('myLocation')}
            </Button>
          </div>
        </div>

        {/* Interactive Map - Mobile Optimized */}
        <Card className="card-mobile">
          <CardHeader className="card-header-mobile">
            <CardTitle className="flex items-center text-lg sm:text-2xl section-title-mobile">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 icon-md-mobile" />
              {t('collectionPointsInTashkent')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-b-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.0544554087!2d69.13928!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tashkent Collection Points Map"
              />
              <div className="absolute inset-0 pointer-events-none">
                {/* Central Park Marker */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <div className="bg-green-600 text-white p-1 sm:p-2 rounded-full shadow-lg animate-pulse">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="bg-white px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-md text-xs mt-0.5 sm:mt-1 whitespace-nowrap">
                    Central Park
                  </div>
                </div>

                {/* Chilonzor Marker */}
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <div className="bg-blue-600 text-white p-1 sm:p-2 rounded-full shadow-lg animate-pulse">
                    <Recycle className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="bg-white px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-md text-xs mt-0.5 sm:mt-1 whitespace-nowrap">
                    Chilonzor
                  </div>
                </div>

                {/* Yunusobod Marker */}
                <div className="absolute top-1/4 right-1/3 transform translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <div className="bg-purple-600 text-white p-1 sm:p-2 rounded-full shadow-lg animate-pulse">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="bg-white px-1 sm:px-2 py-0.5 sm:py-1 rounded shadow-md text-xs mt-0.5 sm:mt-1 whitespace-nowrap">
                    Yunusobod
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Collection Points - Mobile Optimized */}
        <Card className="card-mobile">
          <CardHeader className="card-header-mobile">
            <CardTitle className="text-lg sm:text-2xl section-title-mobile">{t('nearbyCollectionPoints')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 card-content-mobile">
            {collectionPoints.map((point) => (
              <div key={point.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`p-1 sm:p-2 rounded-full ${
                    point.type === 'plastic' ? 'bg-green-100 text-green-600' :
                    point.type === 'tires' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {point.emoji}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{point.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{point.collected} {t('kmCollected')}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5 sm:mt-1">
                      <Badge className="text-xs">{t('active')}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {point.type === 'plastic' ? t('plastic') : 
                         point.type === 'tires' ? t('tires') : 
                         t('mixed')}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 h-7 sm:h-9">
                    {t('navigate')}
                  </Button>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{point.distance} {t('kmAway')}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Collection Summary - Mobile Optimized */}
        <Card className="bg-blue-50 card-mobile">
          <CardHeader className="card-header-mobile">
            <CardTitle className="font-semibold tracking-tight text-blue-800 text-sm sm:text-base">
              {t('collectionSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content-mobile">
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-700">
              <div className="flex justify-between">
                <span>{t('tashkentCentralPark')}:</span>
                <span>1250.5 {t('kg')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('chilonzorMahalla')}:</span>
                <span>890.2 {t('kg')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('yunusobodDistrict')}:</span>
                <span>456.8 {t('kg')}</span>
              </div>
              <hr className="border-blue-200" />
              <div className="flex justify-between font-bold">
                <span>{t('totalCollected')}:</span>
                <span>2597.5 {t('kg')} (2.6K{t('kg')})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Tips - Mobile Optimized */}
        <Card className="bg-green-50 card-mobile">
          <CardHeader className="card-header-mobile">
            <CardTitle className="text-lg sm:text-2xl font-semibold leading-none tracking-tight text-green-800 section-title-mobile">
              {t('collectionTips')}
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content-mobile">
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-green-700">
              <p>• {t('plasticItems')}</p>
              <p>• {t('rubberItems')}</p>
              <p>• {t('preparation')}</p>
              <p>• {t('rewards')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}