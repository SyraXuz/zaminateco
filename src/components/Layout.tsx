import { Home, MapPin, Vote, Calendar, ShoppingBag, BookOpen, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const { t } = useTranslation('common'); // Specify the common namespace
  const isHomePage = location.pathname === '/';

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/map', icon: MapPin, label: t('ecoMap') },
    { path: '/vote', icon: Vote, label: t('ecoVote') },
    { path: '/actions', icon: Calendar, label: t('actions') },
    { path: '/shop', icon: ShoppingBag, label: t('shop') },
    { path: '/stories', icon: BookOpen, label: t('stories') },
    { path: '/profile', icon: User, label: t('profile') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show header if NOT on home page */}
      {!isHomePage && (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Link to="/" className="flex items-center space-x-3">
                  <img 
                    src="/logo.png" 
                    alt="ZAMINAT.eco Logo" 
                    className="h-10 w-10"
                    loading="lazy"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">ZAMINAT.eco</h1>
                    <p className="text-sm text-gray-600">Ecological Movement</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </header>
      )}
      
      {/* Main content with bottom padding for navigation */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-1 z-50 shadow-lg">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors min-w-0 flex-1 max-w-[80px]",
                  isActive
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                )}
              >
                <Icon className="h-4 w-4 mb-0.5 flex-shrink-0" />
                <span className="text-[10px] font-medium text-center leading-tight break-words hyphens-auto max-w-full">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}