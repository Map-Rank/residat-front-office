import { describe, it, expect, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import { i18n } from '@/i18n';
import en from '@/langs/en.json';
import fr from '@/langs/fr.json';
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js';

describe('i18n configuration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should load English as the default language when no language is saved', () => {
    const messages = {
      en: en,
      fr: fr,
    };

    // Check if saved language is set to 'en' by default
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage)).toBeNull();
    expect(i18n.global.locale).toBe('en');
    expect(i18n.global.fallbackLocale).toBe('en');
    expect(i18n.global.messages).toEqual(messages);

    // Ensure the language is saved in localStorage
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage)).toBe('en');
  });

  it('should load the saved language from localStorage if it exists', () => {
    // Save 'fr' as the language in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, 'fr');

    // Reinitialize i18n
    const newI18n = createI18n({
      locale: localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage),
      fallbackLocale: 'en',
      messages: {
        en,
        fr,
      },
    });

    // Validate the locale is correctly set
    expect(newI18n.global.locale).toBe('fr');
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage)).toBe('fr');
  });

  it('should fallback to English if the saved language is not supported', () => {
    // Save an unsupported language (e.g., 'de') in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, 'de');

    // Reinitialize i18n
    const newI18n = createI18n({
      locale: localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage),
      fallbackLocale: 'en',
      messages: {
        en,
        fr,
      },
    });

    // Validate that it falls back to 'en'
    expect(newI18n.global.locale).toBe('en');
  });

  it('should match the message structure of the language files', () => {
    // Validate that English and French messages are loaded
    expect(i18n.global.messages.en).toEqual(en);
    expect(i18n.global.messages.fr).toEqual(fr);
  });
});
