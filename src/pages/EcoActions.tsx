import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Award, 
  Star, 
  ChevronDown,
  Target,
  Leaf,
  Heart,
  Globe,
  TrendingUp,
  CheckCircle,
  Info,
  Zap,
  Shield,
  BookOpen
} from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../hooks/use-mobile';
import { cn } from '@/lib/utils';
import { getIconForProductOrCategory } from '@/lib/iconMatcher';

// Types
interface EcoEvent {
  id: number;
  titleKey: string;
  descriptionKey: string;
  category: 'cleanup' | 'planting' | 'education' | 'recycling' | 'awareness';
  locationKey: string;
  date: string;
  time: string;
  duration: string;
  organizerKey: string;
  participants: number;
  maxParticipants: number;
  ecoPoints: number;
  difficulty: 'easy' | 'medium' | 'hard';
  requirementsKey: string;
  whatToBringKey: string;
  benefitsKey: string;
  impactKey: string;
  image: string;
  isJoined: boolean;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Helper function to get current and future dates
const getCurrentDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const twoWeeks = new Date(today);
  twoWeeks.setDate(twoWeeks.getDate() + 14);
  
  const threeWeeks = new Date(today);
  threeWeeks.setDate(threeWeeks.getDate() + 21);
  
  const oneMonth = new Date(today);
  oneMonth.setDate(oneMonth.getDate() + 30);

  return {
    today: today.toISOString().split('T')[0],
    tomorrow: tomorrow.toISOString().split('T')[0],
    nextWeek: nextWeek.toISOString().split('T')[0],
    twoWeeks: twoWeeks.toISOString().split('T')[0],
    threeWeeks: threeWeeks.toISOString().split('T')[0],
    oneMonth: oneMonth.toISOString().split('T')[0]
  };
};

