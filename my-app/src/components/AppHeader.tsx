'use client';

import React, { useEffect, useState } from 'react';
import { PieChartFilled, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const { Header } = Layout;

export default function AppHeader() {
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
    setSession(null); // ⬅️ IMPORTANT : on vide la session
    router.push('/signup');
  };

  return (
    <Header className="!bg-white border-b border-[#f1f1f1] flex items-center justify-between" style={{ position: "fixed", width: "100%", zIndex: "2" }}>
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2" style={{ color: "black" }}>
          <div><PieChartFilled className="text-3xl" /></div>
          <div>Analytics</div>
        </Link>
      </div>

      {/* Section droite */}
      <div className="flex items-center gap-2" style={{ color: "black" }}>
        <Link href="/signup">
          <Avatar icon={<UserOutlined />} />
          <span style={{ marginLeft: '10px' }}>
            {session ? session.firstname +" "+ session.lastname : 'Se connecter'}
          </span>
        </Link>

        {session && (
          <button
            onClick={handleLogout}
            style={{ marginLeft: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Déconnexion"
          >
            <PoweroffOutlined style={{ fontSize: 18, color: '#000' }} />
          </button>
        )}
      </div>
    </Header>
  );
}
