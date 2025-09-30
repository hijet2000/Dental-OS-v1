import React from 'react';
import { Card } from '../components/common/Card';
import { useTranslations } from '../hooks/useTranslations';
import { Module } from '../types';

interface ModulePlaceholderProps {
    module: Module;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ module }) => {
  const { t } = useTranslations();
  const moduleName = t(module);

  return (
    <div className="flex items-center justify-center h-full">
      <Card title={`${moduleName} Module`}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Coming Soon!</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            The {moduleName} module is under construction.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ModulePlaceholder;
