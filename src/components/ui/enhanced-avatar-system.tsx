import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Star, Trophy, Zap, CheckCircle, Unlock } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import { EnhancedAvatar } from './enhanced-avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedAvatarSystemProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAvatar?: string;
  onAvatarSelect: (emoji: string) => void;
}

export const EnhancedAvatarSystem: React.FC<EnhancedAvatarSystemProps> = ({
  isOpen,
  onClose,
  selectedAvatar = '',
  onAvatarSelect
}) => {
  const [activeTab, setActiveTab] = useState('avatars');
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [currentSelection, setCurrentSelection] = useState(selectedAvatar);
  const isMobile = useIsMobile();

  // Completely flat data - no nested objects
  const avatarEmojis = ['👩‍🌾', '🌱', '🌿', '🌳', '♻️', '🌍', '💧', '☀️', '⚡', '🔥', '🌟', '🔮', '🦋'];
  const avatarNames = ['Eco Farmer', 'Green Sprout', 'Leaf Guardian', 'Tree Protector', 'Recycling Hero', 'Earth Guardian', 'Water Saver', 'Solar Champion', 'Energy Saver', 'Climate Warrior', 'Eco Star', 'Future Visionary', 'Nature Lover'];
  const avatarDescs = ['Your sustainability journey begins', 'New growth, fresh starts', 'Protector of nature', 'Guardian of the forest', 'Master of waste transformation', 'Protector of our planet', 'Champion of water conservation', 'Advocate for renewable energy', 'Master of energy efficiency', 'Leader in climate action', 'Ultimate environmental champion', 'Pioneer of sustainability innovation', 'Guardian of biodiversity'];
  const avatarRarities = ['common', 'common', 'common', 'rare', 'rare', 'rare', 'epic', 'epic', 'epic', 'epic', 'legendary', 'legendary', 'legendary'];
  const avatarUnlocked = [true, true, true, true, true, true, true, true, false, false, false, false, false];
  const avatarTasks = ['', '', '', '', '', '', '', '', 'energy_master', 'climate_action', 'eco_champion', 'innovation_leader', 'biodiversity_protector'];

  const taskTitles = {
    'energy_master': 'Energy Master Challenge',
    'climate_action': 'Climate Action Hero',
    'eco_champion': 'Ultimate Eco Champion',
    'innovation_leader': 'Sustainability Innovation Leader',
    'biodiversity_protector': 'Biodiversity Protection Champion'
  };

  const taskDescs = {
    'energy_master': 'Become a master of energy efficiency and unlock the Energy Saver avatar!',
    'climate_action': 'Lead the fight against climate change!',
    'eco_champion': 'Prove yourself as the ultimate environmental champion!',
    'innovation_leader': 'Pioneer new ways to protect our planet!',
    'biodiversity_protector': 'Become a guardian of nature\'s diversity!'
  };

  const taskRewards = {
    'energy_master': 'Energy Saver Avatar + 500 EcoPoints',
    'climate_action': 'Climate Warrior Avatar + 750 EcoPoints',
    'eco_champion': 'Eco Star Avatar + 1000 EcoPoints + Special Badge',
    'innovation_leader': 'Future Visionary Avatar + 1200 EcoPoints + Innovation Badge',
    'biodiversity_protector': 'Nature Lover Avatar + 1500 EcoPoints + Conservation Badge'
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
    if (currentSelection) {
      onAvatarSelect(currentSelection);
      onClose();
    }
  }, [currentSelection, onAvatarSelect, onClose]);

  const handleCloseTask = useCallback(() => {
    setSelectedTaskId('');
  }, []);

  if (!isOpen) return null;

  const unlockedCount = avatarUnlocked.filter(Boolean).length;
  const selectedName = currentSelection ? (avatarNames[avatarEmojis.indexOf(currentSelection)] || 'None') : 'None';

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl w-full overflow-hidden",
              isMobile 
                ? "max-w-sm max-h-[85vh] mb-16"
                : "max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[95vh] sm:max-h-[90vh]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={cn(
              "relative border-b border-gray-200 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50",
              isMobile ? "p-3" : "p-4 sm:p-6"
            )}>
              <div className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                isMobile ? "mb-3" : "mb-4"
              )}>
                <div>
                  <h2 className={cn(
                    "font-bold text-gray-900",
                    isMobile ? "text-lg mb-1" : "text-xl sm:text-2xl mb-2"
                  )}>
                    🎭 Avatar & Achievement System
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Level 15 • 14,400 EcoPoints • 250 🪙
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="self-end sm:self-auto h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Selection Bar - Moved to Top */}
              <div className={cn(
                "border border-gray-200 bg-white rounded-lg mb-4",
                isMobile ? "p-2" : "p-3"
              )}>
                {isMobile ? (
                  // Mobile Layout: Compact stacked buttons
                  <div className="space-y-2">
                    {currentSelection && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <EnhancedAvatar
                            emoji={currentSelection}
                            size="sm"
                            glowColor="green"
                          />
                          <div>
                            <p className="text-xs font-semibold text-gray-900">Selected</p>
                            <p className="text-xs text-gray-600">{selectedName}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Ready
                        </Badge>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <Button 
                        className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg active:scale-95 transition-all duration-200"
                        onClick={handleConfirm}
                        disabled={!currentSelection}
                      >
                        Confirm Selection
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="w-full h-10 text-sm font-medium border-2 active:scale-95 transition-all duration-200"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Desktop Layout: Horizontal layout
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <span>Selected: <strong>{selectedName}</strong></span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="order-2 sm:order-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="order-1 sm:order-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        onClick={handleConfirm}
                        disabled={!currentSelection}
                      >
                        Confirm Selection
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1 overflow-x-auto">
                <Button
                  variant={activeTab === 'avatars' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('avatars')}
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 min-w-0 px-2 sm:px-3"
                >
                  <span className="mr-1 sm:mr-2">🎭</span>
                  <span className="hidden xs:inline">Avatars</span>
                </Button>
                <Button
                  variant={activeTab === 'quests' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('quests')}
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 min-w-0 px-2 sm:px-3"
                >
                  <span className="mr-1 sm:mr-2">⚔️</span>
                  <span className="hidden xs:inline">Quests</span>
                </Button>
                <Button
                  variant={activeTab === 'frames' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('frames')}
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 min-w-0 px-2 sm:px-3"
                >
                  <span className="mr-1 sm:mr-2">🖼️</span>
                  <span className="hidden xs:inline">Frames</span>
                </Button>
                <Button
                  variant={activeTab === 'themes' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('themes')}
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0 min-w-0 px-2 sm:px-3"
                >
                  <span className="mr-1 sm:mr-2">🎨</span>
                  <span className="hidden xs:inline">Themes</span>
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className={cn(
              "overflow-y-auto",
              isMobile 
                ? "p-2 max-h-[calc(85vh-300px)]" // Adjusted for moved bar
                : "p-3 sm:p-6 max-h-[calc(95vh-280px)] sm:max-h-[calc(90vh-320px)]" // Adjusted for moved bar
            )}>
              {activeTab === 'avatars' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-6 gap-2">
                    <h3 className="text-sm sm:text-lg font-semibold">Avatar Collection</h3>
                    <Badge variant="outline" className="text-xs self-start sm:self-auto">
                      {unlockedCount}/{avatarEmojis.length} unlocked
                    </Badge>
                  </div>

                  {/* Avatar Grid */}
                  <div className={cn(
                    "grid gap-2 sm:gap-4 lg:gap-6",
                    isMobile 
                      ? "grid-cols-2" 
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  )}>
                    {avatarEmojis.map((emoji, index) => {
                      const name = avatarNames[index];
                      const description = avatarDescs[index];
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
                          transition={{ delay: index * 0.05 }}
                          className="relative"
                        >
                          <div
                            className={cn(
                              'relative flex flex-col items-center rounded-xl transition-all duration-300 cursor-pointer border-2',
                              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                              'transform hover:scale-105 hover:shadow-lg active:scale-95',
                              isMobile ? 'p-2 min-h-[120px]' : 'p-3 sm:p-4 min-h-[140px] sm:min-h-[160px]',
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
                                size={isMobile ? "sm" : "md"}
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
                                  {rarity}
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
                                    <span className={isMobile ? "text-xs" : ""}>Available</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-orange-600 text-xs">
                                    <Unlock className="h-2 w-2 mr-1" />
                                    <span className={isMobile ? "text-xs" : ""}>Unlock</span>
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

              {/* Other tabs */}
              {activeTab !== 'avatars' && (
                <div className="text-center py-6 sm:py-12">
                  <p className="text-gray-500 text-sm sm:text-base">
                    {activeTab === 'quests' ? '⚔️ Quest system coming soon!' : ''}
                    {activeTab === 'frames' ? '🖼️ Avatar frames coming soon!' : ''}
                    {activeTab === 'themes' ? '🎨 Custom themes coming soon!' : ''}
                  </p>
                </div>
              )}
            </div>
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
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "bg-white rounded-2xl shadow-2xl w-full overflow-hidden",
                isMobile 
                  ? "max-w-sm max-h-[80vh] mb-16"
                  : "max-w-sm sm:max-w-md max-h-[85vh]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {taskTitles[selectedTaskId]}
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
                  {taskDiffs[selectedTaskId].charAt(0).toUpperCase() + taskDiffs[selectedTaskId].slice(1)} Challenge
                </Badge>
              </div>
              
              <div className="p-4 sm:p-6 overflow-y-auto">
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {taskDescs[selectedTaskId]}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
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
                    <h4 className="text-sm font-semibold text-green-900 mb-1">Reward:</h4>
                    <p className="text-sm text-green-700">{taskRewards[selectedTaskId]}</p>
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
                        Start Challenge
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCloseTask}
                        className="w-full h-10 text-sm font-medium border-2 active:scale-95 transition-all duration-200"
                      >
                        Close
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleCloseTask}
                        className="flex-1 order-2 sm:order-1"
                      >
                        Close
                      </Button>
                      <Button
                        className="flex-1 order-1 sm:order-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Start Challenge
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