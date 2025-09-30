import { useSettings } from '../contexts/SettingsContext';
import translations from '../i18n';
import { Language } from '../types';
import { TranslationKeys } from '../i18n';

export const useTranslations = () => {
  const { settings } = useSettings();
  const currentLanguage = settings.localization.language;

  const t = (key: keyof TranslationKeys): string => {
    return translations[currentLanguage]?.[key] || translations[Language.EN_GB][key];
  };

  return { t };
};