import React from 'react';
// FIX: Changed quotes on import to fix module resolution error.
import { NavLink } from "react-router-dom";
import { useModuleAccess } from '../../hooks/useModuleAccess';
import { MODULE_CONFIG, ROUTES } from '../../constants';
import { Module } from '../../types';
import { useSettings } from '../../contexts/SettingsContext';
import { useTranslations } from '../../hooks/useTranslations';

export const Sidebar = () => {
  const { hasAccess } = useModuleAccess();
  const { settings } = useSettings();
  const { t } = useTranslations();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;
    
  const modulesToShow = Object.values(Module).filter(m => hasAccess(m));

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
        <h1 className="text-xl font-bold text-brand-primary truncate">{settings.branding.displayName}</h1>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <NavLink to={ROUTES.DASHBOARD} className={navLinkClass} end>
          <span className="mr-3">🏠</span>
          {t('dashboard')}
        </NavLink>
        
        {/* FIX: Add explicit type to moduleKey to resolve type error. */}
        {modulesToShow.map((moduleKey: Module) => {
            const module = MODULE_CONFIG[moduleKey];
            return (
                <NavLink to={module.path} key={moduleKey} className={navLinkClass}>
                    <span className="mr-3">{module.icon}</span>
                    {t(module.nameKey)}
                </NavLink>
            )
        })}

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
             <NavLink to={ROUTES.SETTINGS} className={navLinkClass}>
                <span className="mr-3">⚙️</span>
                {t('settings')}
            </NavLink>
        </div>
      </nav>
    </div>
  );
};
