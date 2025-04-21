
import React from 'react';
import { Volume } from 'lucide-react';
import { SettingsSection, SettingsToggle } from './SettingsUtils';
import { useSettings } from '@/contexts/SettingsContext';

const MeasurementUnitsSection = () => {
  const { measurementUnit, setMeasurementUnit } = useSettings();
  return (
    <SettingsSection title="Measurement Units" icon={<Volume size={20} className="text-mixology-purple dark:text-mixology-cream" />}>
      <div className="space-y-1">
        <SettingsToggle
          icon={<Volume size={20} className="text-gray-500 dark:text-gray-300" />}
          label="US Customary (oz, cups)"
          checked={measurementUnit === 'us'}
          onCheckedChange={() => setMeasurementUnit('us')}
        />
        <SettingsToggle
          icon={<Volume size={20} className="text-gray-500 dark:text-gray-300" />}
          label="Metric (ml, cl)"
          checked={measurementUnit === 'metric'}
          onCheckedChange={() => setMeasurementUnit('metric')}
        />
      </div>
    </SettingsSection>
  );
};
export default MeasurementUnitsSection;
