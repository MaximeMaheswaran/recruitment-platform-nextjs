// Importation de i18next et du plugin React pour l'intégration de i18next dans les composants React
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importation des fichiers de traduction pour le français et l'anglais
import translationFR from '../../public/locales/fr/common.json';
import translationEN from '../../public/locales/en/common.json';

// Initialisation de i18next
i18n
  .use(initReactI18next) // Utilisation du plugin pour intégrer i18next avec React
  .init({
    resources: {
      // Définition des traductions disponibles pour chaque langue
      fr: { translation: translationFR }, // Traduction en français
      en: { translation: translationEN }, // Traduction en anglais
    },
    lng: 'fr', // Langue par défaut (français)
    fallbackLng: 'fr', // Langue de secours (si la traduction n'est pas trouvée dans la langue actuelle)
    interpolation: {
      escapeValue: false, // Ne pas échapper les caractères dans les chaînes traduites (utile pour le HTML et les variables dynamiques)
    },
  });

// Exportation de l'instance i18n pour pouvoir l'utiliser dans toute l'application
export default i18n;
