import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectDevice, DeviceInfo, loadDevicePreference, saveDevicePreference } from '../lib/deviceDetection';

interface DeviceContextType extends DeviceInfo {
  setPreferredDeviceType: (type: 'desktop' | 'mobile' | 'tablet') => void;
  resetToDetected: () => void;
  isOverridden: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  // Initial state with defaults
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isDesktopBrowser: true,
    isMobileDevice: false,
    isTablet: false,
    deviceType: 'desktop'
  });
  const [isOverridden, setIsOverridden] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize device detection on mount
  useEffect(() => {
    const initializeDeviceDetection = () => {
      // First try to load saved preference
      const savedPreference = loadDevicePreference();
      
      if (savedPreference?.isOverridden) {
        // Use saved override if available
        setDeviceInfo(savedPreference);
        setIsOverridden(true);
      } else {
        // Otherwise detect device
        const detected = detectDevice();
        setDeviceInfo(detected);
        saveDevicePreference({ ...detected, isOverridden: false });
      }
      
      setIsInitialized(true);
    };

    initializeDeviceDetection();
  }, []);

  // Set a preferred device type (override)
  const setPreferredDeviceType = (type: 'desktop' | 'mobile' | 'tablet') => {
    const newInfo: DeviceInfo = {
      isDesktopBrowser: type === 'desktop',
      isMobileDevice: type === 'mobile',
      isTablet: type === 'tablet',
      deviceType: type
    };
    
    setDeviceInfo(newInfo);
    setIsOverridden(true);
    saveDevicePreference({ ...newInfo, isOverridden: true });
  };

  // Reset to the detected device type
  const resetToDetected = () => {
    const detected = detectDevice();
    setDeviceInfo(detected);
    setIsOverridden(false);
    saveDevicePreference({ ...detected, isOverridden: false });
  };

  // Only render children after initialization to avoid flicker
  if (!isInitialized) {
    return null;
  }

  return (
    <DeviceContext.Provider
      value={{
        ...deviceInfo,
        setPreferredDeviceType,
        resetToDetected,
        isOverridden
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};