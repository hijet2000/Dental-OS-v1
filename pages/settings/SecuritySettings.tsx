import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { downloadCsv } from '../../utils/helpers';
import { AuditEvent } from '../../types';

const SecuritySettings = () => {
  const { settings, setSettings, auditLog } = useSettings();
  const { security } = settings;

  const handleIpListChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const list = e.target.value.split('\n').filter(ip => ip.trim() !== '');
    setSettings(prev => ({
        ...prev,
        security: { ...prev.security, ipAllowlist: list }
    }), 'Updated IP Allowlist', 'Security');
  };
  
  const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeout = parseInt(e.target.value, 10);
    if (!isNaN(timeout)) {
      setSettings(prev => ({
          ...prev,
          security: { ...prev.security, sessionTimeout: timeout }
      }), 'Updated Session Timeout', 'Security');
    }
  };
  
  const handleDownloadAuditLog = () => {
      const formattedLog = auditLog.map((event: AuditEvent) => ({
        timestamp: event.timestamp,
        user: event.user,
        action: event.action,
        entity: event.entity,
        summary: `Changed ${Object.keys(event.details.after).join(', ')}`,
      }));
      downloadCsv(formattedLog, 'audit-log.csv');
  };

  return (
    <Card title="Security">
      <div className="space-y-6">
        <div>
          <label htmlFor="ipAllowlist" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            IP Allowlist (one per line)
          </label>
          <textarea
            id="ipAllowlist"
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
            value={security.ipAllowlist.join('\n')}
            onChange={handleIpListChange}
          />
        </div>
        <Input
          label="Session Timeout (minutes)"
          type="number"
          value={security.sessionTimeout}
          onChange={handleTimeoutChange}
        />
        <div>
            <h4 className="font-medium mb-2">Password Policy (Demo)</h4>
            <div className="p-4 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                </ul>
            </div>
        </div>
        <Button onClick={handleDownloadAuditLog}>Download Audit Log (CSV)</Button>
      </div>
    </Card>
  );
};

export default SecuritySettings;
