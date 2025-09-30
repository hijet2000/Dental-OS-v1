import React, { createContext, useState, useCallback, ReactNode, useContext, useEffect } from 'react';
import { AppSettings, AuditEvent } from '../types';
import { settingsService } from '../services/SettingsService';
import { auditService } from '../services/AuditService';

interface SettingsContextType {
  settings: AppSettings;
  auditLog: AuditEvent[];
  updateSettings: (updater: (prev: AppSettings) => AppSettings, action?: string, entity?: string) => void;
  loading: boolean;
  applyBranding: () => void;
}

export const AppSettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(settingsService.getSettings());
  const [auditLog, setAuditLog] = useState<AuditEvent[]>(auditService.getEvents());
  const [loading, setLoading] = useState(true);
  
  const applyBranding = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.branding.colors.primary);
    root.style.setProperty('--color-secondary', settings.branding.colors.secondary);
    root.style.setProperty('--color-accent', settings.branding.colors.accent);
    root.style.setProperty('--color-bg', settings.branding.colors.background);
    root.style.setProperty('--color-text', settings.branding.colors.text);
  }, [settings.branding.colors]);

  useEffect(() => {
    setSettings(settingsService.getSettings());
    setAuditLog(auditService.getEvents());
    applyBranding();
    setLoading(false);
  }, [applyBranding]);
  
  const updateSettings = useCallback((updater: (prev: AppSettings) => AppSettings, action: string = 'Setting changed', entity: string = 'Application') => {
      const oldSettings = settings;
      const newSettings = updater(oldSettings);
      
      auditService.log(action, entity, oldSettings, newSettings);
      settingsService.save(newSettings);
      
      setSettings(newSettings);
      setAuditLog(auditService.getEvents());

      // If branding colors change, re-apply them immediately
      if (JSON.stringify(oldSettings.branding) !== JSON.stringify(newSettings.branding)) {
          applyBranding();
      }
    }, [settings, applyBranding]);


  return (
    <AppSettingsContext.Provider value={{ settings, auditLog, updateSettings, loading, applyBranding }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within a AppSettingsProvider');
  }
  return context;
};
