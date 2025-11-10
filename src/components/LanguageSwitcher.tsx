import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'uz', flag: '🇺🇿', name: 'O\'zbekcha' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-800 hover:text-gray-900 font-medium"
        >
          <Globe className="h-4 w-4 text-blue-600 animate-pulse" />
          <span className="hidden sm:inline text-lg animate-bounce">{currentLanguage.flag}</span>
          <span className="text-sm font-bold text-gray-900 tracking-wide">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] bg-white/95 backdrop-blur-md border-white/20 shadow-2xl">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-3 cursor-pointer p-3 transition-all duration-200 hover:scale-105 ${
              currentLanguage.code === language.code 
                ? 'bg-green-100 text-green-800 font-semibold shadow-md' 
                : 'hover:bg-blue-50 hover:text-blue-800'
            }`}
          >
            <span className="text-xl animate-pulse">{language.flag}</span>
            <span className="text-sm font-medium">{language.name}</span>
            <span className="text-xs text-gray-600 ml-auto font-bold">{language.code.toUpperCase()}</span>
            {currentLanguage.code === language.code && (
              <span className="text-green-600 ml-1 animate-bounce">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}