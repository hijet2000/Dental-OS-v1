import React, { useRef } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { PersistenceMode, Snapshot } from '../../types';
import { downloadJson } from '../../utils/helpers';
import { useTranslations } from '../../hooks/useTranslations';

const PersistenceSettings = () => {
  const { settings, setSettings, exportAllData, importAllData, auditLog } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslations();

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as PersistenceMode;
    alert(`Persistence mode changed to ${newMode}. The app will now use this storage method for future changes. You may need to refresh for some changes to take full effect.`);
    setSettings(
      prev => ({ ...prev, persistence: { ...prev.persistence, mode: newMode } }),
      'Updated Persistence Mode',
      'Persistence'
    );
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const snapshot = JSON.parse(event.target?.result as string) as Snapshot;
          if (snapshot.appSettings && snapshot.auditLog) {
            importAllData(snapshot);
            alert('Data imported successfully!');
          } else {
             alert('Invalid snapshot file format.');
          }
        } catch (error) {
           alert('Error reading or parsing the file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSeed = () => {
    const snapshot: Snapshot = { appSettings: settings, auditLog };
    downloadJson(snapshot, 'OVFD_Seed_Snapshot.json');
  };

  return (
    <Card title={t('backup_restore_settings')}>
      <div className="space-y-4">
        <Select label="Persistence Mode" value={settings.persistence.mode} onChange={handleModeChange}>
          {/* FIX: Add explicit type to mode to resolve type error. */}
          {Object.values(PersistenceMode).map((mode: PersistenceMode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </Select>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p>Schema Version: <span className="font-mono">{settings.persistence.schemaVersion}</span></p>
            <p>Estimated Storage Size: <span className="font-mono">{settings.persistence.storageSizeMb.toFixed(2)} MB</span></p>
        </div>
        <div className="flex flex-wrap gap-2">
            <Button onClick={exportAllData} variant="primary">Export All Data (JSON)</Button>
            <Button onClick={handleImportClick} variant="secondary">Import Data (JSON)</Button>
            <Button onClick={handleDownloadSeed} variant="ghost">Download Seed Snapshot</Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
        </div>
      </div>
    </Card>
  );
};

export default PersistenceSettings;