module.exports = {
  i18n: {
    // Définition de la langue par défaut de l'application
    defaultLocale: 'fr',  // Langue par défaut est le français (fr)
    
    // Liste des langues supportées dans l'application
    locales: ['fr', 'en'],  // L'application supporte deux langues : français (fr) et anglais (en)
    
    // Désactivation de la détection automatique de la langue
    localeDetection: false,  // i18next ne détectera pas automatiquement la langue de l'utilisateur. L'utilisateur doit choisir explicitement une langue.
  },
};
