import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import About from './pages/About';
import EcoMap from './pages/EcoMap';
import EcoVote from './pages/EcoVote';
import EcoActions from './pages/EcoActions';
import SocialMissionShop from './pages/SocialMissionShop';
import EcoStories from './pages/EcoStories';
import Profile from './pages/Profile';
import Partners from './pages/Partners';
import Team from './pages/Team';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import './styles/enhanced-mobile.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<EcoMap />} />
          <Route path="/vote" element={<EcoVote />} />
          <Route path="/actions" element={<EcoActions />} />
          <Route path="/shop" element={<SocialMissionShop />} />
          <Route path="/stories" element={<EcoStories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;