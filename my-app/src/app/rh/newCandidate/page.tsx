'use client';
import NewCandidate from "@/components/NewCandidate";
import router from "next/router";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
    if (!cookie) {
      router.push('/signup');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  if (!isAuthChecked) return null;
  return <NewCandidate/>;
}

