'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import FormConnection from '@/components/FormConnection';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('recruteur_token='));

    if (cookie) {
      try {
        const token = cookie.split('=')[1];
        const decoded = jwtDecode<any>(token);

        if (decoded && decoded.username) {
          router.push('/rh'); // Rediriger vers /rh s’il est connecté
          return;
        }
      } catch (err) {
        console.error('Token invalide :', err);
      }
    }

    // Fin de chargement, on peut afficher le formulaire
    setLoading(false);
  }, [router]);

  if (loading) return null; // Ne pas afficher le formulaire pendant la vérification

  return <FormConnection />;
}
