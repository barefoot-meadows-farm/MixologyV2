
import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
// Section components
import AccountSettingsSection from './settings/components/AccountSettingsSection';
import AppearanceSection from './settings/components/AppearanceSection';
import MeasurementUnitsSection from './settings/components/MeasurementUnitsSection';
import LocalizationSection from './settings/components/LocalizationSection';
import HelpSection from './settings/components/HelpSection';
import LegalSection from './settings/components/LegalSection';
import PromotionalSection from './settings/components/PromotionalSection';

const Settings = () => {
  const { isLoading } = useSettings();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading settings...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-20 md:pb-10 max-w-2xl dark:bg-background">
      <h1 className="text-2xl font-serif font-medium text-mixology-purple dark:text-mixology-cream mb-6">Settings</h1>
      <AccountSettingsSection />
      <AppearanceSection />
      <MeasurementUnitsSection />
      <LocalizationSection />
      <HelpSection />
      <LegalSection />
      <PromotionalSection />
    </div>
  );
};

export default Settings;
