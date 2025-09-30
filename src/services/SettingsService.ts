import { AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

const STORAGE_KEY = 'dental-os-settings';

class SettingsService {
  private settings: AppSettings;

  constructor() {
    this.settings = this.load();
  }

  public getSettings(): AppSettings {
    return this.settings;
  }

  public save(newSettings: AppSettings): void {
    this.settings = newSettings;
    try {
      const serializedState = JSON.stringify(newSettings);
      localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
      console.error('Error saving settings to localStorage', error);
    }
  }
  
  public load(): AppSettings {
    try {
      const serializedState = localStorage.getItem(STORAGE_KEY);
      if (serializedState === null) {
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Error loading settings from localStorage, using defaults.', error);
      return DEFAULT_SETTINGS;
    }
  }
}

export const settingsService = new SettingsService();
