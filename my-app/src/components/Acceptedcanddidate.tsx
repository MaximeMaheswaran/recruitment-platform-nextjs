'use client';

import { Table, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { columns } from './ListCandidate';
import { useTranslation } from 'react-i18next'; // Importation du hook useTranslation

export default function AcceptedCandidate() {
  const { t } = useTranslation(); // Accéder à la fonction de traduction
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (err: any) {
      message.error(t('messages.loadError')); // Utilisation de la clé de traduction
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(t('messages.deleteError')); // Utilisation de la traduction pour l'erreur
      message.success(t('messages.candidateDeleted')); // Utilisation de la traduction pour le message de succès
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      message.error(err.message || t('messages.unknownError')); // Utilisation de la traduction pour les erreurs
    }
  };

  const filteredData = candidates.filter((item) => item.status === 'Accepter');

  if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return <Table columns={columns(deleteCandidate, t)} dataSource={filteredData} rowKey="id" />;
}
