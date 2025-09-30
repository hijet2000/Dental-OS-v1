import React from 'react';
import { useAppSettings } from '../../contexts/AppSettingsContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Toggle } from '../../components/common/Toggle';
import { Plan, Module } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

const TenantAndModuleSettings = () => {
  const { settings, updateSettings } = useAppSettings();
  const { t } = useTranslations();
  const [localSettings, setLocalSettings] = React.useState(settings);
  
  const handleApply = () => {
    updateSettings(() => localSettings, 'Updated Tenant & Module Settings', 'Tenant');
    alert('Settings applied successfully!');
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlan = e.target.value as Plan;
    setLocalSettings(prev => ({...prev, tenant: {...prev.tenant, plan: newPlan}}));
  };
  
  const handleToggleOverride = (module: Module, checked: boolean) => {
    setLocalSettings(prev => {
        const newToggles = {...prev.moduleToggles};
        // We only store explicit 'false' overrides. `undefined` or `true` means it follows the plan.
        if (!checked) {
            newToggles[module] = false;
        } else {
            delete newToggles[module];
        }
        return {...prev, moduleToggles: newToggles};
    });
  };

  return (
    <div className="space-y-6">
      <Card title="Tenant & Subscription">
        <div className="space-y-4">
          <Input
            label="Tenant Name"
            value={localSettings.tenant.name}
            onChange={e => setLocalSettings(prev => ({...prev, tenant: {...prev.tenant, name: e.target.value}}))}
          />
          <Select label="Subscription Plan" value={localSettings.tenant.plan} onChange={handlePlanChange}>
            {Object.values(Plan).map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </Select>
        </div>
      </Card>

      <Card title="Modules & Features">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Enable or disable modules for this tenant. This overrides the plan defaults.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(Module).map(module => {
                const isEnabledByPlan = localSettings.planModuleMatrix[localSettings.tenant.plan]?.includes(module);
                const isToggledOff = localSettings.moduleToggles[module] === false;
                const isEffectivelyEnabled = isEnabledByPlan && !isToggledOff;

                const label = (
                    <div className='flex items-center'>
                        <span>{t(module)}</span>
                        {!isEnabledByPlan && (
                            <span className="ml-2 text-xs font-semibold bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                                Upgrade Required
                            </span>
                        )}
                    </div>
                );

                return (
                    <Toggle 
                        key={module}
                        label={label}
                        enabled={isEffectivelyEnabled}
                        onChange={handleToggleOverride.bind(null, module)}
                    />
                );
            })}
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleApply} variant="primary">Apply Changes</Button>
      </div>
    </div>
  );
};

export default TenantAndModuleSettings;
