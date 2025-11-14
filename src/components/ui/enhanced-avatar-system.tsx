import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Star, Trophy, Zap, CheckCircle, Unlock, Save, Palette, Sparkles, Filter } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import { EnhancedAvatar } from './enhanced-avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { PROFILE_BACKGROUNDS, ThemeBackground, loadUserProgress, saveUserProgress, UserProgress } from '@/lib/userProgress';
import { useTranslation } from '@/hooks/useTranslation';

interface EnhancedAvatarSystemProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAvatar?: string;
  onAvatarSelect: (emoji: string) => void;
  onThemeChange?: (themeId: string) => void;
}

export const EnhancedAvatarSystem: React.FC<EnhancedAvatarSystemProps> = ({
  isOpen,
  onClose,
  selectedAvatar = '',
  onAvatarSelect,
  onThemeChange
}) => {
  const [activeTab, setActiveTab] = useState('avatars');
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [currentSelection, setCurrentSelection] = useState(selectedAvatar);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [themeCategory, setThemeCategory] = useState<string>('all');
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const isMobile = useIsMobile();
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const { t } = useTranslation();

  // Track viewport size for responsive modal sizing - Deferred for performance
  useEffect(() => {
    if (!isOpen) return;
    
    const updateViewportSize = () => {
      requestAnimationFrame(() => {
        setViewportSize({
          width: window.innerWidth || window.visualViewport?.width || 0,
          height: window.innerHeight || window.visualViewport?.height || 0,
        });
      });
    };

    // Initial update - deferred
    const timeoutId = setTimeout(updateViewportSize, 0);
    
    // Use visual viewport API if available (better for mobile browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportSize);
      window.visualViewport.addEventListener('scroll', updateViewportSize);
    }
    
    window.addEventListener('resize', updateViewportSize);
    window.addEventListener('orientationchange', updateViewportSize);

    return () => {
      clearTimeout(timeoutId);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportSize);
        window.visualViewport.removeEventListener('scroll', updateViewportSize);
      }
      window.removeEventListener('resize', updateViewportSize);
      window.removeEventListener('orientationchange', updateViewportSize);
    };
  }, [isOpen]);

  // Lock body scroll when modal is open (prevent background scrolling) - Optimized with RAF
  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to prevent layout thrashing
      const rafId = requestAnimationFrame(() => {
        // Save current scroll position
        const scrollY = window.scrollY;
        // Lock body scroll
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
      });
      
      return () => {
        cancelAnimationFrame(rafId);
        // Restore scroll position when modal closes - also use RAF
        const restoreRafId = requestAnimationFrame(() => {
          const scrollY = parseInt(document.body.style.top || '0') * -1;
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          window.scrollTo(0, scrollY);
        });
        return () => cancelAnimationFrame(restoreRafId);
      };
    }
  }, [isOpen]);

  // Load user progress and current theme - Deferred for performance
  useEffect(() => {
    if (isOpen && activeTab === 'themes') {
      // Defer loading to next frame to prevent blocking
      requestAnimationFrame(() => {
        const progress = loadUserProgress();
        setUserProgress(progress);
        setSelectedTheme(progress.profileBackground || 'default');
      });
    }
  }, [isOpen, activeTab]);

  // Completely flat data - no nested objects
  const avatarEmojis = ['👩‍🌾', '🌱', '🌿', '🌳', '♻️', '🌍', '💧', '☀️', '⚡', '🔥', '🌟', '🔮', '🦋'];
  const avatarImages = ['/images/Eco Farmer.png', '/images/Green Sprout.png', '/images/Leaf Guardian.png', '/images/Tree Protector.png', '/images/Recycling Hero.png', '/images/Earth Guardian.png', '/images/Water Saver.png', '/images/Solar Champion.png', '/images/Energy Saver.png', '/images/Climate Warrior.png', '/images/Eco Star.png', '/images/Future Visionary.png', '/images/Nature Lover.png'];
  const avatarNameKeys = ['avatarEcoFarmer', 'avatarGreenSprout', 'avatarLeafGuardian', 'avatarTreeProtector', 'avatarRecyclingHero', 'avatarEarthGuardian', 'avatarWaterSaver', 'avatarSolarChampion', 'avatarEnergySaver', 'avatarClimateWarrior', 'avatarEcoStar', 'avatarFutureVisionary', 'avatarNatureLover'];
  const avatarDescKeys = ['avatarDescEcoFarmer', 'avatarDescGreenSprout', 'avatarDescLeafGuardian', 'avatarDescTreeProtector', 'avatarDescRecyclingHero', 'avatarDescEarthGuardian', 'avatarDescWaterSaver', 'avatarDescSolarChampion', 'avatarDescEnergySaver', 'avatarDescClimateWarrior', 'avatarDescEcoStar', 'avatarDescFutureVisionary', 'avatarDescNatureLover'];
  const avatarRarities = ['common', 'common', 'common', 'rare', 'rare', 'rare', 'epic', 'epic', 'epic', 'epic', 'legendary', 'legendary', 'legendary'];
  const avatarUnlocked = [true, true, true, true, true, true, true, true, false, false, false, false, false];
  const avatarTasks = ['', '', '', '', '', '', '', '', 'energy_master', 'climate_action', 'eco_champion', 'innovation_leader', 'biodiversity_protector'];

  const taskTitleKeys = {
    'energy_master': 'taskEnergyMaster',
    'climate_action': 'taskClimateAction',
    'eco_champion': 'taskEcoChampion',
    'innovation_leader': 'taskInnovationLeader',
    'biodiversity_protector': 'taskBiodiversityProtector'
  };

  const taskDescKeys = {
    'energy_master': 'taskDescEnergyMaster',
    'climate_action': 'taskDescClimateAction',
    'eco_champion': 'taskDescEcoChampion',
    'innovation_leader': 'taskDescInnovationLeader',
    'biodiversity_protector': 'taskDescBiodiversityProtector'
  };

  const taskRewardKeys = {
    'energy_master': 'taskRewardEnergyMaster',
    'climate_action': 'taskRewardClimateAction',
    'eco_champion': 'taskRewardEcoChampion',
    'innovation_leader': 'taskRewardInnovationLeader',
    'biodiversity_protector': 'taskRewardBiodiversityProtector'
  };

  const taskReqs = {
    'energy_master': ['Complete 5 energy-saving actions', 'Reduce household energy consumption by 20%', 'Share 3 energy-saving tips with friends', 'Participate in Earth Hour event'],
    'climate_action': ['Complete 10 climate-friendly actions', 'Organize a community cleanup event', 'Plant 5 trees or support reforestation', 'Advocate for renewable energy in your area'],
    'eco_champion': ['Complete all previous avatar challenges', 'Maintain a 30-day sustainability streak', 'Lead 3 community environmental initiatives', 'Achieve carbon-neutral lifestyle for 1 month'],
    'innovation_leader': ['Develop or implement 3 innovative eco-solutions', 'Mentor 5 people in sustainable practices', 'Create educational content about sustainability', 'Collaborate with local environmental organizations'],
    'biodiversity_protector': ['Support 5 different wildlife conservation projects', 'Create or maintain a pollinator garden', 'Document and report local biodiversity', 'Educate others about endangered species']
  };

  const taskDiffs = {
    'energy_master': 'medium',
    'climate_action': 'hard',
    'eco_champion': 'hard',
    'innovation_leader': 'hard',
    'biodiversity_protector': 'hard'
  };

  const handleAvatarClick = useCallback((index: number) => {
    const emoji = avatarEmojis[index];
    const unlocked = avatarUnlocked[index];
    const task = avatarTasks[index];

    if (unlocked) {
      setCurrentSelection(emoji);
    } else if (task) {
      setSelectedTaskId(task);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAvatarClick(index);
    }
  }, [handleAvatarClick]);

  const handleConfirm = useCallback(() => {
    // Handle theme selection
    if (activeTab === 'themes' && selectedTheme && userProgress) {
      const updated = { ...userProgress, profileBackground: selectedTheme };
      saveUserProgress(updated);
      setUserProgress(updated);
      onThemeChange?.(selectedTheme);
      // Close modal after saving to show the change
      setTimeout(() => {
        onClose();
      }, 300);
      return;
    }
    
    // Handle avatar selection
    if (activeTab === 'avatars' && currentSelection) {
      onAvatarSelect(currentSelection);
      onClose();
    }
  }, [activeTab, currentSelection, selectedTheme, userProgress, onAvatarSelect, onThemeChange, onClose]);

  const handleCloseTask = useCallback(() => {
    setSelectedTaskId('');
  }, []);

  if (!isOpen) return null;

  // Helper function to get translated theme name
  const getThemeName = (themeId: string): string => {
    const themeNameKeys: Record<string, string> = {
      'default': 'themeDefaultGradient',
      'forest_gradient': 'themeForestHarmony',
      'solar_energy': 'themeSolarPower',
      'cosmic_nature': 'themeCosmicNature',
      'biodiversity_garden': 'themeBiodiversityGarden',
      'future_tech': 'themeFutureTechnology',
      'iridescent_emerald': 'themeIridescentEmerald',
      'aurora_borealis': 'themeAuroraBorealis',
      'ocean_depths': 'themeOceanDepths',
      'sunset_blaze': 'themeSunsetBlaze',
      'neon_eco': 'themeNeonEco',
      'pastel_dream': 'themePastelDream',
      'prismatic_flow': 'themePrismaticFlow',
      'moonlight_forest': 'themeMoonlightForest'
    };
    return t(themeNameKeys[themeId] || 'all');
  };

  // Helper function to get translated theme description
  const getThemeDescription = (themeId: string): string => {
    const themeDescKeys: Record<string, string> = {
      'default': 'themeDescDefaultGradient',
      'forest_gradient': 'themeDescForestHarmony',
      'solar_energy': 'themeDescSolarPower',
      'cosmic_nature': 'themeDescCosmicNature',
      'biodiversity_garden': 'themeDescBiodiversityGarden',
      'future_tech': 'themeDescFutureTechnology',
      'iridescent_emerald': 'themeDescIridescentEmerald',
      'aurora_borealis': 'themeDescAuroraBorealis',
      'ocean_depths': 'themeDescOceanDepths',
      'sunset_blaze': 'themeDescSunsetBlaze',
      'neon_eco': 'themeDescNeonEco',
      'pastel_dream': 'themeDescPastelDream',
      'prismatic_flow': 'themeDescPrismaticFlow',
      'moonlight_forest': 'themeDescMoonlightForest'
    };
    return t(themeDescKeys[themeId] || '');
  };

  const unlockedCount = avatarUnlocked.filter(Boolean).length;
  const selectedName = activeTab === 'themes' 
    ? (selectedTheme ? getThemeName(selectedTheme) : t('all'))
    : (currentSelection ? t(avatarNameKeys[avatarEmojis.indexOf(currentSelection)] || 'all') : t('all'));

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "fixed inset-0 bg-black/50 z-50 flex items-center",
            isMobile ? "p-2 items-start justify-center pt-4" : "p-4 items-center justify-center"
          )}
          style={{
            willChange: 'opacity',
            backdropFilter: isMobile ? 'blur(4px)' : 'blur(8px)',
            WebkitBackdropFilter: isMobile ? 'blur(4px)' : 'blur(8px)',
            ...(isMobile ? {
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
              paddingRight: 'max(0.5rem, env(safe-area-inset-right))',
              paddingBottom: 'max(80px, env(safe-area-inset-bottom) + 60px)',
              paddingLeft: 'max(0.5rem, env(safe-area-inset-left))',
            } : {}),
            touchAction: 'none',
          }}
          onClick={onClose}
          onTouchStart={(e) => {
            // Prevent background scroll on touch
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col",
              isMobile 
                ? "w-[calc(100vw-1rem)] mx-auto"
                : "w-full max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
            )}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              willChange: 'transform, opacity',
              touchAction: 'pan-y',
              maxHeight: isMobile && viewportSize.height > 0
                ? `${Math.min(viewportSize.height * 0.75, viewportSize.height - 100)}px`
                : isMobile
                ? 'calc(75dvh - 2rem)'
                : 'min(95vh, calc(100vh - 2rem))',
              height: isMobile && viewportSize.height > 0
                ? `${Math.min(viewportSize.height * 0.75, viewportSize.height - 100)}px`
                : 'auto',
              maxWidth: isMobile 
                ? `${Math.min(viewportSize.width - 16, 420)}px`
                : undefined,
              marginBottom: isMobile ? '80px' : undefined,
            }}
          >
            {/* Header - Ultra Compact on Mobile */}
            <div className={cn(
              "relative border-b border-gray-200 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 flex-shrink-0",
              isMobile ? "p-1.5" : "p-4 sm:p-6"
            )}>
              {/* Title and Close - Single Row */}
              <div className={cn(
                "flex items-center justify-between",
                isMobile ? "mb-1" : "mb-3"
              )}>
                  <h2 className={cn(
                  "font-bold text-gray-900 truncate flex-1 min-w-0",
                  isMobile ? "text-sm" : "text-xl sm:text-2xl"
                  )}>
                  🎭 {isMobile ? t('avatars') : t('avatarAchievementSystem')}
                  </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className={cn(
                    "flex-shrink-0",
                    isMobile ? "h-6 w-6 p-0 ml-1.5" : "h-8 w-8 p-0"
                  )}
                >
                  <X className={isMobile ? "h-3 w-3" : "h-4 w-4"} />
                </Button>
              </div>

              {/* Tab Navigation - Ultra Compact */}
              <div 
                className={cn(
                  "flex space-x-0.5 bg-white/50 backdrop-blur-sm rounded-md overflow-x-auto",
                  isMobile ? "p-0.5" : "p-1"
                )}
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-x',
                }}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <Button
                  variant={activeTab === 'avatars' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('avatars')}
                  className={cn(
                    "whitespace-nowrap flex-shrink-0",
                    isMobile ? "text-xs px-1.5 py-0.5 h-6" : "text-xs sm:text-sm px-2 sm:px-3"
                  )}
                >
                  <span>{isMobile ? "🎭" : `🎭 ${t('avatars')}`}</span>
                </Button>
                <Button
                  variant={activeTab === 'quests' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('quests')}
                  className={cn(
                    "whitespace-nowrap flex-shrink-0",
                    isMobile ? "text-xs px-1.5 py-0.5 h-6" : "text-xs sm:text-sm px-2 sm:px-3"
                  )}
                >
                  <span>{isMobile ? "⚔️" : `⚔️ ${t('quests')}`}</span>
                </Button>
                <Button
                  variant={activeTab === 'frames' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('frames')}
                  className={cn(
                    "whitespace-nowrap flex-shrink-0",
                    isMobile ? "text-xs px-1.5 py-0.5 h-6" : "text-xs sm:text-sm px-2 sm:px-3"
                  )}
                >
                  <span>{isMobile ? "🖼️" : `🖼️ ${t('frames')}`}</span>
                </Button>
                <Button
                  variant={activeTab === 'themes' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('themes')}
                  className={cn(
                    "whitespace-nowrap flex-shrink-0",
                    isMobile ? "text-xs px-1.5 py-0.5 h-6" : "text-xs sm:text-sm px-2 sm:px-3"
                  )}
                >
                  <span>{isMobile ? "🎨" : `🎨 ${t('themes')}`}</span>
                </Button>
              </div>
            </div>

            {/* Desktop Selection Bar */}
            {!isMobile && (
              <div className="border-b border-gray-200 bg-white px-4 py-2 flex items-center justify-between flex-shrink-0">
                <div className="text-xs sm:text-sm text-gray-600">
                  <span>{t('selected')}: <strong>{selectedName}</strong></span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onClose}
                  >
                    {t('cancel')}
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    onClick={handleConfirm}
                    disabled={activeTab === 'themes' ? !selectedTheme : !currentSelection}
                  >
                    {t('confirmSelection')}
                  </Button>
                </div>
              </div>
            )}

            {/* Content - Scrollable with proper touch handling - Maximized */}
            <div 
              className={cn(
                "overflow-y-auto flex-1",
              isMobile 
                  ? "p-2" 
                  : "p-3 sm:p-6"
              )}
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                touchAction: 'pan-y',
                maxHeight: isMobile && viewportSize.height > 0
                  ? `${Math.max(350, Math.min(viewportSize.height * 0.75 - 100, viewportSize.height - 200))}px`
                  : isMobile
                  ? 'calc(75dvh - 100px)'
                  : 'calc(95vh - 200px)',
                minHeight: isMobile ? '300px' : '400px',
              }}
              onTouchStart={(e) => {
                // Allow scrolling within modal content
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                // Prevent scroll propagation to background
                e.stopPropagation();
              }}
              onWheel={(e) => {
                // Prevent wheel scroll from propagating to background
                e.stopPropagation();
              }}
            >
              {activeTab === 'avatars' && (
                <div className="space-y-3" style={{ contain: 'layout style paint' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-6 gap-2">
                    <h3 className="text-sm sm:text-lg font-semibold">{t('avatarCollection')}</h3>
                    <Badge variant="outline" className="text-xs self-start sm:self-auto">
                      {unlockedCount}/{avatarEmojis.length} {t('unlocked')}
                    </Badge>
                  </div>

                  {/* Avatar Grid - Optimized Spacing - Larger Cards on Mobile */}
                  <div 
                    className={cn(
                      "grid",
                    isMobile 
                        ? "grid-cols-2 gap-3" 
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
                    )}
                    style={{ 
                      contain: 'layout style paint',
                      contentVisibility: 'auto',
                    }}
                  >
                    {avatarEmojis.map((emoji, index) => {
                      const name = t(avatarNameKeys[index]);
                      const description = t(avatarDescKeys[index]);
                      const rarity = avatarRarities[index];
                      const unlocked = avatarUnlocked[index];
                      const isSelected = currentSelection === emoji;
                      
                      let rarityIcon = null;
                      if (rarity === 'rare') rarityIcon = <Star className="h-3 w-3 text-yellow-500" />;
                      else if (rarity === 'epic') rarityIcon = <Trophy className="h-3 w-3 text-yellow-500" />;
                      else if (rarity === 'legendary') rarityIcon = <Zap className="h-3 w-3 text-yellow-500" />;
                      
                      let rarityStyles = 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100';
                      if (rarity === 'rare') rarityStyles = 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100';
                      else if (rarity === 'epic') rarityStyles = 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100';
                      else if (rarity === 'legendary') rarityStyles = 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100';

                      let rarityBadgeStyles = 'border-gray-400 text-gray-700 bg-gray-50';
                      if (rarity === 'rare') rarityBadgeStyles = 'border-blue-400 text-blue-700 bg-blue-50';
                      else if (rarity === 'epic') rarityBadgeStyles = 'border-purple-400 text-purple-700 bg-purple-50';
                      else if (rarity === 'legendary') rarityBadgeStyles = 'border-yellow-400 text-yellow-700 bg-yellow-50';
                      
                      return (
                        <motion.div
                          key={`avatar-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: isMobile ? Math.min(index * 0.02, 0.2) : index * 0.05,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          className="relative"
                          style={{ willChange: 'opacity, transform' }}
                        >
                          <div
                            className={cn(
                              'relative flex flex-col items-center rounded-xl transition-all duration-300 cursor-pointer border-2',
                              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                              'transform hover:scale-105 hover:shadow-lg active:scale-95',
                              isMobile ? 'p-3 min-h-[160px]' : 'p-3 sm:p-4 min-h-[140px] sm:min-h-[160px]',
                              unlocked 
                                ? 'hover:bg-gray-50' 
                                : 'opacity-90 hover:opacity-100 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 hover:border-orange-300 hover:shadow-orange-200/50',
                              isSelected && unlocked
                                ? 'bg-blue-50 ring-2 ring-blue-500 shadow-md' 
                                : '',
                              rarityStyles
                            )}
                            tabIndex={0}
                            role="button"
                            aria-label={`${name} - ${unlocked ? 'Available' : 'Locked'} - ${description}`}
                            onClick={() => handleAvatarClick(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          >
                            {/* Rarity indicator */}
                            {rarity !== 'common' && (
                              <div className="absolute -top-1 -right-1 z-20 p-1 rounded-full bg-white shadow-md border">
                                {rarityIcon}
                              </div>
                            )}

                            {/* Lock indicator */}
                            {!unlocked && (
                              <div className="absolute -top-1 -left-1 z-20">
                                <div className={cn(
                                  "flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg border-2 border-white",
                                  isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-8 sm:h-8"
                                )}>
                                  <Lock className={cn(
                                    "text-white",
                                    isMobile ? "h-2 w-2" : "h-3 w-3 sm:h-4 sm:w-4"
                                  )} />
                                </div>
                              </div>
                            )}

                            {/* Avatar */}
                            <div className={cn("relative z-10", isMobile ? "mb-1" : "mb-2 sm:mb-3")}>
                              <EnhancedAvatar
                                emoji={emoji}
                                image={avatarImages[index]}
                                size={isMobile ? "md" : "md"}
                                glowColor={unlocked ? 'green' : 'yellow'}
                                className={!unlocked ? 'grayscale brightness-75' : ''}
                              />
                            </div>

                            {/* Avatar info */}
                            <div className="text-center relative z-10 space-y-1 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                                  {name}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className={cn('text-xs mb-1', rarityBadgeStyles)}
                                >
                                  {t(rarity)}
                                </Badge>
                                {!isMobile && (
                                  <p className="text-xs text-gray-600 leading-tight px-1 line-clamp-2">
                                    {description}
                                  </p>
                                )}
                              </div>

                              {/* Status indicator */}
                              <div className="flex items-center justify-center mt-1">
                                {unlocked ? (
                                  <div className="flex items-center text-green-600 text-xs">
                                    <CheckCircle className="h-2 w-2 mr-1" />
                                    <span className={isMobile ? "text-xs" : ""}>{t('available')}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-orange-600 text-xs">
                                    <Unlock className="h-2 w-2 mr-1" />
                                    <span className={isMobile ? "text-xs" : ""}>{t('unlock')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quests Tab */}
              {activeTab === 'quests' && (
                <div className="text-center py-6 sm:py-12">
                  <p className="text-gray-500 text-sm sm:text-base">
                    ⚔️ {t('questSystemComingSoon')}
                  </p>
                </div>
              )}

              {/* Frames Tab */}
              {activeTab === 'frames' && (
                <div className="text-center py-6 sm:py-12">
                  <p className="text-gray-500 text-sm sm:text-base">
                    🖼️ {t('avatarFramesComingSoon')}
                  </p>
                </div>
              )}

              {/* Themes Tab - Full Implementation */}
              {activeTab === 'themes' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Header with Preview */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                        🎨 {t('profileThemes')}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {t('customizeProfileBadge')}
                      </p>
                    </div>
                    {selectedTheme && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getThemeName(selectedTheme)}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (userProgress && selectedTheme) {
                              const updated = { ...userProgress, profileBackground: selectedTheme };
                              saveUserProgress(updated);
                              setUserProgress(updated);
                              onThemeChange?.(selectedTheme);
                              // Close modal after saving to show the change
                              setTimeout(() => {
                                onClose();
                              }, 300);
                            }
                          }}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          {t('save')}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div 
                    className="flex items-center gap-2 overflow-x-auto pb-2"
                    style={{
                      WebkitOverflowScrolling: 'touch',
                      overscrollBehavior: 'contain',
                      touchAction: 'pan-x',
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                  >
                    <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="flex gap-2">
                      {['all', 'nature', 'energy', 'cosmic', 'ocean', 'sunset', 'neon', 'pastel'].map((cat) => (
                        <Button
                          key={cat}
                          variant={themeCategory === cat ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setThemeCategory(cat)}
                          className="text-xs whitespace-nowrap"
                        >
                          {cat === 'all' ? t('all') : t(`category${cat.charAt(0).toUpperCase() + cat.slice(1)}`)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  {selectedTheme && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-3">{t('livePreview')}</p>
                        <div 
                          className="relative h-32 sm:h-40 rounded-lg overflow-hidden shadow-lg"
                          style={{
                            background: PROFILE_BACKGROUNDS[selectedTheme]?.gradient || PROFILE_BACKGROUNDS.default.gradient,
                            position: 'relative'
                          }}
                        >
                          {/* Iridescent animation overlay */}
                          {PROFILE_BACKGROUNDS[selectedTheme]?.animation === 'shimmer' && (
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
                          {PROFILE_BACKGROUNDS[selectedTheme]?.animation === 'aurora' && (
                            <motion.div
                              animate={{
                                x: ['-100%', '100%'],
                                rotate: [0, 360]
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              className="absolute inset-0 opacity-20"
                              style={{
                                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
                                width: '200%',
                                height: '200%'
                              }}
                            />
                          )}
                          {PROFILE_BACKGROUNDS[selectedTheme]?.animation === 'flow' && (
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
                          {PROFILE_BACKGROUNDS[selectedTheme]?.animation === 'pulse' && (
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
                          
                          {/* Preview Content */}
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="text-center">
                              <EnhancedAvatar
                                emoji={selectedAvatar || '👩‍🌾'}
                                image={selectedAvatar ? avatarImages[avatarEmojis.indexOf(selectedAvatar)] : avatarImages[0]}
                                size="lg"
                                glowColor="green"
                              />
                              <p className="text-white text-xs font-semibold mt-2 drop-shadow-lg">
                                {userProgress?.name || 'Aziza Karimova'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 text-center">
                          {getThemeDescription(selectedTheme)}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Theme Grid */}
                  <div className={cn(
                    "grid gap-3 sm:gap-4",
                    isMobile ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  )}>
                    {Object.entries(PROFILE_BACKGROUNDS)
                      .filter(([_, theme]) => themeCategory === 'all' || theme.category === themeCategory)
                      .map(([themeId, theme]) => {
                        const isSelected = selectedTheme === themeId;
                        const isUnlocked = theme.unlocked;
                        
                        return (
                          <motion.div
                            key={themeId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                          >
                            <div
                              className={cn(
                                "relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300",
                                isSelected 
                                  ? "border-green-500 ring-2 ring-green-500 ring-offset-2 shadow-lg" 
                                  : "border-gray-200 hover:border-gray-300",
                                !isUnlocked && "opacity-60 grayscale"
                              )}
                              onClick={() => {
                                if (isUnlocked) {
                                  setSelectedTheme(themeId);
                                }
                              }}
                            >
                              {/* Theme Preview */}
                              <div 
                                className="h-24 sm:h-32 relative overflow-hidden"
                                style={{
                                  background: theme.gradient
                                }}
                              >
                                {/* Animation Overlays */}
                                {theme.animation === 'shimmer' && (
                                  <motion.div
                                    animate={{
                                      x: ['-100%', '200%']
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                      transform: 'skewX(-20deg)'
                                    }}
                                  />
                                )}
                                {theme.animation === 'aurora' && (
                                  <motion.div
                                    animate={{
                                      rotate: [0, 360],
                                      scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                      duration: 6,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                      background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)'
                                    }}
                                  />
                                )}
                                {theme.animation === 'flow' && (
                                  <motion.div
                                    animate={{
                                      backgroundPosition: ['0% 0%', '100% 100%']
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "linear",
                                      repeatType: "reverse"
                                    }}
                                    className="absolute inset-0 opacity-25"
                                    style={{
                                      background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)`,
                                      backgroundSize: '200% 200%'
                                    }}
                                  />
                                )}
                                {theme.animation === 'pulse' && (
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.1, 1],
                                      opacity: [0.1, 0.3, 0.1]
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                    className="absolute inset-0"
                                    style={{
                                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
                                    }}
                                  />
                                )}

                                {/* Lock Overlay */}
                                {!isUnlocked && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                    <Lock className="h-6 w-6 text-white" />
                                  </div>
                                )}

                                {/* Selected Indicator */}
                                {isSelected && isUnlocked && (
                                  <div className="absolute top-2 right-2 z-10">
                                    <div className="bg-green-500 rounded-full p-1">
                                      <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                  </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute bottom-2 left-2 z-10">
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs bg-white/80 backdrop-blur-sm border-white/50"
                                  >
                                    {t(`category${theme.category.charAt(0).toUpperCase() + theme.category.slice(1)}`)}
                                  </Badge>
                                </div>
                              </div>

                              {/* Theme Info */}
                              <div className="p-3 bg-white">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                                  {getThemeName(themeId)}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {getThemeDescription(themeId)}
                                </p>
                                {theme.animation && theme.animation !== 'none' && (
                                  <div className="mt-2 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-purple-500" />
                                    <span className="text-xs text-purple-600 capitalize">
                                      {theme.animation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>

                </div>
              )}
            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            {isMobile && (activeTab === 'themes' ? selectedTheme : currentSelection) && (
              <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20 flex-shrink-0">
                <div className="p-2 flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="flex-1 h-10 text-sm font-medium border-2"
                  >
                    {t('cancel')}
                  </Button>
                  <Button 
                    className="flex-1 h-10 text-sm font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg"
                    onClick={handleConfirm}
                    disabled={activeTab === 'themes' ? !selectedTheme : !currentSelection}
                  >
                    {t('confirm')}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Task Modal */}
      <AnimatePresence>
        {selectedTaskId && taskTitles[selectedTaskId] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-3 sm:p-4"
            onClick={handleCloseTask}
            onTouchStart={(e) => {
              if (e.target === e.currentTarget) {
                e.preventDefault();
              }
            }}
            style={{ touchAction: 'none' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col",
                isMobile 
                  ? "w-[calc(100vw-1.5rem)] mx-auto"
                  : "w-full max-w-sm sm:max-w-md"
              )}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                touchAction: 'pan-y',
                maxHeight: isMobile && viewportSize.height > 0
                  ? `${Math.min(viewportSize.height * 0.85, viewportSize.height - 32)}px`
                  : isMobile
                  ? '85dvh'
                  : 'min(85vh, calc(100vh - 2rem))',
                height: isMobile && viewportSize.height > 0
                  ? `${Math.min(viewportSize.height * 0.85, viewportSize.height - 32)}px`
                  : 'auto',
                maxWidth: isMobile && viewportSize.width > 0
                  ? `${Math.min(viewportSize.width - 24, 400)}px`
                  : undefined,
              }}
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {t(taskTitleKeys[selectedTaskId])}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseTask}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className={cn('text-xs', 
                  taskDiffs[selectedTaskId] === 'easy' ? 'bg-green-100 text-green-800 border-green-300' :
                  taskDiffs[selectedTaskId] === 'hard' ? 'bg-red-100 text-red-800 border-red-300' :
                  'bg-yellow-100 text-yellow-800 border-yellow-300'
                )}>
                  {t(taskDiffs[selectedTaskId])} {t('challenge')}
                </Badge>
              </div>
              
              <div 
                className="p-4 sm:p-6 overflow-y-auto flex-1"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y',
                  maxHeight: isMobile && viewportSize.height > 0
                    ? `${Math.max(150, Math.min(viewportSize.height * 0.85 - 180, viewportSize.height - 212))}px`
                    : isMobile
                    ? 'calc(85dvh - 180px)'
                    : 'calc(85vh - 180px)',
                  minHeight: isMobile ? '150px' : '200px',
                }}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
              >
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {t(taskDescKeys[selectedTaskId])}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('requirements')}:</h4>
                    <ul className="space-y-2">
                      {taskReqs[selectedTaskId] && taskReqs[selectedTaskId].map((req, index) => (
                        <li key={`req-${index}`} className="flex items-start text-sm text-gray-600">
                          <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-green-900 mb-1">{t('reward')}:</h4>
                    <p className="text-sm text-green-700">{t(taskRewardKeys[selectedTaskId])}</p>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "border-t border-gray-200 bg-gray-50",
                isMobile ? "p-3" : "p-4 sm:p-6"
              )}>
                <div className={cn(
                  isMobile ? "flex flex-col gap-2" : "flex flex-col sm:flex-row gap-2 sm:gap-3"
                )}>
                  {isMobile ? (
                    <>
                      <Button
                        className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:scale-95 transition-all duration-200"
                      >
                        {t('startChallenge')}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCloseTask}
                        className="w-full h-10 text-sm font-medium border-2 active:scale-95 transition-all duration-200"
                      >
                        {t('close')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleCloseTask}
                        className="flex-1 order-2 sm:order-1"
                      >
                        {t('close')}
                      </Button>
                      <Button
                        className="flex-1 order-1 sm:order-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        {t('startChallenge')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};