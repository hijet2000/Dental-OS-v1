import React, { useState, useEffect } from 'react';
import { useAppSettings } from '../../contexts/AppSettingsContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Toggle } from '../../components/common/Toggle';
import { Button } from '../../components/common/Button';

const BrandingSettings = () => {
  const { settings, updateSettings, applyBranding } = useAppSettings();
  const [localBranding, setLocalBranding] = useState(settings.branding);

  useEffect(() => {
    // Keep local state in sync if global state changes
    setLocalBranding(settings.branding);
  }, [settings.branding]);

  const handleColorChange = (colorName: keyof typeof localBranding.colors, value: string) => {
    setLocalBranding(prev => ({ ...prev, colors: { ...prev.colors, [colorName]: value } }));
  };

  const handleFileUpload = (fileType: 'logo' | 'favicon', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLocalBranding(prev => ({
            ...prev,
            [fileType === 'logo' ? 'logoUrl' : 'faviconUrl']: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleApply = () => {
      updateSettings(prev => ({...prev, branding: localBranding}), "Updated Branding", "Branding");
      alert('Branding settings applied!');
  };

  return (
    <Card title="Branding & White-Label" footer={<div className="flex justify-end"><Button onClick={handleApply}>Apply Changes</Button></div>}>
      <div className="space-y-6">
        <Input
          label="Tenant Display Name"
          value={localBranding.displayName}
          onChange={e => setLocalBranding(prev => ({ ...prev, displayName: e.target.value }))}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Logo</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload('logo', e)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold" />
            {localBranding.logoUrl && <img src={localBranding.logoUrl} alt="Logo Preview" className="mt-2 h-16 w-auto bg-gray-200 p-1 rounded" />}
          </div>
          <div>
            <label className="block text-sm font-medium">Favicon</label>
            <input type="file" accept="image/x-icon,image/png,image/svg+xml" onChange={(e) => handleFileUpload('favicon', e)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold" />
            {localBranding.faviconUrl && <img src={localBranding.faviconUrl} alt="Favicon Preview" className="mt-2 h-8 w-8 bg-gray-200 p-1 rounded" />}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Brand Colors</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Object.entries(localBranding.colors).map(([name, value]) => (
              <div key={name}>
                <label className="capitalize text-sm">{name}</label>
                <input
                  type="color"
                  value={value}
                  onChange={e => handleColorChange(name as keyof typeof localBranding.colors, e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
        <Toggle
          label="White-label"
          description="Hide vendor branding from the UI."
          enabled={localBranding.whiteLabel}
          onChange={checked => setLocalBranding(prev => ({ ...prev, whiteLabel: checked }))}
        />
      </div>
    </Card>
  );
};

export default BrandingSettings;
