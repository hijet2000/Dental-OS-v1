import React from 'react';
import { useAppSettings } from '../contexts/AppSettingsContext';

export const Header = () => {
    const { settings } = useAppSettings();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div/>
      <div className="flex items-center">
        <div className="text-right">
            <div className="font-semibold text-gray-800 dark:text-gray-100">{settings.tenant.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Operations Portal</div>
        </div>
      </div>
    </header>
  );
};
