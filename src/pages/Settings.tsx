import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { 
  ChevronRight,
  UserCog,
  Moon,
  Sun,
  Languages,
  Volume,
  HelpCircle,
  Shield,
  Gift,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// Section component for consistent styling
const SettingsSection = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode 
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
    <Separator className="mb-3" />
    {children}
  </div>
);

// Navigation item with consistent styling
const SettingsLink = ({ 
  to, 
  icon, 
  label, 
  rightElement 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  rightElement?: React.ReactNode 
}) => (
  <Link to={to} className="flex items-center justify-between py-3 px-2 min-h-[44px] hover:bg-gray-50 rounded-md">
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {rightElement || <ChevronRight size={18} className="text-gray-400" />}
  </Link>
);

// Item with toggle switch
const SettingsToggle = ({ 
  icon, 
  label, 
  checked, 
  onCheckedChange 
}: { 
  icon: React.ReactNode; 
  label: string; 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void 
}) => (
  <div className="flex items-center justify-between py-3 px-2 min-h-[44px]">
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

const Settings = () => {
  const { 
    measurementUnit, 
    setMeasurementUnit, 
    themeMode, 
    setThemeMode, 
    language, 
    region, 
    isLoading 
  } = useSettings();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading settings...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-20 md:pb-10 max-w-2xl">
      <h1 className="text-2xl font-serif font-medium text-mixology-purple mb-6">Settings</h1>

      <SettingsSection title="Account Settings" icon={<UserCog size={20} className="text-mixology-purple" />}>
        <SettingsLink
          to="/settings/profile"
          icon={<UserCog size={20} className="text-gray-500" />}
          label="Profile Information"
        />
        <SettingsLink
          to="/settings/password"
          icon={<Shield size={20} className="text-gray-500" />}
          label="Password & Security"
        />
        <SettingsLink
          to="/settings/linked-accounts"
          icon={<Link className="text-gray-500" />}
          label="Linked Accounts"
        />
        <SettingsLink
          to="/settings/delete-account"
          icon={<LogOut size={20} className="text-red-500" />}
          label="Delete Account"
          rightElement={<ChevronRight size={18} className="text-red-400" />}
        />
      </SettingsSection>

      <SettingsSection title="Appearance" icon={<Moon size={20} className="text-mixology-purple" />}>
        <div className="space-y-1">
          <SettingsToggle
            icon={<Sun size={20} className="text-gray-500" />}
            label="Light Mode"
            checked={themeMode === 'light'}
            onCheckedChange={() => setThemeMode('light')}
          />
          <SettingsToggle
            icon={<Moon size={20} className="text-gray-500" />}
            label="Dark Mode"
            checked={themeMode === 'dark'}
            onCheckedChange={() => setThemeMode('dark')}
          />
          <SettingsToggle
            icon={<Moon size={20} className="text-gray-500 opacity-50" />}
            label="System Default"
            checked={themeMode === 'system'}
            onCheckedChange={() => setThemeMode('system')}
          />
        </div>
      </SettingsSection>
      
      <SettingsSection title="Measurement Units" icon={<Volume size={20} className="text-mixology-purple" />}>
        <div className="space-y-1">
          <SettingsToggle
            icon={<Volume size={20} className="text-gray-500" />}
            label="US Customary (oz, cups)"
            checked={measurementUnit === 'us'}
            onCheckedChange={() => setMeasurementUnit('us')}
          />
          <SettingsToggle
            icon={<Volume size={20} className="text-gray-500" />}
            label="Metric (ml, cl)"
            checked={measurementUnit === 'metric'}
            onCheckedChange={() => setMeasurementUnit('metric')}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Localization" icon={<Languages size={20} className="text-mixology-purple" />}>
        <SettingsLink
          to="/settings/language"
          icon={<Languages size={20} className="text-gray-500" />}
          label="Language"
          rightElement={<span className="text-gray-500">{language.toUpperCase()}</span>}
        />
        <SettingsLink
          to="/settings/region"
          icon={<Languages size={20} className="text-gray-500" />}
          label="Region"
          rightElement={<span className="text-gray-500">{region.toUpperCase()}</span>}
        />
      </SettingsSection>

      <SettingsSection title="Help & Support" icon={<HelpCircle size={20} className="text-mixology-purple" />}>
        <SettingsLink
          to="/settings/faq"
          icon={<HelpCircle size={20} className="text-gray-500" />}
          label="FAQ"
        />
        <SettingsLink
          to="/settings/contact"
          icon={<HelpCircle size={20} className="text-gray-500" />}
          label="Contact Support"
        />
        <SettingsLink
          to="/settings/feedback"
          icon={<HelpCircle size={20} className="text-gray-500" />}
          label="Submit Feedback"
        />
      </SettingsSection>

      <SettingsSection title="Legal & Policies" icon={<Shield size={20} className="text-mixology-purple" />}>
        <SettingsLink
          to="/settings/privacy"
          icon={<Shield size={20} className="text-gray-500" />}
          label="Privacy Policy"
        />
        <SettingsLink
          to="/settings/terms"
          icon={<Shield size={20} className="text-gray-500" />}
          label="Terms of Service"
        />
      </SettingsSection>

      <SettingsSection title="Promotional" icon={<Gift size={20} className="text-mixology-purple" />}>
        <SettingsLink
          to="/settings/promo-code"
          icon={<Gift size={20} className="text-gray-500" />}
          label="Enter Promo Code"
        />
        <SettingsLink
          to="/settings/invite"
          icon={<Gift size={20} className="text-gray-500" />}
          label="Invite Friends"
        />
      </SettingsSection>
    </div>
  );
};

export default Settings;
