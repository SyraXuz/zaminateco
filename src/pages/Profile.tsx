import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Coins, 
  Star, 
  Trophy, 
  Crown,
  MapPin,
  School,
  Eye,
  EyeOff,
  Gift,
  ShoppingBag,
  TrendingUp,
  Share2,
  Target,
  Medal,
  Zap,
  Wallet,
  Award,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Users,
  Calendar,
  Recycle,
  Vote,
  Share,
  UserPlus,
  Sparkles,
  Flame,
  Leaf,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  TrendingDown,
  Percent,
  Tag,
  Coffee,
  Car,
  Utensils,
  ShirtIcon,
  Info,
  ChevronUp,
  ChevronDown,
  Camera
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { USER_DATA, calculateLevel, calculateLevelProgress, formatWasteAmount } from '@/lib/userData';
import { EnhancedAvatar } from '@/components/ui/enhanced-avatar';
import { EnhancedAvatarSystem } from '@/components/ui/enhanced-avatar-system';
import { 
  UserProgress, AZIZA_PROGRESS, PROFILE_FRAMES, PROFILE_BACKGROUNDS,
  loadUserProgress, saveUserProgress, calculateLevelProgress as calcLevelProgress
} from '@/lib/userProgress';
import { getAvatarImage } from '@/lib/avatarImages';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const progressVariants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  })
};

// Improved mobile-friendly animation variants for level benefits with better readability
const levelBenefitsVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const benefitItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.2 }
  }
};

