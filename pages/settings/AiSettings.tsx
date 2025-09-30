import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Toggle } from '../../components/common/Toggle';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

const AiSettings = () => {
  const { settings, setSettings } = useSettings();
  const { ai } = settings;
  
  const handleSettingChange = (field: keyof typeof ai, value: any) => {
    setSettings(prev => ({
      ...prev,
      ai: { ...prev.ai, [field]: value }
      // FIX: Use String() to prevent implicit conversion error.
    }), `Updated AI setting: ${String(field)}`, 'AI');
  };

  return (
    <Card title="AI Settings">
      <div className="space-y-6">
        <Toggle
          label="Global AI Enable"
          description="Enable or disable all AI features across the application."
          enabled={ai.enabled}
          onChange={checked => handleSettingChange('enabled', checked)}
        />
        <Input
          label="Proxy Endpoint"
          value={ai.proxyEndpoint}
          onChange={e => handleSettingChange('proxyEndpoint', e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
                label="Rate Limit per User (requests/hour)"
                type="number"
                value={ai.rateLimitUser}
                onChange={e => handleSettingChange('rateLimitUser', parseInt(e.target.value, 10) || 0)}
            />
            <Input
                label="Rate Limit per Tenant (requests/hour)"
                type="number"
                value={ai.rateLimitTenant}
                onChange={e => handleSettingChange('rateLimitTenant', parseInt(e.target.value, 10) || 0)}
            />
        </div>
        <Button onClick={() => alert("Navigating to AI usage and cost viewer...")}>
            View AI Usage & Cost
        </Button>
      </div>
    </Card>
  );
};

export default AiSettings;
