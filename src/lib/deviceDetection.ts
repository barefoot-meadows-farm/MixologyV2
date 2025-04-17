/**
 * Device detection utility to determine if the user is on a desktop browser or mobile device
 * Uses navigator.userAgent, navigator.platform, and navigator.maxTouchPoints
 */

export interface DeviceInfo {
  isDesktopBrowser: boolean;
  isMobileDevice: boolean;
  isTablet: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

/**
 * Detects the user's device type using various browser APIs
 * @returns DeviceInfo object with device type information
 */
export function detectDevice(): DeviceInfo {
  // Default to desktop if running on server or in environments without navigator
  if (typeof navigator === 'undefined') {
    return {
      isDesktopBrowser: true,
      isMobileDevice: false,
      isTablet: false,
      deviceType: 'desktop'
    };
  }

  // Check for touch capability
  const hasTouchScreen = (
    'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0
  ) || (
    'msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0
  );

  // Check for mobile-specific strings in user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
  
  // Check for mobile platform
  const platform = (navigator.platform || '').toLowerCase();
  const isMobilePlatform = /android|iphone|ipad|ipod/i.test(platform);

  // Detect tablets specifically
  const isTablet = /ipad/i.test(userAgent) || 
    (/android/i.test(userAgent) && !/mobile/i.test(userAgent)) ||
    (hasTouchScreen && window.innerWidth >= 768 && window.innerWidth <= 1024);

  // Determine if it's a mobile device
  const isMobileDevice = (isMobileUserAgent || isMobilePlatform || hasTouchScreen) && !isTablet;

  // Desktop is the default if not mobile or tablet
  const isDesktopBrowser = !isMobileDevice && !isTablet;

  // Determine device type
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (isMobileDevice) deviceType = 'mobile';
  if (isTablet) deviceType = 'tablet';

  return {
    isDesktopBrowser,
    isMobileDevice,
    isTablet,
    deviceType
  };
}

/**
 * Saves the detected device type to localStorage for persistence between sessions
 */
export function saveDevicePreference(deviceInfo: DeviceInfo): void {
  try {
    localStorage.setItem('mixologyMasterDeviceInfo', JSON.stringify(deviceInfo));
  } catch (error) {
    console.error('Failed to save device preference:', error);
  }
}

/**
 * Loads the saved device preference from localStorage
 * @returns The saved device info or null if not found
 */
export function loadDevicePreference(): DeviceInfo | null {
  try {
    const savedInfo = localStorage.getItem('mixologyMasterDeviceInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  } catch (error) {
    console.error('Failed to load device preference:', error);
    return null;
  }
}