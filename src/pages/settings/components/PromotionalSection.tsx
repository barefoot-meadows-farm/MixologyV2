
import React from 'react';
import { Gift } from 'lucide-react';
import { SettingsSection, SettingsLink } from './SettingsUtils';

const PromotionalSection = () => (
  <SettingsSection title="Promotional" icon={<Gift size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
    <SettingsLink
      to="/settings/promo-code"
      icon={<Gift size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Enter Promo Code"
    />
    <SettingsLink
      to="/settings/invite"
      icon={<Gift size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Invite Friends"
    />
  </SettingsSection>
);

export default PromotionalSection;
