'use client';

import React, { useEffect, useState } from 'react';
import { PieChartFilled, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next'; // Importer le hook useTranslation

const { Header } = Layout;

export default function AppHeader() {
  const { t } = useTranslation(); // Utilisation du hook useTranslation pour récupérer la fonction t
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
    if (!cookie) {
      setSession(null);
      return;
    }

    try {
      const token = cookie.split('=')[1];
      const decoded = jwtDecode<any>(token);
      setSession(decoded);
    } catch (err) {
      console.error("Token invalide :", err);
      setSession(null);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setSession(null);
    router.push('/signup');
  };

  return (
    <Header className="!bg-white border-b border-[#f1f1f1] flex items-center justify-between" style={{ position: "fixed", width: "100%", zIndex: "2" }}>
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2" style={{ color: "black" }}>
          <div><PieChartFilled className="text-3xl" /></div>
          <div>{t('header.analytics')}</div> {/* Utilisation de la clé de traduction */}
        </Link>
      </div>

      <div className="flex items-center gap-4" style={{ color: "black" }}>
        {/* Bouton de changement de langue */}
        <LanguageSwitcher />
        {/* Avatar + Nom */}
        <Link href="/signup">
          <Avatar icon={<UserOutlined />} />
          <span style={{ marginLeft: '10px' }}>
            {session ? `${session.firstname} ${session.lastname}` : t('header.login')} {/* Traduction de "Se connecter" */}
          </span>
        </Link>

        {session && (
          <button
            onClick={handleLogout}
            style={{ marginLeft: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label={t('header.logout')}
          >
            <PoweroffOutlined style={{ fontSize: 18, color: '#000' }} />
          </button>
        )}
      </div>
    </Header>
  );
}
