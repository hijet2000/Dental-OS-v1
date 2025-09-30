import React, { useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Toggle } from '../../components/common/Toggle';
import { Button } from '../../components/common/Button';

const BrandingSettings = () => {
  const { settings, setSettings } = useSettings();

  const handleColorChange = (colorName: keyof typeof settings.branding.colors, value: string) => {
    setSettings(
      prev => ({
        ...prev,
        branding: { ...prev.branding, colors: { ...prev.branding.colors, [colorName]: value } },
      }),
      // FIX: Use String() to prevent implicit conversion error.
      `Updated ${String(colorName)} color`,
      'Branding'
    );
  };
  
  // Apply brand colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.branding.colors.primary);
    root.style.setProperty('--color-secondary', settings.branding.colors.secondary);
    root.style.setProperty('--color-accent', settings.branding.colors.accent);
    root.style.setProperty('--color-bg', settings.branding.colors.background);
    root.style.setProperty('--color-text', settings.branding.colors.text);
  }, [settings.branding.colors]);

  const handleFileUpload = (fileType: 'logo' | 'favicon', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                 setSettings(
                    prev => ({...prev, branding: {...prev.branding, [fileType === 'logo' ? 'logoUrl' : 'faviconUrl']: event.target.result as string}}),
                    `Uploaded ${fileType}`,
                    'Branding'
                );
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card title="Branding & White-Label">
      <div className="space-y-6">
        <Input
          label="Tenant Display Name"
          value={settings.branding.displayName}
          onChange={e =>
            setSettings(
              prev => ({ ...prev, branding: { ...prev.branding, displayName: e.target.value } }),
              'Updated Display Name',
              'Branding'
            )
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Logo</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload('logo', e)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                {settings.branding.logoUrl && <img src={settings.branding.logoUrl} alt="Logo Preview" className="mt-2 h-16 w-auto"/>}
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Favicon</label>
                <input type="file" accept="image/x-icon,image/png,image/svg+xml" onChange={(e) => handleFileUpload('favicon', e)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                 {settings.branding.faviconUrl && <img src={settings.branding.faviconUrl} alt="Favicon Preview" className="mt-2 h-8 w-8"/>}
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Brand Colors</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Object.entries(settings.branding.colors).map(([name, value]) => (
              <div key={name}>
                <label className="capitalize text-sm">{name}</label>
                <input
                  type="color"
                  value={value}
                  onChange={e => handleColorChange(name as keyof typeof settings.branding.colors, e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
        <Toggle
          label="White-label"
          description="Hide vendor branding from the UI."
          enabled={settings.branding.whiteLabel}
          onChange={checked =>
            setSettings(
              prev => ({ ...prev, branding: { ...prev.branding, whiteLabel: checked } }),
              'Toggled White-label',
              'Branding'
            )
          }
        />
      </div>
    </Card>
  );
};

export default BrandingSettings;
