import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Settings, Calculator, Code, Users, Mail, Phone, Star, Award, ExternalLink, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  emoji: string;
  color: string;
  roleIcon: React.ComponentType<{ className?: string }>;
  specialty: string;
  description: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  skills: string[];
  achievements: string[];
}

// Interface for member data from translations
interface MemberData {
  name?: string;
  position?: string;
  role?: string;
  description?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  skills?: string[];
  achievements?: string[];
}

// Team member card component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const { t } = useTranslation('team');
  const RoleIcon = member.roleIcon;
  
  const handleContactClick = () => {
    if (member.email) {
      window.open(`mailto:${member.email}`, '_blank');
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      className="h-full"
    >
      <Card className={`h-full hover:shadow-2xl transition-all duration-500 group border-2 hover:border-${member.color}-200 bg-gradient-to-br from-white to-gray-50 overflow-hidden`}>
        <CardHeader className="pb-4 relative">
          {/* Background decoration */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${member.color}-100 to-${member.color}-50 rounded-full -translate-y-16 translate-x-16 opacity-50`} />
          
          <div className="relative z-10">
            {/* Role icon and badge */}
            <div className="flex items-center justify-between mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-4 rounded-full bg-${member.color}-100 text-${member.color}-600 transition-all duration-300`}
              >
                <RoleIcon className="h-8 w-8" />
              </motion.div>
              <Badge className={`bg-gradient-to-r from-${member.color}-500 to-${member.color}-600 text-white font-semibold px-3 py-1`}>
                {member.role}
              </Badge>
            </div>

            {/* Member info */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{member.emoji}</div>
              <CardTitle className={`text-xl font-bold text-gray-900 group-hover:text-${member.color}-700 transition-colors`}>
                {member.name}
              </CardTitle>
              <p className={`text-sm font-medium text-${member.color}-600 mb-2`}>
                {member.specialty}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Contact information - ONLY show if provided */}
          {(member.email || member.phone || member.linkedin) && (
            <div className="space-y-2">
              {member.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-green-600" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-green-600" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.linkedin && (
                <div className="flex items-center text-sm text-gray-600">
                  <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {t('team.labels.linkedinProfile', 'LinkedIn Profile')}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              {t('team.labels.coreSkills', 'Core Skills')}
            </h4>
            <div className="flex flex-wrap gap-1">
              {member.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
              <Award className="h-4 w-4 mr-1 text-green-600" />
              {t('team.labels.keyAchievements', 'Key Achievements')}
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {member.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className={`w-2 h-2 bg-${member.color}-500 rounded-full mt-1.5 mr-2 flex-shrink-0`} />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact button - ONLY show if email is available */}
          {member.email && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleContactClick}
                className={`w-full bg-gradient-to-r from-${member.color}-500 to-${member.color}-600 hover:from-${member.color}-600 hover:to-${member.color}-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact {member.name.split(' ')[0]}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Team() {
  const { t } = useTranslation('team');

  // Get team members from translations with proper structure
  const getTeamMembers = (): TeamMember[] => {
    const members = ['sukhrobjon', 'azamat', 'khondamir', 'islombek'];
    const icons = [Crown, Settings, Calculator, Code];
    const colors = ['blue', 'green', 'purple', 'orange'];
    const emojis = ['👨‍💼', '👨‍⚙️', '👨‍💻', '👨‍💻'];

    return members.map((memberKey, index) => {
      const memberData = t(`team.members.${memberKey}`, { returnObjects: true }) as MemberData;
      
      return {
        id: index + 1,
        name: memberData?.name || `Member ${index + 1}`,
        role: memberData?.position || 'Team Member',
        emoji: emojis[index],
        color: colors[index],
        roleIcon: icons[index],
        specialty: memberData?.role || 'Specialist',
        description: memberData?.description || 'Team member description',
        email: memberData?.email,
        phone: memberData?.phone,
        linkedin: memberData?.linkedin,
        skills: memberData?.skills || [],
        achievements: memberData?.achievements || []
      };
    });
  };

  const teamMembers = getTeamMembers();

  return (
    <Layout title={t('team.title', 'Our Team')}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header section */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {t('team.title', 'Meet Our Team')}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('team.subtitle', 'The passionate individuals behind ZAMINAT.eco, working together to create a sustainable future for Uzbekistan through innovation and community engagement.')}
              </p>

              {/* Team stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {t('team.stats.members.value', '4')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('team.stats.members.label', 'Team Members')}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {t('team.stats.founded.value', '2025')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('team.stats.founded.label', 'Founded')}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">
                    {t('team.stats.mission.value', '1')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('team.stats.mission.label', 'Mission')}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">
                    {t('team.stats.impact.value', '∞')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('team.stats.impact.label', 'Impact')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team members grid */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teamMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.div variants={itemVariants} className="text-center space-y-6 py-12">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {t('team.cta.title', 'Join Our Mission')}
                  </h2>
                  <p className="text-blue-100 mb-6">
                    {t('team.cta.description', "We're always looking for passionate individuals who share our vision of creating a sustainable future. Join our team and make a real impact.")}
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                    onClick={() => window.open('mailto:sukhrobjonrikhsiboev@gmail.com?subject=Join ZAMINAT.eco Team', '_blank')}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    {t('team.cta.button', 'Join Our Team')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}