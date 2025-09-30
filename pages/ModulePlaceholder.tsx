import React from 'react';
// FIX: Changed quotes on import to fix module resolution error.
import { useLocation } from "react-router-dom";
import { Card } from '../components/common/Card';
import { useModuleAccess } from '../hooks/useModuleAccess';
import { Module } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { MODULE_CONFIG } from '../constants';

const ModulePlaceholder = () => {
  const location = useLocation();
  const { t } = useTranslations();
  
  const moduleKey = Object.keys(MODULE_CONFIG).find(
    key => MODULE_CONFIG[key as Module].path === location.pathname
  ) as Module | undefined;

  const moduleName = moduleKey ? t(MODULE_CONFIG[moduleKey].nameKey) : location.pathname.replace('/', '').replace(/^\w/, c => c.toUpperCase());
  const isCompliance = moduleKey === Module.COMPLIANCE;

  return (
    <div className="flex items-center justify-center h-full">
      <Card title={`${moduleName} Module`}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Coming Soon!</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            The {moduleName} module is under construction.
            {isCompliance && (
              <>
                <br />
                This will include the {t('radiographyLogbook')}.
              </>
            )}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ModulePlaceholder;