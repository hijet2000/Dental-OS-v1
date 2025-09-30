import translations, { TranslationKeys } from '../i18n';

// For this scaffold, we'll hardcode the language.
// In a real app, this would come from the AppSettingsContext.
const currentLanguage = 'en-GB';
const fallbackLanguage = 'en-GB';

export const useTranslations = () => {
  const t = (key: keyof TranslationKeys): string => {
    return translations[currentLanguage]?.[key] || translations[fallbackLanguage][key] || key;
  };

  return { t };
};
