import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Button } from './common/Button';

export const UpdateBanner = () => {
  const { settings, setSettings } = useSettings();

  if (!settings.pwa.showUpdateBanner) {
    return null;
  }

  const handleUpdate = () => {
    // In a real PWA, this would trigger the service worker to update
    alert("Updating application...");
    window.location.reload();
  };

  const handleDismiss = () => {
    setSettings(prev => ({...prev, pwa: {...prev.pwa, showUpdateBanner: false}}), "Dismiss Update Banner", "PWA");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-yellow-900 p-3 text-center z-50 flex justify-center items-center">
      <p className="font-semibold">A new version is available!</p>
      <Button onClick={handleUpdate} className="ml-4" variant="primary">
        Update Now
      </Button>
      <Button onClick={handleDismiss} className="ml-2" variant="ghost">
        Dismiss
      </Button>
    </div>
  );
};
