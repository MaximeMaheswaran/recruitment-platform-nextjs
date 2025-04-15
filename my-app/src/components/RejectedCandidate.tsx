'use client';

import { Table, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { columns } from './ListCandidate';  // Import des colonnes de ListCandidate
import { useTranslation } from 'react-i18next';  // Hook pour la gestion de la traduction

export default function RejectedCandidate() {
  const { t } = useTranslation();  // Initialisation du hook pour la traduction
  const [candidates, setCandidates] = useState<any[]>([]);  // Liste des candidats
  const [loading, setLoading] = useState(false);  // Indicateur de chargement
  const [error, setError] = useState<string | null>(null);  // Gestion des erreurs

  // Récupère les candidats depuis l'API
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);  // Début du chargement
    try {
      const res = await fetch('/api/candidates');  // Appel API pour récupérer les candidats
      const data = await res.json();  // Conversion de la réponse en JSON
      setCandidates(data);  // Mise à jour des candidats dans l'état
    } catch (err: any) {
      message.error('Erreur lors du chargement');  // Affichage d'un message d'erreur
      setError(err.message);  // Mise à jour de l'état d'erreur
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  // Suppression d'un candidat
  const deleteCandidate = async (id: number) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });  // Suppression via l'API
      if (!res.ok) throw new Error('Erreur de suppression');  // Gestion des erreurs
      message.success('Candidat supprimé');  // Affichage d'un message de succès
      setCandidates((prev) => prev.filter((c) => c.id !== id));  // Mise à jour de l'état pour retirer le candidat supprimé
    } catch (err: any) {
      message.error(err.message || 'Erreur inconnue');  // Affichage du message d'erreur
    }
  };

  // Filtre les candidats avec le statut "Refuser"
  const filteredData = candidates.filter((item) => item.status === 'Refuser');

  // Affiche un spinner pendant le chargement des données
  if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;

  // Affiche un message d'erreur s'il y a une erreur
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  // Affichage de la table avec les candidats rejetés
  return <Table columns={columns(deleteCandidate, t)} dataSource={filteredData} rowKey="id" />;
}
