'use client';

import { Table, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { columns } from './ListCandidate';

export default function NewCandidate() {
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
      message.error('Erreur lors du chargement');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur de suppression');
      message.success('Candidat supprimé');
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      message.error(err.message || 'Erreur inconnue');
    }
  };

  const filteredData = candidates.filter((item) => item.status === 'Nouveau');

  if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return <Table columns={columns(deleteCandidate)} dataSource={filteredData} rowKey="id" />;
}
