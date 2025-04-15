'use client';

import { Menu } from "antd";  // Composant Menu d'Ant Design pour afficher une liste d'éléments
import Sider from "antd/es/layout/Sider";  // Composant Sider pour la barre latérale
import Link from "next/link";  // Link de Next.js pour la navigation entre pages
import { useTranslation } from 'react-i18next';  // Hook pour la gestion de la traduction

// Composant de la barre latérale
export default function AppSide() {
    const { t } = useTranslation();  // Récupère la fonction de traduction 't'
    const menu = AppSideMenu(t);  // Crée le menu avec la traduction

    return (
        <Sider
            theme="light"  // Définit le thème de la barre latérale (clair)
            style={{
                zIndex: 2,  // Définit l'ordre d'empilement
                position: "fixed",  // Fixe la barre latérale à l'écran
                top: "64px",  // Positionne la barre sous le header
                left: 0,  // Positionne la barre à gauche
                borderRight: "1px solid #f1f1f1",  // Ajoute une bordure droite
                height: "calc(100vh - 64px)",  // Hauteur ajustée pour ne pas chevaucher le header
            }}
        >
            {menu}  {/* Affiche le menu créé */}
        </Sider>
    );
}

// Fonction pour créer les éléments du menu
export function AppSideMenu(t: any) {
    const menuItems = [
        {
            label: <Link href="/rh">{t('sidebar.home')}</Link>,  // Lien vers la page d'accueil
            key: '1',  // Identifiant unique de l'élément
        },
        {
            type: 'divider',  // Séparateur entre les éléments
            key: 'divider-1',
        },
        {
            label: <Link href="/rh/listCandidate">{t('sidebar.listCandidates')}</Link>,  // Lien vers la liste des candidats
            key: '2',
        },
        {
            label: <Link href="/rh/newCandidate">{t('sidebar.newCandidates')}</Link>,  // Lien vers la page de nouveaux candidats
            key: '3',
        },
        {
            label: <Link href="/rh/acceptedCandidate">{t('sidebar.acceptedCandidates')}</Link>,  // Lien vers les candidats acceptés
            key: '4',
        },
        {
            label: <Link href="/rh/pendingCandidate">{t('sidebar.pendingCandidates')}</Link>,  // Lien vers les candidats en attente
            key: '5',
        },
        {
            label: <Link href="/rh/rejectedCandidate">{t('sidebar.rejectedCandidates')}</Link>,  // Lien vers les candidats rejetés
            key: '6',
        },
    ];

    return <Menu mode="inline" items={menuItems as any} />;  // Crée le menu avec les éléments définis
}
