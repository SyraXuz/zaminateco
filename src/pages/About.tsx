import { Leaf, Users, Target, Globe, Award, Heart, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TreeIcon, RecyclingIcon, UzbekPattern } from '@/components/EcoIcons';
import { globalStats, goals2026 } from '@/lib/mockData';

export default function About() {
  const { t } = useTranslation();

  const roadmap = [
    { 
      year: '2025', 
      event: t('pilotLaunch'), 
      description: t('pilotLaunchDesc')
    },
    { 
      year: '2026', 
      event: t('regionalExpansion'), 
      description: t('regionalExpansionDesc')
    },
    { 
      year: '2027', 
      event: t('industrialScale'), 
      description: t('industrialScaleDesc')
    },
    { 
      year: '2028-2029', 
      event: t('nationalImpact'), 
      description: t('nationalImpactDesc')
    },
  ];

  const values = [
    {
      icon: <RecyclingIcon className="h-8 w-8" />,
      title: t('circularEconomy'),
      description: t('circularEconomyDesc')
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('communityUnity'),
      description: t('communityUnityDesc')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('transparency'),
      description: t('transparencyDesc')
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('socialImpact'),
      description: t('socialImpactDesc')
    }
  ];

  return (
    <Layout title={t('aboutProject')}>
      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <section className="zaminat-gradient rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            <TreeIcon className="h-32 w-32" animated />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">{t('aboutZaminatEco')}</h1>
            <p className="text-lg opacity-90 mb-4 leading-relaxed">
              <strong>ZAMINAT.eco</strong> {t('aboutZaminatDesc')}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 text-white border-white/30">
                {t('plasticRubberRecyclingBadge')}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {t('ecoAppPlatformBadge')}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {t('ecoProductsBadge')}
              </Badge>
            </div>
          </div>
          <UzbekPattern className="w-full h-2 mt-4 text-white opacity-50" />
        </section>

        {/* Mission Statement */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-green-600" />
                {t('ourMission')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>{t('missionStatement')}</strong>
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t('whatWeDo')}</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>{t('plastic')}</strong> {t('plasticRecyclingIntoTiles')}</li>
                    <li>• <strong>{t('tires')}</strong> {t('rubberRecyclingIntoPlayground')}</li>
                    <li>• {t('communityInfrastructureProjects')}</li>
                    <li>• {t('educationalProgramsAndVolunteers')}</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">{t('ourImpactGoals')}</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• {t('schoolsAndPlaygrounds')}</li>
                    <li>• {t('parksAndPublicSpaces')}</li>
                    <li>• {t('transparentWasteTracking')}</li>
                    <li>• {t('gamifiedEnvironmentalEngagement')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            {t('ourValues')}
          </h2>
          <div className="grid gap-4">
            {values.map((value, index) => (
              <Card key={index} className="eco-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-green-600">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('ourRoadmap')}</h2>
          <div className="space-y-4">
            {roadmap.map((milestone, index) => (
              <Card key={index} className="eco-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Progress vs Goals */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 mr-2 text-blue-600" />
                {t('currentProgressAnd2026Goals')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>ZAMINAT.eco</strong> {t('currentProgressDesc')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">{t('currentStatus2025')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('plasticRubberRecycledLabel')}</span>
                      <span className="font-semibold">{globalStats.totalWasteCollected} {t('kg')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('activeUsersLabel')}</span>
                      <span className="font-semibold">{globalStats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('pilotProjectsLabel')}</span>
                      <span className="font-semibold">{globalStats.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('treesPlantedLabel')}</span>
                      <span className="font-semibold">{globalStats.treesPlanted}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">{t('2026Goals')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t('wasteTargetLabel')}</span>
                      <span className="font-semibold">{(goals2026.wasteTarget / 1000).toLocaleString()} {t('tons')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('userTargetLabel')}</span>
                      <span className="font-semibold">{goals2026.usersTarget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('projectTargetLabel')}</span>
                      <span className="font-semibold">{goals2026.projectsTarget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t('treeTargetLabel')}</span>
                      <span className="font-semibold">{goals2026.treesTarget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology & Innovation */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 mr-2 text-blue-600" />
                {t('technologyAndInnovation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>ZAMINAT.eco</strong> {t('technologyDesc')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('ecoAppPlatform')}</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('gamificationWith50Levels')}</li>
                    <li>• {t('democraticVotingOnProjects')}</li>
                    <li>• {t('realTimeWasteTracking')}</li>
                    <li>• {t('socialMissionMarketplace')}</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">{t('plannedFeatures')}</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('blockchainTransparency2027')}</li>
                    <li>• {t('arEducationalModules')}</li>
                    <li>• {t('communityImpactDashboards')}</li>
                    <li>• {t('integrationWithEcoKids')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2 text-green-600" />
                {t('getInTouch')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {t('joinZaminatMovement')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  asChild
                  className="bg-green-600 hover:bg-green-700"
                >
                  <a href="mailto:sukhrobjonrikhsiboev@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('contactUs')}
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                >
                  <a 
                    href="https://t.me/zaminat_eco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t('joinTelegramCommunity')}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-6">
          <div className="space-y-4">
            <TreeIcon className="h-16 w-16 mx-auto text-green-600" animated />
            <h2 className="text-2xl font-bold text-gray-900">
              {t('joinTheZaminatMovement')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('bePartOfTransformation')}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}