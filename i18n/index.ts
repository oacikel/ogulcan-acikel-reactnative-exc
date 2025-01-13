import { translations } from './translations';
import { I18n } from 'i18n-js';

const i18n = new I18n(translations);
i18n.defaultLocale = 'tr';
i18n.locale = 'tr';
i18n.enableFallback = true;

export default i18n;