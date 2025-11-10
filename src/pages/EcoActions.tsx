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

        <CardHeader className="pb-4 relative z-10">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <div className="relative z-10">
            {/* Header with category and difficulty */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2 flex-wrap">
                <Badge className={`${getCategoryColor(event.category)} border flex items-center gap-1`}>
                  {getCategoryIcon(event.category)}
                  <span className="capitalize">{t(`eventCategories.${event.category}`, { ns: 'actions' })}</span>
                </Badge>
                <Badge className={`${getDifficultyColor(event.difficulty)} border`}>
                  <Shield className="h-3 w-3 mr-1" />
                  <span className="capitalize">{t(`difficultyLevels.${event.difficulty}`, { ns: 'actions' })}</span>
                </Badge>
              </div>
              <motion.div 
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {event.image}
              </motion.div>
            </div>

            {/* Title and description */}
            <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2 line-clamp-2">
              {t(event.titleKey, { ns: 'actions' })}
            </CardTitle>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3">
              {t(event.descriptionKey, { ns: 'actions' })}
            </p>

            {/* Event details */}
            <div className="space-y-2 text-xs text-gray-600">
              <motion.div 
                className="flex items-center p-2 bg-white/50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <Calendar className="h-3 w-3 mr-2 text-green-600" />
                <span className="font-medium">{event.date} at {event.time}</span>
              </motion.div>
              <motion.div 
                className="flex items-center p-2 bg-white/50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="h-3 w-3 mr-2 text-blue-600" />
                <span className="line-clamp-1 font-medium">{t(event.locationKey, { ns: 'actions' })}</span>
              </motion.div>
              <div className="grid grid-cols-2 gap-2">
                <motion.div 
                  className="flex items-center p-2 bg-white/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock className="h-3 w-3 mr-2 text-purple-600" />
                  <span className="font-medium">{event.duration}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center p-2 bg-white/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Users className="h-3 w-3 mr-2 text-orange-600" />
                  <span className="font-medium">{participants}/{event.maxParticipants}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Eco Points and Organizer */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-1">
                <Zap className="h-4 w-4 text-green-600 mr-1" />
                <div className="text-lg font-bold text-green-600">{event.ecoPoints}</div>
              </div>
              <div className="text-xs text-gray-600 font-medium">{t('ecoPoints', { ns: 'actions' })}</div>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xs font-semibold text-blue-600 line-clamp-2 mb-1">{t(event.organizerKey, { ns: 'actions' })}</div>
              <div className="text-xs text-gray-600 font-medium">{t('organizer', { ns: 'actions' })}</div>
            </motion.div>
          </div>

          {/* Impact statement */}
          <motion.div 
            className="p-3 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-lg border border-green-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-xs font-semibold text-gray-700">{t('impact', { ns: 'actions' })}</span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{t(event.impactKey, { ns: 'actions' })}</p>
          </motion.div>

          {/* Expandable details */}
          <motion.div
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              {/* Requirements */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-3 w-3 text-gray-600 mr-1" />
                  <span className="text-xs font-semibold text-gray-700">{t('requirements', { ns: 'actions' })}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t(event.requirementsKey, { ns: 'actions' })}</p>
              </div>

              {/* What to bring */}
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center mb-1">
                  <Info className="h-3 w-3 text-orange-600 mr-1" />
                  <span className="text-xs font-semibold text-gray-700">{t('whatToBring', { ns: 'actions' })}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t(event.whatToBringKey, { ns: 'actions' })}</p>
              </div>

              {/* Benefits */}
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center mb-1">
                  <Heart className="h-3 w-3 text-purple-600 mr-1" />
                  <span className="text-xs font-semibold text-gray-700">{t('benefits', { ns: 'actions' })}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t(event.benefitsKey, { ns: 'actions' })}</p>
              </div>
            </div>
          </motion.div>

          {/* Show details toggle */}
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center py-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-1">{showDetails ? 'Show Less' : 'Show Details'}</span>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>

          {/* Join button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleJoinEvent}
              className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                isJoined 
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white' 
                  : 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white'
              }`}
            >
              <Award className="h-4 w-4 mr-2" />
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
  
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: t('communityImpact', { ns: 'actions' }),
      description: t('communityImpactDesc', { ns: 'actions' }),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: t('sustainableFuture', { ns: 'actions' }),
      description: t('sustainableFutureDesc', { ns: 'actions' }),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: t('earnEcoPoints', { ns: 'actions' }),
      description: t('earnEcoPointsDesc', { ns: 'actions' }),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: t('meetLikeMindedPeople', { ns: 'actions' }),
      description: t('meetLikeMindedPeopleDesc', { ns: 'actions' }),
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <motion.div variants={itemVariants} className="mb-12">
      <Card className="bg-gradient-to-br from-white to-green-50/50 border-2 border-green-100 overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {t('whyJoinOurEcoActions', { ns: 'actions' })}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('whyJoinOurEcoActionsDesc', { ns: 'actions' })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.color} mb-4`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
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
      image: '🎓',
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
      image: '🌳',
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
      image: '🏞️',
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
      image: '♻️',
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
      image: '🚶‍♀️',
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
      image: '📊',
      isJoined: true
    }
  ];

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const filtered = sampleEvents.filter((event) => {
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
  }, [searchTerm, selectedCategory, selectedLocation, activeTab, sampleEvents, t]);

  // Get unique locations
  const locations = [...new Set(sampleEvents.map(e => t(e.locationKey, { ns: 'actions' }).split(',')[0].trim()))];

  return (
    <Layout title={t('actions', { ns: 'translation' })}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('volunteerEvents', { ns: 'translation' })}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('eventsDescription', { ns: 'translation' })}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
                <motion.div 
                  className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl font-bold text-green-600">{sampleEvents.length}</div>
                  <div className="text-sm text-gray-600">{t('upcoming', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {sampleEvents.reduce((sum, e) => sum + e.participants, 0)}
                  </div>
                  <div className="text-sm text-gray-600">{t('joined', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-white rounded-lg shadow-sm border border-purple-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl font-bold text-purple-600">
                    {sampleEvents.reduce((sum, e) => sum + e.ecoPoints, 0)}
                  </div>
                  <div className="text-sm text-gray-600">{t('ecoPoints', { ns: 'translation' })}</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-white rounded-lg shadow-sm border border-orange-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="text-2xl font-bold text-orange-600">
                    {sampleEvents.filter(e => e.isJoined).length}
                  </div>
                  <div className="text-sm text-gray-600">{t('myEvents', { ns: 'actions' })}</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Key Features Section */}
            <KeyFeaturesSection />

            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <div className="flex justify-center mb-6">
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-green-100">
                  <motion.button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'upcoming'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('upcomingEvents', { ns: 'actions' })}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('joined')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'joined'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('myEvents', { ns: 'actions' })}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'all'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('allEvents', { ns: 'actions' })}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-green-100">
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={t('searchEvents', { ns: 'actions' })}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-400 bg-white"
                    />
                  </div>

                  {/* Filter controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-green-200 bg-white">
                        <SelectValue placeholder={t('filterByCategory', { ns: 'actions' })} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="cleanup">🏞️ {t('eventCategories.cleanup', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="planting">🌳 {t('eventCategories.planting', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="education">🎓 {t('eventCategories.education', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="recycling">♻️ {t('eventCategories.recycling', { ns: 'actions' })}</SelectItem>
                        <SelectItem value="awareness">🚶‍♀️ {t('eventCategories.awareness', { ns: 'actions' })}</SelectItem>
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
                            📍 {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSelectedLocation('all');
                        }}
                        variant="outline"
                        className="w-full border-green-200 hover:bg-green-50 bg-white"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Results count */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-green-600">{filteredEvents.length}</span> of <span className="font-semibold">{sampleEvents.length}</span> events
              </p>
            </motion.div>

            {/* Events grid */}
            <motion.div variants={itemVariants}>
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('noEventsFound', { ns: 'actions' })}</h3>
                <p className="text-gray-500 mb-4">{t('noEventsFoundDescription', { ns: 'actions' })}</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setActiveTab('all');
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
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