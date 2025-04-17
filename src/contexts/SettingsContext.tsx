
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type MeasurementUnit = 'us' | 'metric';
type ThemeMode = 'light' | 'dark' | 'system';
type Language = 'en' | 'es' | 'fr' | 'de' | 'it';
type Region = 'us' | 'eu' | 'uk' | 'ca' | 'au';

interface SettingsContextType {
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  region: Region;
  setRegion: (region: Region) => void;
  isLoading: boolean;
}

const defaultSettings: Omit<SettingsContextType, 'setMeasurementUnit' | 'setThemeMode' | 'setLanguage' | 'setRegion' | 'isLoading'> = {
  measurementUnit: 'us',
  themeMode: 'system',
  language: 'en',
  region: 'us',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('mixologyMasterSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        } else {
          // If no saved settings, check system preferences for theme
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setSettings(prev => ({ ...prev, themeMode: 'dark' }));
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('mixologyMasterSettings', JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  // Apply theme based on settings
  useEffect(() => {
    if (isLoading) return;

    const applyTheme = () => {
      const { themeMode } = settings;
      const isDark = 
        themeMode === 'dark' || 
        (themeMode === 'system' && 
         window.matchMedia && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);

      document.documentElement.classList.toggle('dark', isDark);
    };

    applyTheme();

    // Listen for system theme changes if using system preference
    if (settings.themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.themeMode, isLoading]);

  const setMeasurementUnit = (unit: MeasurementUnit) => {
    setSettings(prev => ({ ...prev, measurementUnit: unit }));
    // Here you would also save to backend if user is logged in
  };

  const setThemeMode = (mode: ThemeMode) => {
    setSettings(prev => ({ ...prev, themeMode: mode }));
    // Here you would also save to backend if user is logged in
  };

  const setLanguage = (lang: Language) => {
    setSettings(prev => ({ ...prev, language: lang }));
    // Here you would also save to backend if user is logged in
  };

  const setRegion = (region: Region) => {
    setSettings(prev => ({ ...prev, region: region }));
    // Here you would also save to backend if user is logged in
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setMeasurementUnit,
        setThemeMode,
        setLanguage,
        setRegion,
        isLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
