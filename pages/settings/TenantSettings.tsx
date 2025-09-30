import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Plan, Module } from '../../types';
import { Toggle } from '../../components/common/Toggle';

const TenantSettings = () => {
  const { settings, setSettings } = useSettings();

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(
      prev => ({ ...prev, tenant: { ...prev.tenant, plan: e.target.value as Plan } }),
      'Updated Plan',
      'Tenant'
    );
  };

  const handleModuleMatrixChange = (plan: Plan, module: Module, checked: boolean) => {
    setSettings(prev => {
      const newMatrix = { ...prev.planModuleMatrix };
      if (checked) {
        newMatrix[plan] = [...newMatrix[plan], module];
      } else {
        newMatrix[plan] = newMatrix[plan].filter(m => m !== module);
      }
      return { ...prev, planModuleMatrix: newMatrix };
    }, 'Updated Plan Module Matrix', 'Tenant');
  };

  return (
    <div className="space-y-6">
      <Card title="Tenant & Subscription">
        <div className="space-y-4">
          <Input
            label="Tenant Name"
            value={settings.tenant.name}
            onChange={e =>
              setSettings(
                prev => ({ ...prev, tenant: { ...prev.tenant, name: e.target.value } }),
                'Updated Tenant Name',
                'Tenant'
              )
            }
          />
          <Select label="Subscription Plan" value={settings.tenant.plan} onChange={handlePlanChange}>
            {/* FIX: Add explicit type to plan to resolve type error. */}
            {Object.values(Plan).map((plan: Plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </Select>
          <div className="grid grid-cols-3 gap-4 p-4 border rounded-md dark:border-gray-600">
            <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Staff</div>
                <div className="text-lg font-semibold">{settings.tenant.subscription.staffCount}</div>
            </div>
             <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Locations</div>
                <div className="text-lg font-semibold">{settings.tenant.subscription.locations}</div>
            </div>
             <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage</div>
                <div className="text-lg font-semibold">{settings.tenant.subscription.storageUsedMb} MB</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="primary">Upgrade Plan</Button>
            <Button variant="secondary">Downgrade Plan</Button>
          </div>
        </div>
      </Card>
      <Card title="Subscription Module Editor">
        <div className="space-y-4">
          {/* FIX: Add explicit type to plan to resolve type error. */}
          {Object.values(Plan).map((plan: Plan) => (
            <div key={plan}>
              <h4 className="font-semibold text-lg mb-2">{plan} Plan Modules</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* FIX: Add explicit type to module to resolve type error. */}
                {Object.values(Module).map((module: Module) => (
                  <Toggle
                    key={module}
                    label={module.charAt(0).toUpperCase() + module.slice(1)}
                    enabled={settings.planModuleMatrix[plan].includes(module)}
                    onChange={(checked) => handleModuleMatrixChange(plan, module, checked)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TenantSettings;
