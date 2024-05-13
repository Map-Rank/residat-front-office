import { createI18n } from 'vue-i18n';
import en from '@/langs/en.json';
import fr from '@/langs/fr.json';
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js';

const messages = {
    en: en,
    fr: fr
};

let savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS.appLanguage);
if (!savedLanguage) {
    savedLanguage = 'en';
    localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, savedLanguage); 
}

export const i18n = createI18n({
    locale: savedLanguage, 
    fallbackLocale: 'en', 
    messages 
});

i18n.global.locale = savedLanguage;
