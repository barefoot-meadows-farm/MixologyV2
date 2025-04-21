
import React from 'react';
import { UserCog, Shield, Trash2, ChevronRight } from 'lucide-react';
import { SettingsSection, SettingsLink } from './SettingsUtils';

const AccountSettingsSection = () => (
  <SettingsSection title="Account Settings" icon={<UserCog size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
    <SettingsLink
      to="/settings/profile"
      icon={<UserCog size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Profile Information"
    />
    <SettingsLink
      to="/settings/security"
      icon={<Shield size={20} className="text-gray-500 dark:text-gray-300" />}
      label="Password & Security"
    />
    <SettingsLink
      to="/settings/delete-account"
      icon={<Trash2 size={20} className="text-red-500" />}
      label="Delete Account"
      rightElement={<ChevronRight size={18} className="text-red-400" />}
    />
  </SettingsSection>
);

export default AccountSettingsSection;
