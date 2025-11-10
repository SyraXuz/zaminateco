import { MapPin, Vote, Calendar, ShoppingBag, BookOpen, User, Home, Users, Handshake, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const navigationItems = [
  { path: '/', icon: Home, labelKey: 'home' as const },
  { path: '/map', icon: MapPin, labelKey: 'ecoMap' as const },
  { path: '/vote', icon: Vote, labelKey: 'ecoVote' as const },
  { path: '/actions', icon: Calendar, labelKey: 'actions' as const },
  { path: '/shop', icon: ShoppingBag, labelKey: 'shop' as const },
  { path: '/stories', icon: BookOpen, labelKey: 'stories' as const },
  { path: '/profile', icon: User, labelKey: 'profile' as const }
];

const secondaryNavigationItems = [
  { path: '/partners', icon: Handshake, labelKey: 'partners' as const },
  { path: '/team', icon: Users, labelKey: 'team' as const },
  { path: '/contacts', icon: Mail, labelKey: 'contacts' as const }
];

export default function Navigation() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {/* Main Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-1 z-50 shadow-lg mobile-nav">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors min-w-0 flex-1 max-w-[80px] smooth-transition hover-effect touch-feedback",
                  isActive
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                )}
              >
                <Icon className="h-4 w-4 mb-0.5 flex-shrink-0" />
                <span className="text-[10px] font-medium text-center leading-tight break-words hyphens-auto max-w-full">
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Secondary Navigation (Desktop/Tablet) */}
      <div className="hidden md:block fixed top-4 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
          <div className="flex flex-col gap-2">
            {secondaryNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm smooth-transition hover-effect",
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Secondary Navigation Menu */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1">
          <div className="flex gap-1">
            {secondaryNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-md transition-colors smooth-transition hover-effect touch-feedback btn-touch",
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  )}
                  title={t(item.labelKey)}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}