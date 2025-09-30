import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import { Toggle } from '../../components/common/Toggle';
import { Language, FontSize } from '../../types';

const LANGUAGES = [
    { value: Language.EN_GB, label: 'English (GB)' },
    { value: Language.WELSH, label: 'Welsh (Cymraeg)' },
    { value: Language.SHONA, label: 'Shona' },
    { value: Language.NDEBELE, label: 'Ndebele' },
];

const LanguageSettings = () => {
  const { settings, setSettings } = useSettings();
  const { localization } = settings;

  const handleSettingChange = (field: keyof typeof localization, value: any) => {
    setSettings(prev => ({
      ...prev,
      localization: { ...prev.localization, [field]: value }
      // FIX: Use String() to prevent implicit conversion error.
    }), `Updated ${String(field)}`, 'Localization');
  };

  return (
    <Card title="Language & Accessibility">
      <div className="space-y-4">
        <Select 
          label="Language" 
          value={localization.language}
          onChange={e => handleSettingChange('language', e.target.value)}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </Select>
        <Select
          label="Font Scaling"
          value={localization.fontSize}
          onChange={e => handleSettingChange('fontSize', e.target.value)}
        >
          <option value={FontSize.SMALL}>Small</option>
          <option value={FontSize.MEDIUM}>Medium</option>
          <option value={FontSize.LARGE}>Large</option>
        </Select>
        <Toggle
          label="High Contrast Mode"
          enabled={localization.highContrastMode}
          onChange={checked => handleSettingChange('highContrastMode', checked)}
        />
        <Toggle
          label="Keyboard Navigation"
          description="Enable enhanced keyboard navigation features."
          enabled={localization.keyboardNavigation}
          onChange={checked => handleSettingChange('keyboardNavigation', checked)}
        />
      </div>
    </Card>
  );
};

export default LanguageSettings;
