import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Toggle } from '../../components/common/Toggle';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { NotificationRule, Role } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';

const NotificationSettings = () => {
  const { settings, setSettings } = useSettings();
  const { notifications } = settings;
  const { t } = useTranslations();

  const handleChannelToggle = (channel: keyof typeof notifications.channels, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, channels: { ...prev.notifications.channels, [channel]: value } }
    }), `Toggled ${channel} notifications`, 'Notifications');
  };
  
  const handleRuleUpdate = (ruleId: string, updates: Partial<NotificationRule>) => {
    setSettings(prev => {
        const newRules = prev.notifications.rules.map(r =>
            r.id === ruleId ? { ...r, ...updates } : r
        );
        return {
            ...prev,
            notifications: { ...prev.notifications, rules: newRules }
        };
    }, `Updated notification rule ${ruleId}`, 'Notifications');
  };
  
  const handleRoleToggleForRule = (ruleId: string, role: Role, checked: boolean) => {
    const rule = notifications.rules.find(r => r.id === ruleId);
    if (!rule) return;
    const newRoles = checked
        ? [...rule.recipientRoles, role]
        : rule.recipientRoles.filter(r => r !== role);
    handleRuleUpdate(ruleId, { recipientRoles: newRoles });
  };
  
  const handleQuietHoursChange = (part: 'start' | 'end', value: string) => {
      setSettings(prev => ({
          ...prev,
          notifications: { ...prev.notifications, quietHours: { ...prev.notifications.quietHours, [part]: value } }
      }), 'Updated Quiet Hours', 'Notifications');
  };

  return (
    <Card title="Notifications">
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Enabled Channels (Master Switch)</h4>
          <div className="space-y-2">
            <Toggle label="In-App" enabled={notifications.channels.inApp} onChange={c => handleChannelToggle('inApp', c)} />
            <Toggle label="Email" enabled={notifications.channels.email} onChange={c => handleChannelToggle('email', c)} />
            <Toggle label="SMS" enabled={notifications.channels.sms} onChange={c => handleChannelToggle('sms', c)} />
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Default Rules</h4>
          <div className="space-y-4">
            {notifications.rules.map(rule => (
              <div key={rule.id} className="p-4 border rounded-md dark:border-gray-700">
                <Toggle
                  label={t(rule.nameKey)}
                  enabled={rule.enabled}
                  onChange={checked => handleRuleUpdate(rule.id, { enabled: checked })}
                />
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Channels</label>
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-gray-300" checked={rule.channels.inApp} onChange={e => handleRuleUpdate(rule.id, { channels: { ...rule.channels, inApp: e.target.checked } })} />
                        <span className="ml-2">In-App</span>
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-gray-300" checked={rule.channels.email} onChange={e => handleRuleUpdate(rule.id, { channels: { ...rule.channels, email: e.target.checked } })} />
                        <span className="ml-2">Email</span>
                      </label>
                       <label className="flex items-center text-sm">
                        <input type="checkbox" className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-gray-300" checked={rule.channels.sms} onChange={e => handleRuleUpdate(rule.id, { channels: { ...rule.channels, sms: e.target.checked } })} />
                        <span className="ml-2">SMS</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Recipient Roles</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                      {settings.roles.map(role => (
                        <label key={role} className="flex items-center text-sm">
                          <input type="checkbox" className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-gray-300" checked={rule.recipientRoles.includes(role)} onChange={e => handleRoleToggleForRule(rule.id, role, e.target.checked)} />
                          <span className="ml-2">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4">Add Rule</Button>
        </div>

        <div>
            <h4 className="font-medium mb-2">Quiet Hours</h4>
            <div className="flex items-center space-x-4">
                <Input type="time" label="Start" value={notifications.quietHours.start} onChange={e => handleQuietHoursChange('start', e.target.value)} />
                <Input type="time" label="End" value={notifications.quietHours.end} onChange={e => handleQuietHoursChange('end', e.target.value)} />
            </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;