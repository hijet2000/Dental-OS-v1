import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Toggle } from '../../components/common/Toggle';
import { Module } from '../../types';
import { MODULE_CONFIG } from '../../constants';
import { useTranslations } from '../../hooks/useTranslations';

const ModuleSettings = () => {
  const { settings, setSettings } = useSettings();
  const { t } = useTranslations();

  const handleToggle = (module: Module, enabled: boolean) => {
    setSettings(prev => {
      const newToggles = { ...prev.moduleToggles };
      if (enabled) {
        // Setting to true means it follows the plan. undefined is the same.
        // We only explicitly store `false` to override the plan.
        delete newToggles[module];
      } else {
        newToggles[module] = false;
      }
      return { ...prev, moduleToggles: newToggles };
    }, `Toggled module ${module}`, 'Modules');
  };

  return (
    <Card title="Modules & Features">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Toggle modules for this tenant. This overrides the subscription plan defaults. A module is active if it's enabled by the plan and not disabled here.
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* FIX: Add explicit type to module to resolve type error. */}
        {Object.values(Module).map((module: Module) => {
            // FIX: Use `t` function with `nameKey` to get the module name.
            const moduleName = t(MODULE_CONFIG[module].nameKey);
            const isEnabledByPlan = settings.planModuleMatrix[settings.tenant.plan].includes(module);
            const isOverriddenOff = settings.moduleToggles[module] === false;
            const isEffectivelyEnabled = isEnabledByPlan && !isOverriddenOff;

            return (
                <Toggle
                    key={module}
                    label={moduleName}
                    description={!isEnabledByPlan ? `Requires ${settings.tenant.plan === 'Basic' ? 'Pro' : 'Enterprise'} plan` : ''}
                    enabled={isEffectivelyEnabled}
                    onChange={(checked) => handleToggle(module, checked)}
                />
            )
        })}
      </div>
    </Card>
  );
};

export default ModuleSettings;
