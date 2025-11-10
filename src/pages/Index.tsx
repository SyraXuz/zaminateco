import { Bell, Leaf, Award, Users, ArrowRight, Settings, Coins, Star, Trophy, Crown, MapPin, School, Eye, EyeOff, ExternalLink, UserCheck, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Layout from '@/components/Layout';
import EcoCounter from '@/components/EcoCounter';
import GameLevel from '@/components/GameLevel';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser, globalStats, goals2026 } from '@/lib/mockData';
import { getNewsItems } from '@/lib/newsData';
import { USER_DATA, calculateLevel, calculateLevelProgress } from '@/lib/userData';
import { TreeIcon, RecyclingIcon, UzbekPattern } from '@/components/EcoIcons';
import { useTranslation } from 'react-i18next';
import '../styles/mobile-responsive.css';

export default function Index() {
  const { t } = useTranslation();
  const [coinsVisible, setCoinsVisible] = useState(true);

  // FIXED: Use centralized data for consistency
  const currentLevel = calculateLevel(USER_DATA.ecoPoints);
  const { progress: levelProgress, pointsToNext } = calculateLevelProgress(USER_DATA.ecoPoints);
  
  // Get translated news items
  const newsItems = getNewsItems(t);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCoinsVisibility = () => {
    setCoinsVisible(!coinsVisible);
  };

  return (
    <Layout title={t('home')}>
      <div className="min-h-screen bg-background uzbek-pattern">
        {/* Hero Section - Mobile Optimized */}
        <section 
          className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-green-700 text-white hero-mobile"
          role="banner"
          aria-labelledby="hero-title"
        >
          {/* Header with Logo - Mobile Optimized */}
          <header className="flex items-center justify-between p-4 relative z-20 header-mobile">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo.png" 
                alt="ZAMINAT.eco Logo" 
                className="h-8 w-8 sm:h-12 sm:w-12 header-logo-mobile"
                loading="eager"
              />
              <div>
                <h1 className="text-sm sm:text-xl font-bold header-title-mobile">{t('appName')}</h1>
                <p className="text-xs sm:text-sm opacity-90 header-tagline-mobile">{t('tagline')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <LanguageSwitcher />
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-8 w-8 p-0 sm:h-10 sm:w-auto sm:px-4"
                aria-label={t('notifications')}
              >
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </header>

          {/* Hero Content - Mobile Optimized */}
          <div className="px-3 pb-6 sm:px-4 sm:pb-8 relative z-10 hero-mobile">
            <div className="absolute top-0 right-0 opacity-10">
              <TreeIcon className="h-32 w-32 sm:h-64 sm:w-64" animated />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 id="hero-title" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight hero-title-mobile">
                {t('heroTitle')}
              </h2>
              <p className="text-sm sm:text-xl opacity-90 mb-4 sm:mb-6 leading-relaxed hero-subtitle-mobile">
                {t('heroSubtitle')}
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 max-w-3xl mx-auto">
                <p className="text-sm sm:text-lg leading-relaxed hero-description-mobile">
                  {t('heroDescription')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center max-w-md mx-auto">
                <Button 
                  onClick={scrollToAbout}
                  size="sm"
                  className="bg-white text-green-700 hover:bg-gray-100 font-semibold text-xs sm:text-sm py-2 sm:py-3"
                >
                  {t('learnAboutProject')}
                </Button>
                <Link to="/map">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-2 border-white bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto font-semibold text-xs sm:text-sm py-2 sm:py-3"
                  >
                    {t('findCollectionPoints')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <UzbekPattern className="w-full h-1 sm:h-2 text-white opacity-30" />
        </section>

        {/* Main Content - Mobile Optimized */}
        <div className="p-2 sm:p-4 space-y-3 sm:space-y-6 space-y-mobile">
          {/* Welcome Back Section - Mobile Optimized */}
          <motion.section 
            className="bg-gradient-to-br from-green-600 via-green-500 to-blue-600 text-white overflow-hidden relative shadow-xl rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full"
              animate={{ 
                x: [25, 35, 25],
                y: [-25, -35, -25],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-12 h-12 sm:w-24 sm:h-24 bg-white/5 rounded-full"
              animate={{ 
                x: [-15, -25, -15],
                y: [15, 25, 15],
                scale: [1, 0.9, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="p-3 sm:p-6 relative z-10 welcome-mobile">
              {/* Welcome Header - Mobile Optimized */}
              <div className="text-center w-full mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-xl font-semibold welcome-title-mobile">
                  {t('welcomeBackUser')}, <span className="text-yellow-300">{USER_DATA.name}</span>!
                </h3>
                <p className="text-white/80 mt-1 text-center text-xs sm:text-sm welcome-subtitle-mobile">{t('continueImpactMessage')}</p>
              </div>

              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-white/20 avatar-mobile">
                      <AvatarFallback className="text-lg sm:text-2xl bg-white/20 text-white">
                        {USER_DATA.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5 sm:p-1"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Crown className="h-2 w-2 sm:h-3 sm:w-3" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm sm:text-xl font-bold user-name-mobile">{USER_DATA.name}</h2>
                    <p className="text-white/80 text-xs sm:text-sm user-role-mobile">{t('climateHero')}</p>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2 text-xs text-white/70 user-info-mobile">
                      <div className="flex items-center">
                        <MapPin className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        {USER_DATA.location}
                      </div>
                      <div className="flex items-center">
                        <School className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        {USER_DATA.school}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/20 h-6 w-6 sm:h-10 sm:w-10 p-0">
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              {/* Coins and Points - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 gap-mobile">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 stats-card-mobile"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Coins className="h-3 w-3 sm:h-5 sm:w-5 text-yellow-300 icon-sm-mobile" />
                      </motion.div>
                      <span className="text-xs sm:text-sm font-medium stats-label-mobile">{t('ecoCoinsLabel')}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white/80 hover:bg-white/20 h-4 w-4 sm:h-6 sm:w-6 p-0"
                      onClick={toggleCoinsVisibility}
                      aria-label={coinsVisible ? 'Hide eco coins' : 'Show eco coins'}
                    >
                      {coinsVisible ? (
                        <Eye className="h-2 w-2 sm:h-3 sm:w-3" />
                      ) : (
                        <EyeOff className="h-2 w-2 sm:h-3 sm:w-3" />
                      )}
                    </Button>
                  </div>
                  <motion.div 
                    className="text-lg sm:text-2xl font-bold stats-value-mobile"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {coinsVisible ? USER_DATA.ecoCoins : '***'}
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 stats-card-mobile"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="h-3 w-3 sm:h-5 sm:w-5 text-yellow-300 icon-sm-mobile" />
                    </motion.div>
                    <span className="text-xs sm:text-sm font-medium stats-label-mobile">{t('ecoPointsLabel')}</span>
                  </div>
                  <motion.div 
                    className="text-lg sm:text-2xl font-bold stats-value-mobile"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {USER_DATA.ecoPoints.toLocaleString()}
                  </motion.div>
                </motion.div>
              </div>

              {/* Level Progress - Mobile Optimized */}
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 sm:p-4 text-white level-card-mobile"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="bg-white/20 rounded-full p-1 sm:p-2 mr-2 sm:mr-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Trophy className="h-3 w-3 sm:h-5 sm:w-5" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm opacity-90 level-title-mobile">{t('levelFifteen')} {currentLevel}</p>
                      <p className="font-semibold text-xs sm:text-base level-name-mobile">{t('sustainabilityExpert')}</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs level-badge-mobile">
                    {USER_DATA.ecoPoints.toLocaleString()} pts
                  </Badge>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm opacity-90">
                    <span>Progress to Level {currentLevel + 1}</span>
                    <span>{Math.round(levelProgress)}%</span>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-full h-1.5 sm:h-2 bg-white/20">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>
                  <p className="text-xs opacity-75">{pointsToNext} points to next level</p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Global Impact Stats - Mobile Optimized */}
          <section aria-labelledby="impact-title">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 id="impact-title" className="text-lg sm:text-xl font-semibold flex items-center mx-auto section-title-mobile">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 icon-md-mobile" />
                <strong>{t('ourImpact')}</strong>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 gap-mobile">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm eco-card-hover h-full impact-card-mobile">
                <div className="p-2 sm:p-3 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 rounded-lg text-green-600 bg-green-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-5 sm:w-5 icon-sm-mobile">
                        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
                        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path>
                        <path d="m14 16-3 3 3 3"></path>
                        <path d="M8.293 13.596 7.196 9.5 3.1 10.598"></path>
                        <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"></path>
                        <path d="m13.378 9.633 4.096 1.098 1.097-4.096"></path>
                      </svg>
                    </div>
                    <div className="flex items-center text-green-600 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 sm:h-3 sm:w-3 mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>+12%
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight impact-value-mobile">2.5Kkg</p>
                    <p className="text-xs font-medium text-gray-700 leading-tight break-words hyphens-auto impact-title-mobile">{t('plasticRubberRecycledTitle')}</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-words hyphens-auto mt-auto impact-description-mobile">{t('transformedIntoEcoTiles')}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm eco-card-hover h-full impact-card-mobile">
                <div className="p-2 sm:p-3 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 rounded-lg text-blue-600 bg-blue-50">
                      <Users className="h-3 w-3 sm:h-5 sm:w-5 icon-sm-mobile" />
                    </div>
                    <div className="flex items-center text-green-600 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 sm:h-3 sm:w-3 mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>+8%
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight impact-value-mobile">1.3K</p>
                    <p className="text-xs font-medium text-gray-700 leading-tight break-words hyphens-auto impact-title-mobile">{t('ecoWarriorsActiveTitle')}</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-words hyphens-auto mt-auto impact-description-mobile">{t('citizensSchoolsUnited')}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm eco-card-hover h-full impact-card-mobile">
                <div className="p-2 sm:p-3 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 rounded-lg text-purple-600 bg-purple-50">
                      <Leaf className="h-3 w-3 sm:h-5 sm:w-5 icon-sm-mobile" />
                    </div>
                    <div className="flex items-center text-green-600 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 sm:h-3 sm:w-3 mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>+15%
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight impact-value-mobile">3</p>
                    <p className="text-xs font-medium text-gray-700 leading-tight break-words hyphens-auto impact-title-mobile">{t('communityProjectsTitle')}</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-words hyphens-auto mt-auto impact-description-mobile">{t('pilotProjectsTransforming')}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm eco-card-hover h-full impact-card-mobile">
                <div className="p-2 sm:p-3 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <div className="p-1 sm:p-1.5 rounded-lg text-green-600 bg-green-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-5 sm:w-5 icon-sm-mobile">
                        <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"></path>
                        <path d="M12 22v-3"></path>
                      </svg>
                    </div>
                    <div className="flex items-center text-green-600 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 sm:h-3 sm:w-3 mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>+22%
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight impact-value-mobile">156</p>
                    <p className="text-xs font-medium text-gray-700 leading-tight break-words hyphens-auto impact-title-mobile">{t('treesPlantedTitle')}</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-words hyphens-auto mt-auto impact-description-mobile">{t('growingGreenSpaces')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions - Mobile Optimized */}
          <section aria-labelledby="actions-title">
            <Card className="card-mobile">
              <CardHeader className="card-header-mobile">
                <CardTitle id="actions-title" className="flex items-center justify-center text-lg sm:text-2xl section-title-mobile">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600 icon-md-mobile" />
                  <strong>{t('takeAction')}</strong>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 sm:gap-3 card-content-mobile gap-mobile">
                <Link to="/map">
                  <Button className="min-h-[3rem] sm:min-h-[5rem] h-auto w-full flex-col bg-green-600 hover:bg-green-700 eco-card-hover p-2 sm:p-3 action-button-mobile">
                    <span className="text-lg sm:text-2xl mb-1 sm:mb-2 action-emoji-mobile" aria-hidden="true">📍</span>
                    <span className="text-xs font-medium text-center text-white leading-tight break-words hyphens-auto px-1 action-text-mobile">
                      {t('findCollectionPoints')}
                    </span>
                  </Button>
                </Link>
                <Link to="/vote">
                  <Button className="min-h-[3rem] sm:min-h-[5rem] h-auto w-full flex-col bg-blue-600 hover:bg-blue-700 eco-card-hover p-2 sm:p-3 action-button-mobile">
                    <span className="text-lg sm:text-2xl mb-1 sm:mb-2 action-emoji-mobile" aria-hidden="true">🗳️</span>
                    <span className="text-xs font-medium text-center text-white leading-tight break-words hyphens-auto px-1 action-text-mobile">
                      {t('voteOnProjects')}
                    </span>
                  </Button>
                </Link>
                <Link to="/actions">
                  <Button className="min-h-[3rem] sm:min-h-[5rem] h-auto w-full flex-col bg-purple-600 hover:bg-purple-700 eco-card-hover p-2 sm:p-3 action-button-mobile">
                    <span className="text-lg sm:text-2xl mb-1 sm:mb-2 action-emoji-mobile" aria-hidden="true">📅</span>
                    <span className="text-xs font-medium text-center text-white leading-tight break-words hyphens-auto px-1 action-text-mobile">
                      {t('eventsButton')}
                    </span>
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button className="min-h-[3rem] sm:min-h-[5rem] h-auto w-full flex-col bg-orange-600 hover:bg-orange-700 eco-card-hover p-2 sm:p-3 action-button-mobile">
                    <span className="text-lg sm:text-2xl mb-1 sm:mb-2 action-emoji-mobile" aria-hidden="true">🛒</span>
                    <span className="text-xs font-medium text-center text-white leading-tight break-words hyphens-auto px-1 action-text-mobile">
                      {t('shopButton')}
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* About Section - Mobile Optimized */}
          <section id="about-section" className="scroll-mt-20">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 card-mobile">
              <CardHeader className="card-header-mobile">
                <CardTitle className="flex items-center justify-center text-lg sm:text-2xl section-title-mobile">
                  <Leaf className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600 icon-lg-mobile" />
                  {t('aboutZaminatProject')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3 sm:space-y-4 text-center card-content-mobile">
                <div className="max-w-none mx-auto">
                  <p className="text-gray-700 leading-relaxed text-center break-words hyphens-auto text-sm sm:text-base about-description-mobile">
                    {t('aboutZaminatDescription')}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white rounded-lg about-goals-mobile">
                    <h3 className="font-semibold text-green-800 mb-2 text-center text-sm sm:text-base about-goals-title-mobile">{t('ourGoalsFor2026')}</h3>
                    <ul className="text-xs sm:text-sm text-green-700 space-y-1 text-left about-goals-list-mobile">
                      <li className="break-words">• {t('recycle1000Tons')}</li>
                      <li className="break-words">• {t('engage50000Users')}</li>
                      <li className="break-words">• {t('complete100Projects')}</li>
                      <li className="break-words">• {t('plant10000Trees')}</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-white rounded-lg about-goals-mobile">
                    <h3 className="font-semibold text-blue-800 mb-2 text-center text-sm sm:text-base about-goals-title-mobile">{t('currentProgressStatus')}</h3>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1 text-left about-goals-list-mobile">
                      <li className="break-words">• {t('recycled2500kg')}</li>
                      <li className="break-words">• {t('active1250Members')}</li>
                      <li className="break-words">• {t('launched3Projects')}</li>
                      <li className="break-words">• {t('planted156Trees')}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link to="/about">
                    <Button className="bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">
                      {t('readFullStoryButton')}
                    </Button>
                  </Link>
                </div>

                {/* Navigation Links Section */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {t('exploreMore')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Partners Link */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/partners">
                        <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-green-200 bg-gradient-to-br from-green-50 to-white">
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-3">🤝</div>
                            <h4 className="font-semibold text-green-800 mb-2">{t('ourPartnersLink')}</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              {t('discoverExclusiveDiscounts')}
                            </p>
                            <Button 
                              size="sm" 
                              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {t('viewPartners')}
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>

                    {/* Team Link */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/team">
                        <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-3">👥</div>
                            <h4 className="font-semibold text-blue-800 mb-2">{t('meetOurTeam')}</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              {t('passionatePeopleBehind')}
                            </p>
                            <Button 
                              size="sm" 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              {t('meetTeam')}
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>

                    {/* Contact Link */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to="/contacts">
                        <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                          <CardContent className="p-4 text-center">
                            <div className="text-3xl mb-3">📞</div>
                            <h4 className="font-semibold text-purple-800 mb-2">{t('contactUsButton')}</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              {t('getInTouchPartnerships')}
                            </p>
                            <Button 
                              size="sm" 
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              {t('contactUsButton')}
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </section>

          {/* Latest News & Education - Mobile Optimized */}
          <section aria-labelledby="news-title">
            <Card className="card-mobile">
              <CardHeader className="card-header-mobile">
                <div className="flex items-center justify-between">
                  <CardTitle id="news-title" className="mx-auto text-lg sm:text-2xl section-title-mobile">
                    <strong>{t('latestNewsEducation')}</strong>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 card-content-mobile">
                {newsItems.slice(0, 3).map((news) => (
                  <article key={news.id} className="border-l-4 border-green-500 pl-3 sm:pl-4 py-1 sm:py-2 eco-card-hover news-item-mobile">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1 break-words text-sm sm:text-base news-title-mobile">
                          <strong>{news.title}</strong>
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed break-words hyphens-auto news-summary-mobile">
                          {news.summary}
                        </p>
                        <div className="flex items-center space-x-2 flex-wrap">
                          <Badge variant="outline" className="text-xs news-meta-mobile">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-gray-500 news-meta-mobile">
                            <strong>{news.readTime} {t('minReadTime')}</strong>
                          </span>
                          <span className="text-xs text-gray-500 break-words news-meta-mobile">
                            {t('byAuthor')} {news.author}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg sm:text-2xl ml-2 sm:ml-3 flex-shrink-0" aria-hidden="true">{news.image}</span>
                    </div>
                  </article>
                ))}
                <div className="text-center mt-3 sm:mt-4">
                  <Link to="/stories">
                    <Button variant="outline" className="text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6">
                      {t('viewAllNews')} <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Personal Progress - Mobile Optimized */}
          <section aria-labelledby="progress-title">
            <Card className="card-mobile">
              <CardHeader className="card-header-mobile">
                <CardTitle id="progress-title" className="text-center text-lg sm:text-2xl section-title-mobile">
                  <strong>{t('yourEnvironmentalImpact')}</strong>
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-mobile">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center progress-grid-mobile">
                  <div className="p-2 sm:p-3 bg-green-50 rounded-lg progress-item-mobile">
                    <p className="text-lg sm:text-2xl font-bold text-green-600 progress-value-mobile">
                      85.5kg
                    </p>
                    <p className="text-xs text-gray-600 break-words hyphens-auto progress-label-mobile">
                      <strong>{t('wasteCollectedLabel')}</strong>
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-blue-50 rounded-lg progress-item-mobile">
                    <p className="text-lg sm:text-2xl font-bold text-blue-600 progress-value-mobile">
                      3
                    </p>
                    <p className="text-xs text-gray-600 break-words hyphens-auto progress-label-mobile">
                      <strong>{t('badgesEarnedLabel')}</strong>
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-purple-50 rounded-lg progress-item-mobile">
                    <p className="text-lg sm:text-2xl font-bold text-purple-600 progress-value-mobile">
                      250
                    </p>
                    <p className="text-xs text-gray-600 break-words hyphens-auto progress-label-mobile">
                      <strong>{t('ecoCoinsProgress')}</strong>
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 rounded-lg text-center">
                  <p className="text-xs sm:text-sm text-gray-700 text-center break-words hyphens-auto">
                    {t('keepItUpMessage')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Bottom Action Buttons - Mobile Optimized */}
          <section className="text-center py-4 sm:py-8 space-y-4 sm:space-y-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl bottom-section-mobile">
            <div className="space-y-3 sm:space-y-4">
              <RecyclingIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-green-600 icon-lg-mobile" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 bottom-title-mobile">
                {t('readyForBiggerImpact')}
              </h2>
              <div className="max-w-none mx-auto">
                <p className="text-gray-600 leading-relaxed text-center break-words hyphens-auto text-sm sm:text-base bottom-description-mobile">
                  {t('joinVolunteerCampaigns')}
                </p>
              </div>
            </div>
            
            {/* Bottom Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
              <Link to="/actions" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700 py-3 sm:py-4 text-sm sm:text-lg font-semibold shadow-lg bottom-button-mobile">
                  {t('joinNextCleanupEvent')}
                </Button>
              </Link>
              <Link to="/about" className="flex-1">
                <Button variant="outline" className="w-full py-3 sm:py-4 text-sm sm:text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-50 shadow-lg bottom-button-mobile">
                  {t('learnAboutZaminatProject')}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}