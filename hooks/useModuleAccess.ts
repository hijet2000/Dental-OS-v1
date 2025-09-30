import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { Module, PermissionAction } from '../types';

export const useModuleAccess = () => {
  const { settings } = useSettings();
  const { currentUser } = useAuth();

  const hasAccess = (module: Module, action: PermissionAction = PermissionAction.VIEW): boolean => {
    if (!currentUser) return false;

    // 1. Check plan level
    const planModules = settings.planModuleMatrix[settings.tenant.plan];
    if (!planModules.includes(module)) {
      return false;
    }

    // 2. Check tenant-level toggle
    if (settings.moduleToggles[module] === false) {
      return false;
    }

    // 3. Check user role permissions
    // Iterate over all user roles. If any role grants permission, return true.
    for (const role of currentUser.roles) {
      const rolePermissions = settings.permissionMatrix[role];
      if (rolePermissions && rolePermissions[module] && rolePermissions[module]?.[action]) {
        return true;
      }
    }

    return false;
  };

  return { hasAccess };
};
