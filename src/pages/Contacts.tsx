import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink,
  Instagram,
  Linkedin,
  Sparkles,
  Heart,
  Star,
  Leaf,
  Recycle,
  TreePine,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Simplified floating elements for mobile
const FloatingElements = () => {
  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-green-200/20 blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Simplified background for mobile
const SimpleBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/60 to-purple-50/40" />
  </div>
);

// Animation variants - simplified for mobile
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Contact information - mobile optimized
const contactInfo = [
  {
    icon: Mail,
    title: "CEO Email",
    value: "sukhrobjonrikhsiboev@gmail.com",
    link: "mailto:sukhrobjonrikhsiboev@gmail.com",
    color: "blue"
  },
  {
    icon: Phone,
    title: "CEO Phone",
    value: "+998 95 188 18 88",
    link: "tel:+998951881888",
    color: "green"
  },
  {
    icon: Mail,
    title: "Official Email",
    value: "zaminateco@gmail.com",
    link: "mailto:zaminateco@gmail.com",
    color: "purple"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Tashkent, Uzbekistan",
    color: "orange"
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon-Fri: 9AM-6PM",
    color: "indigo"
  }
];

// Social media - mobile optimized
const socialMedia = [
  {
    icon: Send,
    platform: "Telegram",
    handle: "@ZaminatEco",
    description: "Russian & English updates",
    link: "https://t.me/ZaminatEco",
    color: "blue",
    followers: "1.2K+"
  },
  {
    icon: Send,
    platform: "Telegram",
    handle: "@zaminat_eco",
    description: "O'zbek tilida yangiliklar",
    link: "https://t.me/zaminat_eco",
    color: "teal",
    followers: "850+"
  },
  {
    icon: Instagram,
    platform: "Instagram",
    handle: "@zaminat.eco",
    description: "Visual stories & tips",
    link: "https://instagram.com/zaminat.eco",
    color: "pink",
    followers: "2.1K+"
  },
  {
    icon: Linkedin,
    platform: "LinkedIn",
    handle: "Sukhrobjon Rikhsiboev",
    description: "Professional network",
    link: "https://www.linkedin.com/in/sukhrobjon-rikhsiboev-5b9878386/",
    color: "indigo",
    followers: "500+"
  }
];

// Mobile-first contact card
const ContactCard = ({ contact }: { contact: typeof contactInfo[0] }) => {
  const Icon = contact.icon;
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full border bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-3 sm:p-4 text-center">
          <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-${contact.color}-100 text-${contact.color}-600 rounded-lg mb-2 sm:mb-3`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{contact.title}</h3>
          
          {contact.link ? (
            <a 
              href={contact.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-${contact.color}-600 hover:text-${contact.color}-700 hover:underline transition-colors text-xs sm:text-sm break-all block`}
            >
              {contact.value}
            </a>
          ) : (
            <p className="text-gray-600 text-xs sm:text-sm">{contact.value}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Mobile-first social card with fixed button colors
const SocialCard = ({ social }: { social: typeof socialMedia[0] }) => {
  const Icon = social.icon;
  
  // Define proper button colors
  const getButtonColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 hover:bg-blue-600';
      case 'teal': return 'bg-teal-500 hover:bg-teal-600';
      case 'pink': return 'bg-pink-500 hover:bg-pink-600';
      case 'indigo': return 'bg-indigo-500 hover:bg-indigo-600';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getIconBg = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'teal': return 'bg-teal-100 text-teal-600';
      case 'pink': return 'bg-pink-100 text-pink-600';
      case 'indigo': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'teal': return 'bg-teal-500';
      case 'pink': return 'bg-pink-500';
      case 'indigo': return 'bg-indigo-500';
      default: return 'bg-blue-500';
    }
  };
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full border bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 ${getIconBg(social.color)} rounded-lg`}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="text-right">
              <Badge className={`${getBadgeColor(social.color)} text-white border-0 text-xs`}>
                {social.platform}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">{social.followers}</p>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{social.handle}</h3>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">{social.description}</p>
          
          <Button
            size="sm"
            className={`w-full ${getButtonColor(social.color)} text-white border-0 font-medium text-xs`}
            onClick={() => window.open(social.link, '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Follow
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };

  return (
    <Layout title="Contact Us">
      <div className="min-h-screen relative overflow-hidden">
        <SimpleBackground />
        <FloatingElements />
        
        <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12"
          >
            {/* Mobile-first Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4"
              >
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Get In Touch
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
                Have questions about our sustainability mission? Want to partner with us? 
                We'd love to hear from you.
              </p>

              {/* Mobile-optimized stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg sm:max-w-2xl mx-auto mt-4 sm:mt-6">
                {[
                  { icon: Heart, label: "Clients", value: "500+" },
                  { icon: Globe, label: "Cities", value: "12+" },
                  { icon: Recycle, label: "Recycled", value: "50T+" },
                  { icon: TreePine, label: "Trees", value: "1K+" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center p-2 sm:p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm"
                  >
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 text-green-600" />
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile-first content layout */}
            <div className="space-y-6 md:space-y-8">
              
              {/* Contact Form - Full width on mobile */}
              <motion.div variants={itemVariants}>
                <Card className="border bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mr-3 shadow-md">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {showSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center py-8"
                        >
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                          <p className="text-gray-600">We'll get back to you within 24 hours!</p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                              </label>
                              <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                required
                                className="h-10 sm:h-11 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                              </label>
                              <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                required
                                className="h-10 sm:h-11 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-300"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subject *
                            </label>
                            <Input
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="What's this about?"
                              required
                              className="h-10 sm:h-11 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-300"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Message *
                            </label>
                            <Textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Tell us more about your inquiry..."
                              rows={4}
                              required
                              className="border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-300 resize-none"
                            />
                          </div>
                          
                          <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg border-0"
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                                >
                                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                                </motion.div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information - Mobile grid */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Contact Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                  {contactInfo.map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                  ))}
                </div>
              </motion.div>

              {/* Social Media - Mobile grid */}
              <motion.div variants={itemVariants}>
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Follow Our Journey</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Stay connected with our sustainability efforts
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {socialMedia.map((social, index) => (
                    <SocialCard key={index} social={social} />
                  ))}
                </div>
              </motion.div>

              {/* Emergency Contact CTA - Mobile optimized */}
              <motion.div variants={itemVariants} className="text-center">
                <Card className="border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                      <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Need Immediate Assistance?</h2>
                    <p className="text-orange-100 mb-6 text-sm sm:text-base leading-relaxed">
                      For urgent environmental issues or partnership opportunities, 
                      contact our CEO directly.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        size="sm"
                        className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg"
                        onClick={() => window.open('tel:+998951881888', '_blank')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-lg"
                        onClick={() => window.open('mailto:sukhrobjonrikhsiboev@gmail.com?subject=Urgent Inquiry', '_blank')}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email CEO
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}