// Event card component
const EventCard = ({ event }: { event: EcoEvent }) => {
  const { t } = useTranslation(['actions', 'translation']);
  const isMobile = useIsMobile();
  const [isJoined, setIsJoined] = useState(event.isJoined);
  const [participants, setParticipants] = useState(event.participants);
  const [showDetails, setShowDetails] = useState(false);

  const handleJoinEvent = () => {
    setIsJoined(!isJoined);
    setParticipants(prev => isJoined ? prev - 1 : prev + 1);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanup': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planting': return 'bg-green-100 text-green-800 border-green-200';
      case 'education': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'recycling': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'awareness': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleanup': return <Globe className="h-4 w-4" />;
      case 'planting': return <Leaf className="h-4 w-4" />;
      case 'education': return <BookOpen className="h-4 w-4" />;
      case 'recycling': return <Target className="h-4 w-4" />;
      case 'awareness': return <Heart className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-4 right-4 w-8 h-8 bg-green-200 rounded-full opacity-20"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-4 w-6 h-6 bg-blue-200 rounded-full opacity-20"
          />
        </div>

        <CardHeader className={cn("relative z-10", isMobile ? "pb-2 p-3" : "pb-4 p-6")}>
          {/* Background decoration */}
          <div className={cn(
            "absolute top-0 right-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity",
            isMobile ? "w-16 h-16 -translate-y-8 translate-x-8" : "w-24 h-24 -translate-y-12 translate-x-12"
          )} />
          
          <div className="relative z-10">
            {/* Header with category and difficulty */}
            <div className={cn("flex items-center justify-between", isMobile ? "mb-2" : "mb-3")}>
              <div className={cn("flex", isMobile ? "gap-1 flex-wrap" : "gap-2 flex-wrap")}>
                <Badge className={cn(
                  `${getCategoryColor(event.category)} border flex items-center`,
                  isMobile ? "gap-0.5 text-[10px] px-1.5 py-0.5" : "gap-1 text-xs px-2 py-1"
                )}>
                  <span className={cn(isMobile ? "h-2.5 w-2.5" : "h-3 w-3")}>
                    {getCategoryIcon(event.category)}
                  </span>
                  <span className="capitalize">{t(`eventCategories.${event.category}`, { ns: 'actions' })}</span>
                </Badge>
                <Badge className={cn(
                  `${getDifficultyColor(event.difficulty)} border`,
                  isMobile ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
                )}>
                  <Shield className={cn(isMobile ? "h-2.5 w-2.5 mr-0.5" : "h-3 w-3 mr-1")} />
                  <span className="capitalize">{t(`difficultyLevels.${event.difficulty}`, { ns: 'actions' })}</span>
                </Badge>
              </div>
              <motion.div 
                className="flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: isMobile ? 1 : 1.2, rotate: isMobile ? 0 : 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={event.iconPath || event.image} 
                  alt={t(event.titleKey, { ns: 'actions' })} 
                  className={cn(
                    "object-contain flex-shrink-0",
                    isMobile ? "w-12 h-12" : "w-14 h-14 sm:w-16 sm:h-16"
                  )}
                  style={{ 
                    minWidth: isMobile ? '48px' : '56px', 
                    minHeight: isMobile ? '48px' : '56px',
                    maxWidth: 'none',
                    maxHeight: 'none'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to original image if iconPath fails
                    const target = e.target as HTMLImageElement;
                    if (event.image && target.src !== event.image) {
                      target.src = event.image;
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Title and description */}
            <CardTitle className={cn(
              "font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2 line-clamp-2",
              isMobile ? "text-sm" : "text-lg"
            )}>
              {t(event.titleKey, { ns: 'actions' })}
            </CardTitle>
            <p className={cn(
              "text-gray-600 leading-relaxed line-clamp-3 mb-3",
              isMobile ? "text-xs" : "text-sm"
            )}>
              {t(event.descriptionKey, { ns: 'actions' })}
            </p>

            {/* Event details */}
            <div className={cn("space-y-2 text-gray-600", isMobile ? "space-y-1.5" : "space-y-2")}>
              <motion.div 
                className={cn(
                  "flex items-center bg-white/50 rounded-lg",
                  isMobile ? "p-1.5 text-xs" : "p-2 text-xs"
                )}
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
              >
                <Calendar className={cn("text-green-600", isMobile ? "h-2.5 w-2.5 mr-1.5" : "h-3 w-3 mr-2")} />
                <span className="font-medium truncate">{event.date} at {event.time}</span>
              </motion.div>
              <motion.div 
                className={cn(
                  "flex items-center bg-white/50 rounded-lg",
                  isMobile ? "p-1.5 text-xs" : "p-2 text-xs"
                )}
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
              >
                <MapPin className={cn("text-blue-600", isMobile ? "h-2.5 w-2.5 mr-1.5" : "h-3 w-3 mr-2")} />
                <span className="line-clamp-1 font-medium">{t(event.locationKey, { ns: 'actions' })}</span>
              </motion.div>
              <div className={cn("grid grid-cols-2", isMobile ? "gap-1.5" : "gap-2")}>
                <motion.div 
                  className={cn(
                    "flex items-center bg-white/50 rounded-lg",
                    isMobile ? "p-1.5 text-xs" : "p-2 text-xs"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.02 }}
                >
                  <Clock className={cn("text-purple-600", isMobile ? "h-2.5 w-2.5 mr-1.5" : "h-3 w-3 mr-2")} />
                  <span className="font-medium truncate">{event.duration}</span>
                </motion.div>
                <motion.div 
                  className={cn(
                    "flex items-center bg-white/50 rounded-lg",
                    isMobile ? "p-1.5 text-xs" : "p-2 text-xs"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.02 }}
                >
                  <Users className={cn("text-orange-600", isMobile ? "h-2.5 w-2.5 mr-1.5" : "h-3 w-3 mr-2")} />
                  <span className="font-medium truncate">{participants}/{event.maxParticipants}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn("relative z-10", isMobile ? "space-y-2 p-3" : "space-y-4 p-6")}>
          {/* Eco Points and Organizer */}
          <div className={cn("grid grid-cols-2", isMobile ? "gap-2" : "gap-4")}>
            <motion.div 
              className={cn(
                "text-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200",
                isMobile ? "p-2" : "p-3"
              )}
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
            >
              <div className="flex items-center justify-center mb-1">
                <Zap className={cn("text-green-600", isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1")} />
                <div className={cn("font-bold text-green-600", isMobile ? "text-sm" : "text-lg")}>{event.ecoPoints}</div>
              </div>
              <div className={cn("text-gray-600 font-medium", isMobile ? "text-[10px]" : "text-xs")}>{t('ecoPoints', { ns: 'actions' })}</div>
            </motion.div>
            <motion.div 
              className={cn(
                "text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200",
                isMobile ? "p-2" : "p-3"
              )}
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
            >
              <div className={cn("font-semibold text-blue-600 line-clamp-2 mb-1", isMobile ? "text-[10px]" : "text-xs")}>{t(event.organizerKey, { ns: 'actions' })}</div>
              <div className={cn("text-gray-600 font-medium", isMobile ? "text-[10px]" : "text-xs")}>{t('organizer', { ns: 'actions' })}</div>
            </motion.div>
          </div>

          {/* Impact statement */}
          <motion.div 
            className={cn(
              "bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-lg border border-green-200",
              isMobile ? "p-2" : "p-3"
            )}
            whileHover={{ scale: isMobile ? 1 : 1.02 }}
          >
            <div className={cn("flex items-center", isMobile ? "mb-1" : "mb-2")}>
              <TrendingUp className={cn("text-green-600", isMobile ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2")} />
              <span className={cn("font-semibold text-gray-700", isMobile ? "text-[10px]" : "text-xs")}>{t('impact', { ns: 'actions' })}</span>
            </div>
            <p className={cn("text-gray-600 line-clamp-2 leading-relaxed", isMobile ? "text-[10px]" : "text-xs")}>{t(event.impactKey, { ns: 'actions' })}</p>
          </motion.div>

          {/* Expandable details */}
          <motion.div
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className={cn(isMobile ? "space-y-2 pt-1" : "space-y-3 pt-2")}>
              {/* Requirements */}
              <div className={cn(
                "bg-gray-50 rounded-lg border border-gray-200",
                isMobile ? "p-2" : "p-3"
              )}>
                <div className={cn("flex items-center", isMobile ? "mb-0.5" : "mb-1")}>
                  <CheckCircle className={cn("text-gray-600", isMobile ? "h-2.5 w-2.5 mr-1" : "h-3 w-3 mr-1")} />
                  <span className={cn("font-semibold text-gray-700", isMobile ? "text-[10px]" : "text-xs")}>{t('requirements', { ns: 'actions' })}</span>
                </div>
                <p className={cn("text-gray-600 leading-relaxed", isMobile ? "text-[10px]" : "text-xs")}>{t(event.requirementsKey, { ns: 'actions' })}</p>
              </div>

              {/* What to bring */}
              <div className={cn(
                "bg-orange-50 rounded-lg border border-orange-200",
                isMobile ? "p-2" : "p-3"
              )}>
                <div className={cn("flex items-center", isMobile ? "mb-0.5" : "mb-1")}>
                  <Info className={cn("text-orange-600", isMobile ? "h-2.5 w-2.5 mr-1" : "h-3 w-3 mr-1")} />
                  <span className={cn("font-semibold text-gray-700", isMobile ? "text-[10px]" : "text-xs")}>{t('whatToBring', { ns: 'actions' })}</span>
                </div>
                <p className={cn("text-gray-600 leading-relaxed", isMobile ? "text-[10px]" : "text-xs")}>{t(event.whatToBringKey, { ns: 'actions' })}</p>
              </div>

              {/* Benefits */}
              <div className={cn(
                "bg-purple-50 rounded-lg border border-purple-200",
                isMobile ? "p-2" : "p-3"
              )}>
                <div className={cn("flex items-center", isMobile ? "mb-0.5" : "mb-1")}>
                  <Heart className={cn("text-purple-600", isMobile ? "h-2.5 w-2.5 mr-1" : "h-3 w-3 mr-1")} />
                  <span className={cn("font-semibold text-gray-700", isMobile ? "text-[10px]" : "text-xs")}>{t('benefits', { ns: 'actions' })}</span>
                </div>
                <p className={cn("text-gray-600 leading-relaxed", isMobile ? "text-[10px]" : "text-xs")}>{t(event.benefitsKey, { ns: 'actions' })}</p>
              </div>
            </div>
          </motion.div>

          {/* Show details toggle */}
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className={cn(
              "w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors",
              isMobile ? "py-1.5 text-[10px]" : "py-2 text-xs"
            )}
            whileHover={{ scale: isMobile ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={cn(isMobile ? "mr-0.5" : "mr-1")}>{showDetails ? t('showLess', { ns: 'common' }) : t('showDetails', { ns: 'common' })}</span>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
            </motion.div>
          </motion.button>

          {/* Join button */}
          <motion.div whileHover={{ scale: isMobile ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleJoinEvent}
              className={cn(
                "w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                isMobile ? "h-9 text-xs py-2" : "h-auto text-sm py-3",
                isJoined 
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white' 
                  : 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white'
              )}
            >
              <Award className={cn(isMobile ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2")} />
              {isJoined ? t('eventJoined', { ns: 'actions' }) : t('joinEvent', { ns: 'actions' })}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Key Features Component
const KeyFeaturesSection = () => {
  const { t } = useTranslation(['actions', 'translation']);
  const isMobile = useIsMobile();
  
  const features = useMemo(() => {
    const baseFeatures = [
      {
        image: '/images/community_16119903.png',
        title: t('communityImpact', { ns: 'actions' }),
        description: t('communityImpactDesc', { ns: 'actions' }),
        color: "from-blue-500 to-cyan-500"
      },
      {
        image: '/images/sustainable-future_2293652.png',
        title: t('sustainableFuture', { ns: 'actions' }),
        description: t('sustainableFutureDesc', { ns: 'actions' }),
        color: "from-green-500 to-emerald-500"
      },
      {
        image: '/images/eco_points_7986841.png',
        title: t('earnEcoPoints', { ns: 'actions' }),
        description: t('earnEcoPointsDesc', { ns: 'actions' }),
        color: "from-purple-500 to-pink-500"
      },
      {
        image: '/images/Meet Like-minded People.png',
        title: t('meetLikeMindedPeople', { ns: 'actions' }),
        description: t('meetLikeMindedPeopleDesc', { ns: 'actions' }),
        color: "from-orange-500 to-red-500"
      }
    ];
    
    // Add dynamically matched icons
    return baseFeatures.map(feature => {
      const iconPath = getIconForProductOrCategory(feature.title, feature.image);
      return {
        ...feature,
        iconPath: iconPath.startsWith('/images/') ? iconPath : feature.image
      };
    });
  }, [t]);

  return (
    <motion.div variants={itemVariants} className={cn(isMobile ? "mb-6" : "mb-12")}>
      <Card className="bg-gradient-to-br from-white to-green-50/50 border-2 border-green-100 overflow-hidden">
        <CardContent className={cn(isMobile ? "p-3 sm:p-4" : "p-8")}>
          <div className={cn("text-center", isMobile ? "mb-4" : "mb-8")}>
            <h2 className={cn(
              "font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent",
              isMobile ? "text-base mb-2" : "text-2xl md:text-3xl mb-4"
            )}>
              {t('whyJoinOurEcoActions', { ns: 'actions' })}
            </h2>
            <p className={cn(
              "text-gray-600 max-w-2xl mx-auto leading-relaxed",
              isMobile ? "text-xs" : "text-sm sm:text-base"
            )}>
              {t('whyJoinOurEcoActionsDesc', { ns: 'actions' })}
            </p>
          </div>
          
          <div className={cn(
            "grid",
            isMobile 
              ? "grid-cols-2 gap-2" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          )}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: isMobile ? 0 : -5, scale: isMobile ? 1 : 1.02 }}
                className={cn(
                  "text-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300",
                  isMobile ? "p-2" : "p-6"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center mb-2",
                  isMobile ? "mb-2" : "mb-4"
                )}>
                  <img 
                    src={feature.iconPath || feature.image} 
                    alt={feature.title} 
                    className={cn(
                      "object-contain flex-shrink-0",
                      isMobile ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20"
                    )}
                    style={{ 
                      minWidth: isMobile ? '48px' : '64px', 
                      minHeight: isMobile ? '48px' : '64px',
                      maxWidth: 'none',
                      maxHeight: 'none'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to original image if iconPath fails
                      const target = e.target as HTMLImageElement;
                      if (feature.image && target.src !== feature.image) {
                        target.src = feature.image;
                      }
                    }}
                  />
                </div>
                <h3 className={cn(
                  "font-semibold text-gray-900",
                  isMobile ? "text-xs mb-1" : "text-sm mb-2"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-gray-600 leading-relaxed",
                  isMobile ? "text-[10px] line-clamp-2" : "text-sm"
                )}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function EcoActions() {
  const { t } = useTranslation(['actions', 'translation']);
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [activeTab, setActiveTab] = useState('upcoming');

  const dates = getCurrentDates();

  // Sample events data with translation keys
  const sampleEvents: EcoEvent[] = [
    {
      id: 1,
      titleKey: "events.schoolWorkshop.title",
      descriptionKey: "events.schoolWorkshop.description",
      category: 'education',
      locationKey: "events.schoolWorkshop.location",
      date: dates.nextWeek,
      time: '10:00 AM',
      duration: '3 hours',
      organizerKey: "events.schoolWorkshop.organizer",
      participants: 15,
      maxParticipants: 25,
      ecoPoints: 50,
      difficulty: 'medium',
      requirementsKey: "events.schoolWorkshop.requirements",
      whatToBringKey: "events.schoolWorkshop.whatToBring",
      benefitsKey: "events.schoolWorkshop.benefits",
      impactKey: "events.schoolWorkshop.impact",
      image: '/images/book_649180.png',
      isJoined: false
    },
    {
      id: 2,
      titleKey: "events.treePlanting.title",
      descriptionKey: "events.treePlanting.description",
      category: 'planting',
      locationKey: "events.treePlanting.location",
      date: dates.twoWeeks,
      time: '8:00 AM',
      duration: '4 hours',
      organizerKey: "events.treePlanting.organizer",
      participants: 45,
      maxParticipants: 100,
      ecoPoints: 75,
      difficulty: 'medium',
      requirementsKey: "events.treePlanting.requirements",
      whatToBringKey: "events.treePlanting.whatToBring",
      benefitsKey: "events.treePlanting.benefits",
      impactKey: "events.treePlanting.impact",
      image: '/images/plant-a-tree_6675353.png',
      isJoined: true
    },
    {
      id: 3,
      titleKey: "events.riverCleanup.title",
      descriptionKey: "events.riverCleanup.description",
      category: 'cleanup',
      locationKey: "events.riverCleanup.location",
      date: dates.tomorrow,
      time: '9:00 AM',
      duration: '3 hours',
      organizerKey: "events.riverCleanup.organizer",
      participants: 32,
      maxParticipants: 50,
      ecoPoints: 60,
      difficulty: 'easy',
      requirementsKey: "events.riverCleanup.requirements",
      whatToBringKey: "events.riverCleanup.whatToBring",
      benefitsKey: "events.riverCleanup.benefits",
      impactKey: "events.riverCleanup.impact",
      image: '/images/forest_10089053.png',
      isJoined: false
    },
    {
      id: 4,
      titleKey: "events.plasticRecycling.title",
      descriptionKey: "events.plasticRecycling.description",
      category: 'recycling',
      locationKey: "events.plasticRecycling.location",
      date: dates.threeWeeks,
      time: '2:00 PM',
      duration: '2 hours',
      organizerKey: "events.plasticRecycling.organizer",
      participants: 18,
      maxParticipants: 30,
      ecoPoints: 40,
      difficulty: 'easy',
      requirementsKey: "events.plasticRecycling.requirements",
      whatToBringKey: "events.plasticRecycling.whatToBring",
      benefitsKey: "events.plasticRecycling.benefits",
      impactKey: "events.plasticRecycling.impact",
      image: '/images/ECOBUSSTOP.png',
      isJoined: false
    },
    {
      id: 5,
      titleKey: "events.awarenessWalk.title",
      descriptionKey: "events.awarenessWalk.description",
      category: 'awareness',
      locationKey: "events.awarenessWalk.location",
      date: dates.oneMonth,
      time: '4:00 PM',
      duration: '2 hours',
      organizerKey: "events.awarenessWalk.organizer",
      participants: 67,
      maxParticipants: 200,
      ecoPoints: 35,
      difficulty: 'easy',
      requirementsKey: "events.awarenessWalk.requirements",
      whatToBringKey: "events.awarenessWalk.whatToBring",
      benefitsKey: "events.awarenessWalk.benefits",
      impactKey: "events.awarenessWalk.impact",
      image: '/images/community_16119903.png',
      isJoined: false
    },
    {
      id: 6,
      titleKey: "events.wasteAudit.title",
      descriptionKey: "events.wasteAudit.description",
      category: 'recycling',
      locationKey: "events.wasteAudit.location",
      date: dates.today,
      time: '11:00 AM',
      duration: '4 hours',
      organizerKey: "events.wasteAudit.organizer",
      participants: 8,
      maxParticipants: 15,
      ecoPoints: 80,
      difficulty: 'hard',
      requirementsKey: "events.wasteAudit.requirements",
      whatToBringKey: "events.wasteAudit.whatToBring",
      benefitsKey: "events.wasteAudit.benefits",
      impactKey: "events.wasteAudit.impact",
      image: '/images/eco_points_7986841.png',
      isJoined: true
    }
  ];

  // Get events with dynamically matched icons
  const eventsWithIcons = useMemo(() => {
    return sampleEvents.map(event => {
      const title = t(event.titleKey, { ns: 'actions' });
      const description = t(event.descriptionKey, { ns: 'actions' });
      
      // Try to match icon based on title first, then category, then description
      let iconPath = getIconForProductOrCategory(title, event.image);
      
      // If title matching didn't work, try category
      if (iconPath === event.image) {
        const categoryMatched = getIconForProductOrCategory(event.category, event.image);
        if (categoryMatched !== event.image && categoryMatched.startsWith('/images/')) {
          iconPath = categoryMatched;
        }
      }
      
      // If still not found, try description keywords
      if (iconPath === event.image) {
        const descMatched = getIconForProductOrCategory(description, event.image);
        if (descMatched !== event.image && descMatched.startsWith('/images/')) {
          iconPath = descMatched;
        }
      }
      
      // Ensure we have a valid path
      if (!iconPath || !iconPath.startsWith('/images/')) {
        iconPath = event.image; // Use original as final fallback
      }
      
      return {
        ...event,
        iconPath
      };
    });
  }, [t, sampleEvents]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const filtered = eventsWithIcons.filter((event) => {
      const title = t(event.titleKey, { ns: 'actions' });
      const description = t(event.descriptionKey, { ns: 'actions' });
      const location = t(event.locationKey, { ns: 'actions' });
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || location.includes(selectedLocation);
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'upcoming' && !event.isJoined) ||
                        (activeTab === 'joined' && event.isJoined);

      return matchesSearch && matchesCategory && matchesLocation && matchesTab;
    });

    // Sort by date
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filtered;
  }, [searchTerm, selectedCategory, selectedLocation, activeTab, eventsWithIcons, t]);

  // Get unique locations
  const locations = [...new Set(eventsWithIcons.map(e => t(e.locationKey, { ns: 'actions' }).split(',')[0].trim()))];

  return (
    <Layout title={t('actions', { ns: 'translation' })}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className={cn("w-full", isMobile ? "px-2 py-4" : "px-4 md:px-6 lg:px-8 py-8")}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(isMobile ? "space-y-4" : "space-y-8")}
          >
            {/* Header */}
            <motion.div variants={itemVariants} className={cn("text-center", isMobile ? "space-y-2" : "space-y-4")}>
              <h1 className={cn(
                "font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent",
                isMobile ? "text-xl" : "text-3xl md:text-4xl lg:text-5xl"
              )}>
                {t('volunteerEvents', { ns: 'translation' })}
              </h1>
              <p className={cn(
                "text-gray-600 max-w-3xl mx-auto leading-relaxed",
                isMobile ? "text-xs px-2" : "text-lg"
              )}>
                {t('eventsDescription', { ns: 'translation' })}
              </p>
              
              {/* Stats */}
              <div className={cn(
                "grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto",
                isMobile ? "gap-2 mt-4" : "gap-4 mt-8"
              )}>
                <motion.div 
                  className={cn(
                    "text-center bg-white rounded-lg shadow-sm border border-green-100",
                    isMobile ? "p-2" : "p-4"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                >
                  <div className={cn("font-bold text-green-600", isMobile ? "text-base" : "text-2xl")}>{sampleEvents.length}</div>
                  <div className={cn("text-gray-600", isMobile ? "text-[10px]" : "text-sm")}>{t('upcoming', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className={cn(
                    "text-center bg-white rounded-lg shadow-sm border border-blue-100",
                    isMobile ? "p-2" : "p-4"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                >
                  <div className={cn("font-bold text-blue-600", isMobile ? "text-base" : "text-2xl")}>
                    {sampleEvents.reduce((sum, e) => sum + e.participants, 0)}
                  </div>
                  <div className={cn("text-gray-600", isMobile ? "text-[10px]" : "text-sm")}>{t('joined', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className={cn(
                    "text-center bg-white rounded-lg shadow-sm border border-purple-100",
                    isMobile ? "p-2" : "p-4"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                >
                  <div className={cn("font-bold text-purple-600", isMobile ? "text-base" : "text-2xl")}>
                    {sampleEvents.reduce((sum, e) => sum + e.ecoPoints, 0)}
                  </div>
                  <div className={cn("text-gray-600", isMobile ? "text-[10px]" : "text-sm")}>{t('ecoPoints', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className={cn(
                    "text-center bg-white rounded-lg shadow-sm border border-orange-100",
                    isMobile ? "p-2" : "p-4"
                  )}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                >
                  <div className={cn("font-bold text-orange-600", isMobile ? "text-base" : "text-2xl")}>
                    {sampleEvents.filter(e => e.isJoined).length}
                  </div>
                  <div className={cn("text-gray-600", isMobile ? "text-[10px]" : "text-sm")}>{t('myEvents', { ns: 'actions' })}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Key Features Section */}
            <KeyFeaturesSection />

            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <div className={cn("flex justify-center", isMobile ? "mb-3" : "mb-6")}>
                <div className={cn(
                  "flex bg-white rounded-lg shadow-sm border border-green-100",
                  isMobile ? "p-0.5" : "p-1"
                )}>
                  <motion.button
                    onClick={() => setActiveTab('upcoming')}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      isMobile ? "px-2 py-1.5 text-[10px]" : "px-6 py-2 text-sm",
                      activeTab === 'upcoming'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('upcomingEvents', { ns: 'actions' })}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('joined')}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      isMobile ? "px-2 py-1.5 text-[10px]" : "px-6 py-2 text-sm",
                      activeTab === 'joined'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('myEvents', { ns: 'actions' })}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('all')}
                    className={cn(
                      "rounded-md font-medium transition-colors",
                      isMobile ? "px-2 py-1.5 text-[10px]" : "px-6 py-2 text-sm",
                      activeTab === 'all'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('allEvents', { ns: 'actions' })}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants}>
              <Card className={cn(
                "bg-white/80 backdrop-blur-sm border-2 border-green-100",
                isMobile ? "p-3" : "p-6"
              )}>
                <div className={cn(isMobile ? "space-y-2" : "space-y-4")}>
                  {/* Search */}
                  <div className="relative">
                    <Search className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                      isMobile ? "h-3 w-3" : "h-4 w-4"
                    )} />
                    <Input
                      placeholder={t('searchEvents', { ns: 'actions' })}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={cn(
                        "border-green-200 focus:border-green-400 bg-white",
                        isMobile ? "pl-8 h-9 text-xs" : "pl-10"
                      )}
                    />
                  </div>

                  {/* Filter controls */}
                  <div className={cn(
                    "grid",
                    isMobile ? "grid-cols-1 gap-2" : "grid-cols-1 md:grid-cols-3 gap-4"
                  )}>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-green-200 bg-white">
                        <SelectValue placeholder={t('filterByCategory', { ns: 'actions' })} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="cleanup">{t('eventCategories.cleanup', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="planting">{t('eventCategories.planting', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="education">{t('eventCategories.education', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="recycling">{t('eventCategories.recycling', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="awareness">{t('eventCategories.awareness', { ns: 'actions' })}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="border-green-200 bg-white">
                        <SelectValue placeholder={t('filterByLocation', { ns: 'actions' })} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <motion.div whileHover={{ scale: isMobile ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSelectedLocation('all');
                        }}
                        variant="outline"
                        className={cn(
                          "w-full border-green-200 hover:bg-green-50 bg-white",
                          isMobile ? "h-9 text-xs" : "h-auto text-sm"
                        )}
                      >
                        <Filter className={cn(isMobile ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2")} />
                        Clear Filters
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Results count */}
            <motion.div variants={itemVariants} className="text-center">
              <p className={cn("text-gray-600", isMobile ? "text-xs" : "text-sm")}>
                Showing <span className="font-semibold text-green-600">{filteredEvents.length}</span> of <span className="font-semibold">{sampleEvents.length}</span> events
              </p>
            </motion.div>

            {/* Events grid */}
            <motion.div variants={itemVariants}>
              <AnimatePresence>
                <div className={cn(
                  "grid grid-cols-1",
                  isMobile ? "gap-3" : "md:grid-cols-2 lg:grid-cols-3 gap-6"
                )}>
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </AnimatePresence>
            </motion.div>

            {/* No results */}
            {filteredEvents.length === 0 && (
              <motion.div 
                variants={itemVariants}
                className={cn("text-center", isMobile ? "py-6" : "py-12")}
              >
                <div className={cn(isMobile ? "text-4xl mb-2" : "text-6xl mb-4")}>🔍</div>
                <h3 className={cn(
                  "font-semibold text-gray-700",
                  isMobile ? "text-sm mb-1" : "text-xl mb-2"
                )}>
                  {t('noEventsFound', { ns: 'actions' })}
                </h3>
                <p className={cn(
                  "text-gray-500",
                  isMobile ? "text-xs mb-3" : "text-sm mb-4"
                )}>
                  {t('noEventsFoundDescription', { ns: 'actions' })}
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setActiveTab('all');
                  }}
                  className={cn(
                    "bg-green-500 hover:bg-green-600 text-white",
                    isMobile ? "h-9 text-xs" : "h-auto text-sm"
                  )}
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}