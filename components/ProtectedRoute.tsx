import React, { useState } from 'react';
// FIX: Changed quotes on import to fix module resolution error.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useModuleAccess } from '../hooks/useModuleAccess';
import { MODULE_CONFIG } from '../constants';
import { Module } from '../types';
import { Toast } from './common/Toast';
import { useTranslations } from '../hooks/useTranslations';

// FIX: Changed JSX.Element to React.ReactElement to fix issue with missing JSX namespace.
export const ProtectedRoute = ({ children, module }: { children: React.ReactElement, module?: Module }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { hasAccess } = useModuleAccess();
  const [toast, setToast] = useState<{message: string, type: 'info' | 'error'}>({message: '', type: 'info'});
  const { t } = useTranslations();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (module && !hasAccess(module)) {
      // FIX: Use `t` function with `nameKey` to get the module name.
      const moduleName = t(MODULE_CONFIG[module].nameKey);
      // This is a simple way to show a toast on redirect. A more robust solution might use context or state in the location.
      // Since we immediately navigate away, we can't show a toast here effectively. 
      // The destination component (Dashboard) should ideally show this message.
      // For now, this logic just handles the redirect.
      console.warn(`Access denied to ${moduleName}`);
      return <Navigate to="/" state={{ message: `Feature not enabled: ${moduleName}`, type: 'error' }} replace />;
  }

  return children;
};