'use client';

import { useEffect, useState } from 'react';
import { message } from 'antd';

export interface Candidate {
  id: number;
  lastname: string;
  name: string;
  email: string;
  tel: string;
  poste: string;
  message: string;
  cv: string;
  status: string;
}

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/candidates');
      if (!response.ok) throw new Error('Erreur lors du chargement des candidats');
      const data = await response.json();
      setCandidates(data);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const addNewCandidate = (candidate: Candidate) => {
    setCandidates((prev: Candidate[]) => [...prev, candidate]);
  };

  const updateExistingCandidate = (updated: Candidate) => {
    setCandidates((prev: Candidate[]) =>
      prev.map((c: Candidate) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteExistingCandidate = (id: number) => {
    setCandidates((prev: Candidate[]) => prev.filter((c: Candidate) => c.id !== id));
  };

  const updateCandidateStatusLocally = (id: number, status: string) => {
    setCandidates((prev: Candidate[]) =>
      prev.map((c: Candidate) =>
        c.id === id ? { ...c, status } : c
      )
    );
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return {
    candidates,
    loading,
    error,
    addNewCandidate,
    updateExistingCandidate,
    deleteExistingCandidate,
    updateCandidateStatusLocally, // 👈 expose la fonction ici
  };
}
