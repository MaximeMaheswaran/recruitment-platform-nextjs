'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import FormConnection from '@/components/FormConnection';



export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Lire le cookie JWT
        const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
        if (cookie) {
          router.push('/rh');
          return;
        }
  

    // Fin de chargement, on peut afficher le formulaire
    setLoading(false);
  }, [router]);

  if (loading) return null; // Ne pas afficher le formulaire pendant la vérification

  return <FormConnection />;
}
