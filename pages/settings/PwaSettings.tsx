import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Toggle } from '../../components/common/Toggle';

const PwaSettings = () => {
  const { settings, setSettings, fetchAppVersion, exportAllData } = useSettings();
  const { pwa } = settings;
  
  const handleCheckForUpdates = async () => {
      const currentVersion = pwa.appVersion;
      await fetchAppVersion();
      // Refetch settings from context after fetchAppVersion updates it
      setSettings(prev => {
          if (prev.pwa.appVersion !== currentVersion) {
              alert(`Update found! New version: ${prev.pwa.appVersion}`);
              return {...prev, pwa: {...prev.pwa, showUpdateBanner: true}};
          } else {
              alert('You are on the latest version.');
              return prev;
          }
      }, 'Checked for Updates', 'PWA');
  };

  return (
    <Card title="PWA & Updates">
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p>App Version: <span className="font-mono">{pwa.appVersion}</span></p>
          <p>Schema Version: <span className="font-mono">{pwa.schemaVersion}</span></p>
          <p>Build Time: <span className="font-mono">{new Date(pwa.buildTime).toLocaleString()}</span></p>
        </div>
        <div className="space-y-2">
            <Button onClick={handleCheckForUpdates} variant="primary">Check for Updates</Button>
            <Toggle
                label="Show Update Banner (for testing)"
                enabled={pwa.showUpdateBanner}
                onChange={checked => setSettings(prev => ({...prev, pwa: {...prev.pwa, showUpdateBanner: checked}}))}
            />
        </div>
        <div>
            <h4 className="font-medium">Snapshot Before Update</h4>
            <p className="text-sm text-gray-500 mb-2">It's a good idea to save a snapshot of your data before applying updates.</p>
            <Button onClick={exportAllData} variant="secondary">Export All Data</Button>
        </div>
      </div>
    </Card>
  );
};

export default PwaSettings;