const Profile: React.FC = () => {
  const { t } = useTranslation();
  
  // Load user progress from localStorage or use default
  const [userProgress, setUserProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState('wallet');
  const [coinsVisible, setCoinsVisible] = useState(true);
  const [levelExpanded, setLevelExpanded] = useState(false);
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const touchHandledRef = useRef(false);

  // Update user progress when component mounts
  useEffect(() => {
    const savedProgress = loadUserProgress();
    setUserProgress(savedProgress);
  }, []);

  // Calculate level progress
  const { progress: levelProgress, pointsToNext } = calcLevelProgress(userProgress.ecoPoints, userProgress.level);
  const wasteFormatted = formatWasteAmount(userProgress.wasteCollected);

  // Get current profile frame and background
  const currentFrame = PROFILE_FRAMES[userProgress.profileFrame] || PROFILE_FRAMES.default;
  const currentBackground = PROFILE_BACKGROUNDS[userProgress.profileBackground] || PROFILE_BACKGROUNDS.default;

  // Mock data with translated text
  const mockBadges = [
    { id: 1, name: t('firstCollection'), icon: '🏆', unlocked: true, description: t('firstCollectionDesc') },
    { id: 2, name: t('treePlanter'), icon: '🌳', unlocked: true, description: t('treePlanterDesc') },
    { id: 3, name: t('communityHero'), icon: '👥', unlocked: true, description: t('communityHeroDesc') },
    { id: 4, name: t('energyMaster'), icon: '⚡', unlocked: true, description: t('energyMasterDesc') },
    { id: 5, name: t('waterGuardian'), icon: '💧', unlocked: true, description: t('waterGuardianDesc') },
    { id: 6, name: t('streakChampion'), icon: '🔥', unlocked: true, description: t('streakChampionDesc') },
    { id: 7, name: t('communityBuilder'), icon: '🤝', unlocked: true, description: t('communityBuilderDesc') },
    { id: 8, name: t('ecoChampion'), icon: '🌟', unlocked: true, description: t('ecoChampionDesc') }
  ];

  const mockLeaderboard = [
    { rank: 1, name: 'Aziza Karimova', points: 14400, avatar: '👩‍🌾' },
    { rank: 2, name: 'Bobur Rahimov', points: 13200, avatar: '👨‍💼' },
    { rank: 3, name: 'Dilnoza Saidova', points: 12800, avatar: '👩‍🎓' },
    { rank: 4, name: 'Eldor Tursunov', points: 11900, avatar: '👨‍🔬' },
    { rank: 5, name: 'Feruza Nazarova', points: 11200, avatar: '👩‍💻' }
  ];

  const REWARDS_DATA = [
    {
      id: 1,
      emoji: "🌳",
      image: "/images/plant-a-tree_6675353.png",
      title: t('plantTree'),
      description: t('plantTreeDesc'),
      coins: 50
    },
    {
      id: 2,
      emoji: "🎁",
      image: "/images/Children's Souvenirs.png",
      title: t('childrenSouvenirs'),
      description: t('childrenSouvenirsDesc'),
      coins: 75
    },
    {
      id: 3,
      emoji: "🏠",
      image: "/images/Home Decor Set.png",
      title: t('homeDecorSet'),
      description: t('homeDecorSetDesc'),
      coins: 150
    },
    {
      id: 4,
      emoji: "📚",
      image: "/images/Eco Education Kit.png",
      title: t('ecoEducationKit'),
      description: t('ecoEducationKitDesc'),
      coins: 100
    }
  ];

  // Realistic partner offers for Tashkent, Uzbekistan
  const PARTNER_OFFERS = [
    {
      id: 1,
      partner: t('carrefourTashkent'),
      discount: "15%",
      description: t('carrefourDesc'),
      minCoins: 30,
      icon: ShoppingBag,
      color: "green"
    },
    {
      id: 2,
      partner: t('yandexTaxi'),
      discount: "20%",
      description: t('yandexTaxiDesc'),
      minCoins: 25,
      icon: Car,
      color: "yellow"
    },
    {
      id: 3,
      partner: t('coffeeBeanCafe'),
      discount: "10%",
      description: t('coffeeBeanDesc'),
      minCoins: 15,
      icon: Coffee,
      color: "brown"
    },
    {
      id: 4,
      partner: t('samarkandDarvoza'),
      discount: "25%",
      description: t('samarkandDesc'),
      minCoins: 40,
      icon: Utensils,
      color: "orange"
    },
    {
      id: 5,
      partner: t('korzinkaUz'),
      discount: "12%",
      description: t('korzinkaDesc'),
      minCoins: 20,
      icon: ShoppingBag,
      color: "blue"
    },
    {
      id: 6,
      partner: t('uzbekistanAirways'),
      discount: "5%",
      description: t('uzbekistanAirwaysDesc'),
      minCoins: 100,
      icon: Target,
      color: "sky"
    }
  ];

  // Analytics mock data
  const analyticsData = {
    weeklyEngagement: [
      { day: 'Mon', actions: 3, streak: 1 },
      { day: 'Tue', actions: 5, streak: 2 },
      { day: 'Wed', actions: 2, streak: 3 },
      { day: 'Thu', actions: 7, streak: 4 },
      { day: 'Fri', actions: 4, streak: 5 },
      { day: 'Sat', actions: 8, streak: 6 },
      { day: 'Sun', actions: 6, streak: 7 }
    ],
    monthlyStats: {
      totalWaste: 85.5,
      totalPoints: 14400,
      eventsAttended: 12,
      treesPlanted: 15,
      referrals: 5
    },
    achievements: {
      thisMonth: 3,
      total: 12,
      nextGoal: t('climateHero')
    },
    impact: {
      wasteCollected: 85.5, // kg - realistic based on user activity
      eventsAttended: 12,
      treesPlanted: 15,
      friendsReferred: 5
    }
  };

  const handleAvatarSelect = (emoji: string) => {
    const updatedProgress = {
      ...userProgress,
      activeAvatar: emoji
    };
    setUserProgress(updatedProgress);
    saveUserProgress(updatedProgress);
  };

  const handleProgressUpdate = (newProgress: UserProgress) => {
    setUserProgress(newProgress);
  };

  const RewardCard: React.FC<{ reward: typeof REWARDS_DATA[0] }> = ({ reward }) => {
    const isAvailable = userProgress.ecoCoins >= reward.coins;
    const progress = Math.min((userProgress.ecoCoins / reward.coins) * 100, 100);

    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
      >
        <Card className="hover:shadow-lg transition-all duration-300 group h-full border-2 hover:border-green-200">
          <CardContent className="p-3 sm:p-4 text-center space-y-3">
            <motion.div 
              className="inline-block group-hover:scale-110 transition-transform duration-300"
              whileHover={{ rotate: [0, -10, 10, 0] }}
            >
              <img src={reward.image || reward.emoji} alt={reward.title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" loading="lazy" />
            </motion.div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">{reward.title}</h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{reward.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{t('progress')}</span>
                <span className={isAvailable ? 'text-green-600' : 'text-orange-600'}>
                  {userProgress.ecoCoins}/{reward.coins} 🪙
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-sm font-bold text-green-600">{reward.coins} 🪙</div>
              <Button 
                className="w-full h-9 text-xs transition-all duration-300" 
                disabled={!isAvailable}
                variant={isAvailable ? "default" : "secondary"}
                onClick={() => {
                  if (isAvailable) {
                    const updatedProgress = {
                      ...userProgress,
                      ecoCoins: userProgress.ecoCoins - reward.coins
                    };
                    setUserProgress(updatedProgress);
                    saveUserProgress(updatedProgress);
                  }
                }}
              >
                {isAvailable ? t('redeemNow') : t('needMoreCoins')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const PartnerOfferCard: React.FC<{ offer: typeof PARTNER_OFFERS[0] }> = ({ offer }) => {
    const isAvailable = userProgress.ecoCoins >= offer.minCoins;
    const IconComponent = offer.icon;

    return (
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
        className="cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={`hover:shadow-xl transition-all duration-400 group h-full border-2 ${
          isAvailable 
            ? 'border-green-200 bg-gradient-to-br from-green-50 to-white hover:border-green-300' 
            : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-gray-300'
        }`}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 rounded-full ${
                  isAvailable ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                } transition-all duration-300`}
              >
                <IconComponent className="h-5 w-5" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-right"
              >
                <Badge 
                  variant={isAvailable ? "default" : "secondary"} 
                  className={`text-sm font-bold ${
                    isAvailable 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {offer.discount} {t('off')}
                </Badge>
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-base text-gray-900 group-hover:text-green-700 transition-colors">
                {offer.partner}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{offer.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">{t('required')}:</span>
                <span className={`font-bold ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                  {offer.minCoins} 🪙
                </span>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className={`w-full h-10 text-sm font-semibold transition-all duration-300 ${
                    isAvailable 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl' 
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!isAvailable}
                >
                  {isAvailable ? (
                    <>
                      <Gift className="h-4 w-4 mr-2" />
                      {t('claimDiscount')}
                    </>
                  ) : (
                    <>
                      <Coins className="h-4 w-4 mr-2" />
                      {t('need')} {offer.minCoins - userProgress.ecoCoins} {t('more')} 🪙
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const BadgeCard: React.FC<{ badge: typeof mockBadges[0] }> = ({ badge }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <Card className={`${badge.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-all duration-300 h-full`}>
        <CardContent className="p-3 sm:p-4 text-center">
          <div 
            className={`text-2xl sm:text-3xl mb-2 ${!badge.unlocked ? 'grayscale opacity-50' : ''}`}
          >
            {badge.icon}
          </div>
          <h4 className={`font-semibold text-sm sm:text-base mb-1 ${badge.unlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
            {badge.name}
          </h4>
          <p className={`text-xs ${badge.unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
            {badge.description}
          </p>
          {badge.unlocked && (
            <Badge className="mt-2 bg-yellow-100 text-yellow-800 text-xs">
              {t('unlocked')}
            </Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  // FIXED: Enhanced mobile-responsive WeeklyEngagementChart with proper text handling
  const WeeklyEngagementChart: React.FC = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">{t('dailyEngagementStreak')}</h4>
        <Badge variant="outline" className="text-xs bg-gradient-to-r from-orange-100 to-red-100 border-orange-300">
          <Flame className="h-3 w-3 mr-1 text-orange-500" />
          {userProgress.streakDays} {t('dayStreak')}
        </Badge>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {analyticsData.weeklyEngagement.map((day, index) => {
          const maxActions = Math.max(...analyticsData.weeklyEngagement.map(d => d.actions));
          const height = (day.actions / maxActions) * 100;
          
          return (
            <motion.div 
              key={day.day} 
              className="flex flex-col items-center space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-xs text-gray-500 font-medium">{day.day}</div>
              <div className="w-6 h-16 bg-gray-100 rounded-sm relative overflow-hidden">
                <motion.div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-yellow-400 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              {/* FIXED: Better mobile text layout with responsive sizing and word wrapping */}
              <div className="text-xs font-semibold text-orange-600 text-center leading-tight">
                <div>{day.actions}</div>
                <div className="text-[10px] sm:text-xs break-words">{t('actions')}</div>
              </div>
              <div className="text-xs text-gray-400 text-center leading-tight">
                <div className="text-[10px] sm:text-xs">{t('day')} {day.streak}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          <Flame className="h-4 w-4 inline mr-1 text-orange-500" />
          {t('youreOnStreak')} {userProgress.streakDays}-{t('dayStreak')}! {t('keepItUpStreak')}
        </p>
      </div>
    </div>
  );

  const ImpactMetrics: React.FC = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 text-center">
          <img src="/images/ECOBUSSTOP.png" alt="" className="w-8 h-8 mx-auto mb-1 object-contain" loading="lazy" />
          <div className="text-lg font-bold text-green-600">{userProgress.wasteCollected}kg</div>
          <div className="text-xs text-green-600">{t('wasteCollected')}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 text-center">
          <img src="/images/plant-a-tree_6675353.png" alt="" className="w-8 h-8 mx-auto mb-1 object-contain" loading="lazy" />
          <div className="text-lg font-bold text-blue-600">{userProgress.treesPlanted}</div>
          <div className="text-xs text-blue-600">{t('treesPlanted')}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 text-center">
          <img src="/images/community_16119903.png" alt="" className="w-8 h-8 mx-auto mb-1 object-contain" loading="lazy" />
          <div className="text-lg font-bold text-purple-600">{userProgress.eventsAttended}</div>
          <div className="text-xs text-purple-600">{t('eventsAttended')}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-4 text-center">
          <img src="/images/meet-the-team_15916616.png" alt="" className="w-8 h-8 mx-auto mb-1 object-contain" loading="lazy" />
          <div className="text-lg font-bold text-orange-600">{userProgress.referrals}</div>
          <div className="text-xs text-orange-600">{t('friendsReferred')}</div>
        </CardContent>
      </Card>
    </div>
  );

  const ReferralSection: React.FC = () => (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <UserPlus className="h-5 w-5 mr-2 text-green-600" />
          {t('referralProgram')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{t('youveReferred')} {userProgress.referrals} {t('friendsSoFar')}</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">50</div>
              <div className="text-sm text-gray-600">🪙 {t('perReferral')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userProgress.referrals * 50}</div>
              <div className="text-sm text-gray-600">{t('totalEarned')}</div>
            </div>
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold">
          <Share2 className="h-4 w-4 mr-2" />
          {t('shareReferralLink')}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout title={t('profile')}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Enhanced Profile Header with Dynamic Background */}
            <motion.div variants={itemVariants}>
              <Card 
                className="text-white overflow-hidden relative shadow-xl border-0"
                style={{
                  background: currentBackground.gradient || `linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #2563eb 100%)`
                }}
              >
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Theme-specific animations */}
                  {currentBackground.animation === 'shimmer' && (
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                        backgroundSize: '200% 100%'
                      }}
                    />
                  )}
                  
                  {currentBackground.animation === 'aurora' && (
                    <motion.div
                      animate={{
                        x: ['-50%', '50%'],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
                        width: '200%',
                        height: '200%',
                        left: '-50%',
                        top: '-50%'
                      }}
                    />
                  )}
                  
                  {currentBackground.animation === 'flow' && (
                    <motion.div
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%']
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0 opacity-25"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                        backgroundSize: '200% 200%'
                      }}
                    />
                  )}
                  
                  {currentBackground.animation === 'pulse' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
                      }}
                    />
                  )}

                  {/* Floating particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className={`absolute bg-white/10 rounded-full blur-sm`}
                      style={{
                        width: `${8 + i * 4}px`,
                        height: `${8 + i * 4}px`,
                        left: `${5 + i * 12}%`,
                        top: `${10 + i * 8}%`
                      }}
                      animate={{
                        x: [0, 100 + i * 20, 0],
                        y: [0, -50 + i * 10, 0],
                        scale: [1, 1.2 + i * 0.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 6 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                    />
                  ))}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/10" />
                </div>
                
                <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
                      <div className="relative group">
                        <div 
                          className="relative z-10 cursor-pointer"
                          onClick={(e) => {
                            if (!touchHandledRef.current) {
                              setIsAvatarSelectorOpen(true);
                            }
                            touchHandledRef.current = false;
                          }}
                          onTouchStart={(e) => {
                            touchHandledRef.current = true;
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            if (touchHandledRef.current) {
                              setIsAvatarSelectorOpen(true);
                              touchHandledRef.current = false;
                            }
                          }}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <EnhancedAvatar
                            emoji={userProgress.activeAvatar}
                            image={getAvatarImage(userProgress.activeAvatar)}
                            size="xl"
                            glowColor="green"
                            showCrown={true}
                            profileFrame={userProgress.profileFrame}
                          />
                        </div>
                        
                        <motion.button 
                          className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2 
                                   opacity-0 group-hover:opacity-100 transition-all duration-200 
                                   hover:bg-white/30 hover:scale-110"
                          onClick={(e) => {
                            if (!touchHandledRef.current) {
                              setIsAvatarSelectorOpen(true);
                            }
                            touchHandledRef.current = false;
                          }}
                          onTouchStart={(e) => {
                            touchHandledRef.current = true;
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            if (touchHandledRef.current) {
                              setIsAvatarSelectorOpen(true);
                              touchHandledRef.current = false;
                            }
                          }}
                          style={{ touchAction: 'manipulation' }}
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </motion.button>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                          {userProgress.name}
                        </h2>
                        <div className="flex items-center space-x-1 mt-1">
                          <p className="text-white/90 text-sm sm:text-base font-medium">{t('climateHero')}</p>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Flame className="h-4 w-4 text-orange-300" />
                          </motion.div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs sm:text-sm text-white/80 space-y-1 sm:space-y-0">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{t('chilonzorDistrict')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <School className="h-3 w-3" />
                            <span>School #45</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {/* EcoCoins Card - Enhanced */}
                    <motion.div 
                      className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <motion.div 
                              className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-50"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-lg relative z-10">🪙</span>
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-semibold block">{t('ecoCoins')}</span>
                            <div className="flex items-center space-x-1 text-xs text-white/70">
                              <Sparkles className="h-2 w-2" />
                              <span className="text-xs">{t('active')}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-white/80 hover:bg-white/20 h-6 w-6 p-0 rounded-full transition-all duration-300"
                            onClick={() => setCoinsVisible(!coinsVisible)}
                          >
                            {coinsVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </Button>
                        </motion.div>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={coinsVisible ? 'visible' : 'hidden'}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"
                        >
                          {coinsVisible ? userProgress.ecoCoins : '***'}
                        </motion.div>
                      </AnimatePresence>
                      <motion.div 
                        className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <motion.div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 0.8 }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* EcoPoints Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-50" />
                          <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200 relative z-10" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold block">{t('ecoPoints')}</span>
                          <div className="flex items-center space-x-1 text-xs text-white/70">
                            <TrendingUp className="h-2 w-2" />
                            <span className="text-xs">Growing</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent">
                        {userProgress.ecoPoints.toLocaleString()}
                      </div>
                      <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 w-full" />
                      </div>
                    </motion.div>

                    {/* Waste Collected Card */}
                    <motion.div
                      className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg col-span-2 lg:col-span-1"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-50" />
                          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-300 relative z-10" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold block">{t('wasteCollected')}</span>
                          <div className="flex items-center space-x-1 text-xs text-white/70">
                            <Leaf className="h-2 w-2" />
                            <span className="text-xs">Impact</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">
                        {wasteFormatted.value}{wasteFormatted.unit}
                      </div>
                      <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 w-5/6" />
                      </div>
                    </motion.div>

                    {/* Badges Card */}
                    <motion.div
                      className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg lg:col-span-1"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm opacity-50" />
                          <Medal className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 relative z-10" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold block">{t('badges')}</span>
                          <div className="flex items-center space-x-1 text-xs text-white/70">
                            <Award className="h-2 w-2" />
                            <span className="text-xs">Earned</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-300 bg-clip-text text-transparent">
                        {userProgress.badgesEarned}
                      </div>
                      <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 w-3/5" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Level Progress with Improved Text Readability */}
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-md rounded-xl p-4 sm:p-6 text-white border border-white/20 shadow-lg"
                    whileHover={{ scale: 1.01 }}
                    layout
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <motion.div 
                          className="bg-gradient-to-br from-white/20 to-white/10 rounded-full p-3 mr-3 backdrop-blur-sm border border-white/20"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                          <p className="text-sm sm:text-base opacity-90 font-medium">
                            {t('levelFifteen')} {userProgress.level}
                          </p>
                          <p className="font-bold text-base sm:text-lg bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                            {t('sustainabilityExpert')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-gradient-to-r from-white/20 to-white/10 text-white border-white/30 text-sm px-4 py-2 backdrop-blur-sm shadow-lg">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {userProgress.ecoPoints.toLocaleString()} pts
                        </Badge>
                        <motion.button
                          onClick={() => setLevelExpanded(!levelExpanded)}
                          className="p-2 rounded-full hover:bg-white/20 transition-colors touch-feedback btn-touch"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ willChange: 'transform' }}
                        >
                          {levelExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </motion.button>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="space-y-3"
                      layout
                    >
                      <div className="flex justify-between text-sm opacity-90 font-medium">
                        <span>{t('progressToLevel')} {userProgress.level + 1}</span>
                        <span>{Math.round(levelProgress)}%</span>
                      </div>
                      
                      <div className="relative">
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full"
                            variants={progressVariants}
                            initial="initial"
                            animate="animate"
                            custom={levelProgress}
                          />
                        </div>
                        
                        <div className="absolute -top-1 left-0 w-1.5 h-1.5 bg-white rounded-full" />
                        <motion.div
                          className="absolute -top-1 bg-yellow-400 rounded-full w-1.5 h-1.5"
                          initial={{ left: 0 }}
                          animate={{ left: `${levelProgress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-white/50 rounded-full" />
                      </div>
                      
                      <motion.p 
                        className="text-xs sm:text-sm opacity-80 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <span className="text-yellow-200">{pointsToNext}</span> {t('pointsToNextLevel')}
                      </motion.p>

                      {/* Improved Level Benefits with Better Text Readability */}
                      <AnimatePresence mode="wait">
                        {levelExpanded && (
                          <motion.div
                            variants={levelBenefitsVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30 shadow-inner"
                            style={{ 
                              willChange: 'transform, opacity',
                              backfaceVisibility: 'hidden',
                              perspective: 1000
                            }}
                          >
                            <motion.h4 
                              className="text-sm font-bold mb-3 flex items-center text-white"
                              variants={benefitItemVariants}
                            >
                              <Info className="h-4 w-4 mr-2" />
                              {t('levelBenefits')}
                            </motion.h4>
                            <motion.ul 
                              className="text-sm space-y-2 text-white/95 font-medium"
                              variants={levelBenefitsVariants}
                            >
                              <motion.li variants={benefitItemVariants} className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                                {t('accessExclusiveOffers')}
                              </motion.li>
                              <motion.li variants={benefitItemVariants} className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                                {t('priorityEventRegistration')}
                              </motion.li>
                              <motion.li variants={benefitItemVariants} className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                                {t('monthlyBonusEcoCoins')}
                              </motion.li>
                              <motion.li variants={benefitItemVariants} className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                                {t('specialRecognitionBadges')}
                              </motion.li>
                            </motion.ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-600 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-lg sm:text-xl md:text-2xl font-bold ml-1">
                          {wasteFormatted.value}{wasteFormatted.unit}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{t('myWasteCollected')}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Medal className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-lg sm:text-xl md:text-2xl font-bold ml-1">
                          {userProgress.badgesEarned}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{t('badgesEarned')}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02, y: -2 }}>
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-600 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-lg sm:text-xl md:text-2xl font-bold ml-1">
                          {userProgress.level}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium">{t('currentLevel')}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-12 sm:h-14 bg-white/80 backdrop-blur-sm shadow-lg mb-4 sm:mb-6 border border-white/20">
                  <TabsTrigger value="wallet" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium transition-all duration-300">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('wallet')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="offers" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium transition-all duration-300">
                    <Tag className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('offers')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="badges" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium transition-all duration-300">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('badges')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium transition-all duration-300">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('analytics')}</span>
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="wallet" className="space-y-4 sm:space-y-6">
                    <motion.div
                      key="wallet"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      {/* Rewards Store */}
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                            <div className="flex items-center">
                              <Gift className="h-5 w-5 mr-2 text-green-600" />
                              {t('ecoRewardsStore')}
                            </div>
                            <motion.div 
                              className="text-sm text-gray-600 flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <span className="text-lg">🪙</span>
                              <span>{userProgress.ecoCoins}</span>
                            </motion.div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {REWARDS_DATA.map((reward) => (
                              <RewardCard key={reward.id} reward={reward} />
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Referral Section */}
                      <ReferralSection />

                      {/* Recent Transactions */}
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                              {t('recentTransactions')}
                            </div>
                            <Button variant="ghost" size="sm" className="text-sm hover:bg-gray-100">{t('viewAll')}</Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="space-y-0">
                            {[
                              { type: 'earned' as const, title: t('plasticCollectionCentralPark'), time: `2 ${t('hoursAgo')}`, amount: 50 },
                              { type: 'spent' as const, title: t('childrenSouvenirsPurchase'), time: `1 ${t('dayAgo')}`, amount: -75 },
                              { type: 'earned' as const, title: t('treePlantingEventParticipation'), time: `3 ${t('daysAgo')}`, amount: 100 },
                              { type: 'earned' as const, title: t('communityCleanupVolunteer'), time: `5 ${t('daysAgo')}`, amount: 25 }
                            ].map((transaction, index) => (
                              <motion.div
                                key={index}
                                className="p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                                whileHover={{ x: 4 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-center space-x-3">
                                  <motion.div 
                                    className={`p-2 rounded-full ${
                                      transaction.type === 'earned' 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-red-100 text-red-600'
                                    }`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                  >
                                    {transaction.type === 'earned' ? 
                                      <ArrowUpRight className="h-4 w-4" /> : 
                                      <ArrowDownRight className="h-4 w-4" />
                                    }
                                  </motion.div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm sm:text-base truncate">{transaction.title}</p>
                                    <p className="text-xs text-gray-500">{transaction.time}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                  <div className={`font-semibold text-sm sm:text-base ${
                                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} 🪙
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="offers" className="mt-4 sm:mt-6">
                    <motion.div
                      key="offers"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                            <div className="flex items-center">
                              <Tag className="h-5 w-5 mr-2 text-blue-600" />
                              {t('partnerDiscountOffers')}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                {PARTNER_OFFERS.filter(offer => userProgress.ecoCoins >= offer.minCoins).length} {t('available')}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="text-lg mr-1">🪙</span>
                                {userProgress.ecoCoins}
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {PARTNER_OFFERS.map((offer, index) => (
                              <PartnerOfferCard key={offer.id} offer={offer} />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="badges" className="mt-4 sm:mt-6">
                    <motion.div
                      key="badges"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-base sm:text-lg">
                            <Award className="h-5 w-5 mr-2 text-yellow-600" />
                            {t('achievementBadges')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {mockBadges.map((badge) => (
                              <BadgeCard key={badge.id} badge={badge} />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-4 sm:mt-6">
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 sm:space-y-6"
                    >
                      {/* Analytics Overview */}
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-base sm:text-lg">
                            <Activity className="h-5 w-5 mr-2 text-orange-600" />
                            {t('yourEngagementAnalytics')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Weekly Engagement Chart */}
                          <WeeklyEngagementChart />
                          
                          {/* Monthly Summary */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-sm">{t('monthlySummary')}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {[
                                { value: userProgress.eventsAttended, label: t('eventsAttended'), color: 'green' },
                                { value: userProgress.treesPlanted, label: t('treesPlanted'), color: 'blue' },
                                { value: analyticsData.achievements.thisMonth, label: t('newBadges'), color: 'purple' },
                                { value: `#${mockLeaderboard.find(u => u.name === userProgress.name)?.rank || '5'}`, label: t('leaderboardRank'), color: 'orange' }
                              ].map((stat, index) => (
                                <motion.div
                                  key={stat.label}
                                  className={`text-center p-3 rounded-lg`}
                                  style={{
                                    backgroundColor: `var(--${stat.color}-50)`,
                                    color: `var(--${stat.color}-600)`
                                  }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="text-lg font-bold">{stat.value}</div>
                                  <div className="text-xs">{stat.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Environmental Impact */}
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-base sm:text-lg">
                            <Leaf className="h-5 w-5 mr-2 text-green-600" />
                            {t('yourEnvironmentalImpact')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ImpactMetrics />
                        </CardContent>
                      </Card>

                      {/* Goal Progress */}
                      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-base sm:text-lg">
                            <Target className="h-5 w-5 mr-2 text-purple-600" />
                            {t('goalProgress')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            { label: `${t('nextBadge')}: ${analyticsData.achievements.nextGoal}`, current: 85, total: 100, unit: t('kg') },
                            { label: t('monthlyWasteGoal'), current: userProgress.wasteCollected, total: 100, unit: t('kg') },
                            { label: t('communityEvents'), current: userProgress.eventsAttended, total: 15, unit: t('events') }
                          ].map((goal, index) => (
                            <motion.div
                              key={goal.label}
                              className="space-y-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{goal.label}</span>
                                <span className="text-sm text-gray-600">
                                  {goal.current}/{goal.total} {goal.unit}
                                </span>
                              </div>
                              <Progress value={(goal.current / goal.total) * 100} className="h-2" />
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Avatar System Modal - FIXED PROPS */}
      <EnhancedAvatarSystem
        isOpen={isAvatarSelectorOpen}
        onClose={() => {
          setIsAvatarSelectorOpen(false);
          // Reload progress after closing to ensure theme is updated
          const savedProgress = loadUserProgress();
          setUserProgress(savedProgress);
        }}
        selectedAvatar={userProgress.activeAvatar}
        onAvatarSelect={handleAvatarSelect}
        onThemeChange={(themeId) => {
          // Use functional update to ensure we have the latest state
          setUserProgress((prevProgress) => {
            const updated = { ...prevProgress, profileBackground: themeId };
            saveUserProgress(updated);
            return updated;
          });
        }}
      />
    </Layout>
  );
};

export default Profile;