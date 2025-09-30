import React, { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { AppSettings, AuditEvent, Snapshot, PersistenceMode } from '../types';
import { DEFAULT_SETTINGS } from '../constants';
import { persistenceStrategies, PersistenceStrategy } from '../services/persistence';
import { generateId } from '../utils/helpers';

interface SettingsContextType {
  settings: AppSettings;
  setSettings: (updater: (prev: AppSettings) => AppSettings, action?: string, entity?: string) => void;
  auditLog: AuditEvent[];
  logAuditEvent: (event: Omit<AuditEvent, 'id' | 'timestamp'>) => void;
  exportAllData: () => void;
  importAllData: (snapshot: Snapshot) => void;
  loading: boolean;
  undoStack: Partial<AppSettings>[];
  undoLastChange: () => void;
  resetToDefaults: () => void;
  getPersistenceStrategy: () => PersistenceStrategy;
  fetchAppVersion: () => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setInternalSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [auditLog, setAuditLog] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [undoStack, setUndoStack] = useState<Partial<AppSettings>[]>([]);

  const getPersistenceStrategy = useCallback(() => {
    switch (settings.persistence.mode) {
      case PersistenceMode.INDEXED_DB:
        return persistenceStrategies.indexedDB;
      case PersistenceMode.LOCAL_STORAGE:
        return persistenceStrategies.localStorage;
      default:
        return persistenceStrategies.none;
    }
  }, [settings.persistence.mode]);

  const loadData = useCallback(async () => {
    setLoading(true);
    // Use the default mode to load first, as we don't know the user's preference yet.
    const strategy = persistenceStrategies.indexedDB;
    const snapshot = await strategy.load();
    if (snapshot) {
      setInternalSettings(snapshot.appSettings);
      setAuditLog(snapshot.auditLog || []);
    } else {
        // if nothing in indexedDB, try localStorage
        const lsStrategy = persistenceStrategies.localStorage;
        const lsSnapshot = await lsStrategy.load();
        if (lsSnapshot) {
            setInternalSettings(lsSnapshot.appSettings);
            setAuditLog(lsSnapshot.auditLog || []);
        }
    }
    setLoading(false);
  }, []);

  const fetchAppVersion = useCallback(async () => {
    try {
        const response = await fetch('/app-version.json');
        const data = await response.json();
        setInternalSettings(prev => ({...prev, pwa: { ...prev.pwa, ...data }}));
    } catch (error) {
        console.error("Failed to fetch app version", error);
    }
  }, []);

  useEffect(() => {
    loadData();
    fetchAppVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logAuditEvent = useCallback((event: Omit<AuditEvent, 'id' | 'timestamp'>) => {
    const newEvent: AuditEvent = {
      ...event,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    setAuditLog(prev => [newEvent, ...prev]);
  }, []);

  const setSettings = useCallback((updater: (prev: AppSettings) => AppSettings, action: string = 'Setting changed', entity: string = 'Application') => {
    setInternalSettings(prevSettings => {
      const newSettings = updater(prevSettings);

      setUndoStack(stack => [...stack.slice(-9), prevSettings]); // Keep last 10 states

      logAuditEvent({
        user: 'current_user', // Replace with actual user from auth context
        action,
        entity,
        details: { before: prevSettings, after: newSettings },
      });

      const snapshot: Snapshot = { appSettings: newSettings, auditLog: [ ...auditLog] }; // snapshot current auditlog
      getPersistenceStrategy().save(snapshot);
      
      return newSettings;
    });
  }, [auditLog, getPersistenceStrategy, logAuditEvent]);


  const undoLastChange = useCallback(() => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setInternalSettings(lastState as AppSettings);
      setUndoStack(stack => stack.slice(0, -1));
    }
  }, [undoStack]);

  const resetToDefaults = useCallback(() => {
    setSettings(() => DEFAULT_SETTINGS, 'Reset to Defaults', 'Application');
  }, [setSettings]);

  const exportAllData = useCallback(() => {
    const snapshot: Snapshot = { appSettings: settings, auditLog };
    const jsonStr = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dentalos-snapshot-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settings, auditLog]);

  const importAllData = useCallback((snapshot: Snapshot) => {
    setSettings(() => snapshot.appSettings, 'Import Data', 'Application');
    setAuditLog(snapshot.auditLog);
  }, [setSettings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, auditLog, logAuditEvent, exportAllData, importAllData, loading, undoStack, undoLastChange, resetToDefaults, getPersistenceStrategy, fetchAppVersion }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
