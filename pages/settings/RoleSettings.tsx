import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { Role, Module, PermissionAction } from '../../types';
import { MODULE_CONFIG } from '../../constants';
import { useTranslations } from '../../hooks/useTranslations';

const RoleSettings = () => {
  const { settings, setSettings } = useSettings();
  const [selectedRole, setSelectedRole] = useState<Role>(Role.ADMIN);
  const { t } = useTranslations();

  const handlePermissionChange = (module: Module, action: PermissionAction, value: boolean) => {
    setSettings(prev => {
      const newMatrix = { ...prev.permissionMatrix };
      if (!newMatrix[selectedRole]) newMatrix[selectedRole] = {};
      if (!newMatrix[selectedRole][module]) newMatrix[selectedRole][module] = {};
      
      const modulePermissions = newMatrix[selectedRole][module];
      if (modulePermissions) {
        modulePermissions[action] = value;
      }
      
      return { ...prev, permissionMatrix: newMatrix };
    }, `Updated permission for ${selectedRole}`, 'Permissions');
  };
  
  const permissionsForRole = settings.permissionMatrix[selectedRole] || {};

  return (
    <Card title="Roles & Permissions">
      <div className="space-y-4">
        <Select label="Select Role to Edit" value={selectedRole} onChange={e => setSelectedRole(e.target.value as Role)}>
          {/* FIX: Add explicit type to role to resolve type error. */}
          {settings.roles.map((role: Role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </Select>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Module</th>
                {/* FIX: Add explicit type to action to resolve type error. */}
                {Object.values(PermissionAction).map((action: PermissionAction) => (
                  <th key={action} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{action}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* FIX: Add explicit type to module to resolve type error. */}
              {Object.values(Module).map((module: Module) => (
                <tr key={module}>
                  {/* FIX: Use `t` function with `nameKey` to get the module name. */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{t(MODULE_CONFIG[module].nameKey)}</td>
                  {/* FIX: Add explicit type to action to resolve type error. */}
                  {Object.values(PermissionAction).map((action: PermissionAction) => (
                    <td key={action} className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                        checked={!!permissionsForRole[module]?.[action]}
                        onChange={e => handlePermissionChange(module, action, e.target.checked)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default RoleSettings;
