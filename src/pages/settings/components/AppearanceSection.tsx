
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { SettingsSection, SettingsToggle } from './SettingsUtils';
import { useSettings } from '@/contexts/SettingsContext';

const AppearanceSection = () => {
  const { themeMode, setThemeMode } = useSettings();
  return (
    <SettingsSection title="Appearance" icon={<Moon size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
      <div className="space-y-1">
        <SettingsToggle
          icon={<Sun size={20} className="text-gray-500 dark:text-gray-300" />}
          label="Light Mode"
          checked={themeMode === 'light'}
          onCheckedChange={() => setThemeMode('light')}
        />
        <SettingsToggle
          icon={<Moon size={20} className="text-gray-500 dark:text-gray-300" />}
          label="Dark Mode"
          checked={themeMode === 'dark'}
          onCheckedChange={() => setThemeMode('dark')}
        />
        <SettingsToggle
          icon={<Moon size={20} className="text-gray-500 dark:text-gray-300 opacity-50" />}
          label="System Default"
          checked={themeMode === 'system'}
          onCheckedChange={() => setThemeMode('system')}
        />
      </div>
    </SettingsSection>
  );
};
export default AppearanceSection;
