
import React from 'react';
import { Shield } from 'lucide-react';
import { SettingsSection, SettingsLink } from './SettingsUtils';

const LegalSection = () => (
  <SettingsSection title="Legal & Policies" icon={<Shield size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
    <SettingsLink
      to="/settings/privacy"
      icon={<Shield size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Privacy Policy"
    />
    <SettingsLink
      to="/settings/terms"
      icon={<Shield size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Terms of Service"
    />
  </SettingsSection>
);

export default LegalSection;
