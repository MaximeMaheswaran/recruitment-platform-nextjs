'use client';

import React, { useEffect, useState } from 'react';  // Importation de React et des hooks nécessaires
import { PieChartFilled, PoweroffOutlined, UserOutlined } from '@ant-design/icons';  // Importation des icônes Ant Design
import { Avatar, Layout } from 'antd';  // Importation des composants de la bibliothèque Ant Design
import Link from 'next/link';  // Importation de Link pour les liens de navigation
import { useRouter } from 'next/navigation';  // Importation du hook useRouter de Next.js pour la navigation
import { jwtDecode } from 'jwt-decode';  // Importation de la fonction jwtDecode pour décoder les tokens JWT
import LanguageSwitcher from './LanguageSwitcher';  // Importation du composant pour changer la langue
import { useTranslation } from 'react-i18next';  // Importation du hook useTranslation pour gérer la traduction

const { Header } = Layout;  // Déstructuration du composant Layout pour obtenir Header

// Composant principal pour l'en-tête
export default function AppHeader() {
  const { t } = useTranslation();  // Utilisation du hook useTranslation pour obtenir la fonction de traduction
  const [session, setSession] = useState<any>(null);  // État pour gérer la session utilisateur
  const router = useRouter();  // Accès au routeur Next.js pour la navigation

  // useEffect pour vérifier si un utilisateur est connecté via un cookie contenant le token
  useEffect(() => {
    // Recherche du cookie contenant le token JWT
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
    if (!cookie) {
      setSession(null);  // Si aucun cookie, l'utilisateur n'est pas connecté
      return;
    }

    // Tentative de décoder le token JWT et d'extraire les informations de session
    try {
      const token = cookie.split('=')[1];  // Récupération du token
      const decoded = jwtDecode<any>(token);  // Décodage du token pour obtenir les données utilisateur
      setSession(decoded);  // Mise à jour de l'état session avec les données décodées
    } catch (err) {
      console.error("Token invalide :", err);  // Si le token est invalide, erreur dans la console
      setSession(null);  // Réinitialisation de la session
    }
  }, []);  // Le tableau vide [] signifie que cet effet ne se déclenche qu'une fois lors du montage du composant

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    // Envoi de la requête de déconnexion vers l'API
    await fetch('/api/logout', { method: 'POST' });
    setSession(null);  // Réinitialisation de l'état session
    router.push('/signup');  // Redirection vers la page de connexion
  };

  return (
    <Header className="!bg-white border-b border-[#f1f1f1] flex items-center justify-between" style={{ position: "fixed", width: "100%", zIndex: "2" }}>
      {/* Section du logo et du titre */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2" style={{ color: "black" }}>
          <div><PieChartFilled className="text-3xl" /></div> {/* Icône pour les statistiques */}
          <div>{t('header.analytics')}</div> {/* Utilisation de la traduction pour afficher "Analytics" */}
        </Link>
      </div>

      {/* Section de la langue et de l'avatar utilisateur */}
      <div className="flex items-center gap-4" style={{ color: "black" }}>
        {/* Composant pour changer la langue */}
        <LanguageSwitcher />
        
        {/* Avatar de l'utilisateur et son nom, ou un lien vers la page de connexion si non connecté */}
        <Link href="/signup">
          <Avatar icon={<UserOutlined />} />  {/* Affiche l'icône utilisateur */}
          <span style={{ marginLeft: '10px' }}>
            {session ? `${session.firstname} ${session.lastname}` : t('header.login')} {/* Affiche le nom de l'utilisateur ou "Se connecter" */}
          </span>
        </Link>

        {/* Bouton de déconnexion, visible uniquement si l'utilisateur est connecté */}
        {session && (
          <button
            onClick={handleLogout}  // Fonction de déconnexion au clic
            style={{ marginLeft: '20px', background: 'none', border: 'none', cursor: 'pointer' }}  // Style du bouton
            aria-label={t('header.logout')}  // Utilisation de la traduction pour l'accessibilité
          >
            <PoweroffOutlined style={{ fontSize: 18, color: '#000' }} />  {/* Icône de déconnexion */}
          </button>
        )}
      </div>
    </Header>
  );
}
