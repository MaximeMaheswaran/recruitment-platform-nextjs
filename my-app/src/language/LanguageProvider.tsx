'use client'; // Spécifie que ce fichier est destiné à être exécuté côté client dans une application Next.js

import { createContext, useContext } from 'react'; // Importation des fonctions pour créer et utiliser un contexte dans React
import { useTranslation } from 'react-i18next'; // Importation du hook useTranslation pour manipuler la langue avec react-i18next
import { useRouter } from 'next/navigation'; // Importation du hook useRouter de Next.js pour manipuler la navigation

// Interface définissant la structure du contexte de langue
interface LanguageContextType {
  changeLanguage: (lang: string) => void; // Fonction permettant de changer la langue
}

// Création du contexte de la langue avec une valeur par défaut de `undefined`
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fournisseur du contexte de la langue, permettant de propager l'état global de la langue dans l'application
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation(); // Hook useTranslation permettant d'accéder à l'instance i18n pour changer la langue
  const router = useRouter(); // Hook useRouter permettant de manipuler la navigation de Next.js

  // Fonction qui change la langue et rafraîchit la page
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Changement de la langue avec i18n
    router.refresh(); // Rafraîchissement de la page pour appliquer la nouvelle langue
  };

  // Fourniture du contexte avec la fonction `changeLanguage` aux composants enfants
  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      {children} {/* Enveloppe tous les enfants pour qu'ils puissent accéder au contexte */}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé permettant d'accéder facilement au contexte de la langue
export const useLanguage = () => {
  const context = useContext(LanguageContext); // Accède au contexte du LanguageContext
  if (!context) throw new Error('useLanguage must be used within LanguageProvider'); // Si le contexte n'est pas trouvé, une erreur est lancée
  return context; // Retourne la fonction `changeLanguage` du contexte
};
