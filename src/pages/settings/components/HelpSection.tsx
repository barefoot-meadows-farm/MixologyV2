
import React from 'react';
import { HelpCircle, Mail } from 'lucide-react';
import { SettingsSection, SettingsLink } from './SettingsUtils';

const HelpSection = () => (
  <SettingsSection title="Help & Support" icon={<HelpCircle size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
    <SettingsLink
      to="/settings/faq"
      icon={<HelpCircle size={20} className="text-gray-500 dark:text-gray-300" />}
      label="FAQ"
    />
    <SettingsLink
      to="/settings/contact"
      icon={<Mail size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Contact Us"
    />
    <SettingsLink
      to="/settings/feedback"
      icon={<HelpCircle size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Submit Feedback"
    />
  </SettingsSection>
);

export default HelpSection;
