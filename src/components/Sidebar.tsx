import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSettings } from '../contexts/AppSettingsContext';
import { useTranslations } from '../hooks/useTranslations';
import { Module } from '../types';

const ICONS: Record<Module, string> = {
  [Module.INVENTORY]: '📦',
  [Module.EQUIPMENT]: '📠',
  [Module.TASKS]: '✅',
  [Module.COMPLIANCE]: '🛡️',
  [Module.COMPLAINTS]: '🗣️',
  [Module.LABS]: '🔬',
  [Module.STAFF]: '👥',
  [Module.ROTA]: '🗓️',
  [Module.TIME_OFF]: '✈️',
  [Module.TIMEKEEPING]: '⏱️',
  [Module.NOTIFICATIONS]: '🔔',
  [Module.REPORTING]: '📊',
  [Module.AUDIT]: '🔍',
  [Module.SETTINGS]: '⚙️',
  [Module.AI]: '🤖',
};

export const Sidebar = () => {
  const { settings } = useAppSettings();
  const { t } = useTranslations();

  const isModuleVisible = (module: Module): boolean => {
    const planModules = settings.planModuleMatrix[settings.tenant.plan] || [];
    const isEnabledByPlan = planModules.includes(module);
    const isToggledOff = settings.moduleToggles[module] === false;
    return isEnabledByPlan && !isToggledOff;
  };
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;
  
  const allModules = Object.values(Module);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
        <h1 className="text-xl font-bold text-brand-primary truncate">{settings.branding.displayName}</h1>
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        <NavLink to="/" className={navLinkClass} end>
          <span className="mr-3 text-lg">🏠</span>
          {t('dashboard')}
        </NavLink>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {allModules.map(module => isModuleVisible(module) && (
                <NavLink key={module} to={`/${module}`} className={navLinkClass}>
                    <span className="mr-3 text-lg">{ICONS[module]}</span>
                    {t(module as keyof typeof ICONS)}
                </NavLink>
            ))}
        </div>
      </nav>
    </div>
  );
};
