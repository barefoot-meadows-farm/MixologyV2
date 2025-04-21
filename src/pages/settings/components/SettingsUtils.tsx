
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// Section component for consistent styling
export const SettingsSection = ({ 
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
export const SettingsLink = ({ 
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
  <Link to={to} className="flex items-center justify-between py-3 px-2 min-h-[44px] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {rightElement || <ChevronRight size={18} className="text-gray-400" />}
  </Link>
);

// Item with toggle switch
export const SettingsToggle = ({ 
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
