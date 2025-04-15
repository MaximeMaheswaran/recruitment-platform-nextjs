'use client';

import { Button, Space } from 'antd';  // Importation des composants nécessaires de Ant Design
import { useLanguage } from '../language/LanguageProvider';  // Importation du hook personnalisé pour changer la langue

export default function LanguageSwitcher() {
  const { changeLanguage } = useLanguage();  // Utilisation du hook pour accéder à la fonction changeLanguage

  return (
    <Space>  {/* Utilisation du composant Space pour espacer les boutons */}
      {/* Bouton pour changer la langue en français */}
      <Button onClick={() => changeLanguage('fr')}>🇫🇷 FR</Button>
      
      {/* Bouton pour changer la langue en anglais */}
      <Button onClick={() => changeLanguage('en')}>🇬🇧 EN</Button>
    </Space>
  );
}
