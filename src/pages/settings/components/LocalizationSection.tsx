
import React from 'react';
import { Languages } from 'lucide-react';
import { SettingsSection, SettingsLink } from './SettingsUtils';
import { useSettings } from '@/contexts/SettingsContext';

const LocalizationSection = () => {
  const { language, region } = useSettings();
  return (
    <SettingsSection title="Localization" icon={<Languages size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
      <SettingsLink
        to="/settings/language"
        icon={<Languages size={20} className="text-gray-500 dark:text-gray-300" />}
        label="Language"
        rightElement={<span className="text-gray-500 dark:text-gray-300">{language.toUpperCase()}</span>}
      />
      <SettingsLink
        to="/settings/region"
        icon={<Languages size={20} className="text-gray-500 dark:text-gray-300" />}
        label="Region"
        rightElement={<span className="text-gray-500 dark:text-gray-300">{region.toUpperCase()}</span>}
      />
    </SettingsSection>
  );
};
export default LocalizationSection;
