'use client';

import { Table, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { columns } from './ListCandidate';  // Import des colonnes définies dans ListCandidate
import { useTranslation } from 'react-i18next';  // Hook pour la gestion de la traduction

export default function NewCandidate() {
  const { t } = useTranslation();  // Initialisation du hook pour la traduction
  const [candidates, setCandidates] = useState<any[]>([]);  // Liste des candidats
  const [loading, setLoading] = useState(false);  // Indicateur de chargement
  const [error, setError] = useState<string | null>(null);  // Gestion des erreurs

  // Appel API pour récupérer les candidats
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);  // Début du chargement
    try {
      const res = await fetch('/api/candidates');  // Récupération des candidats depuis l'API
      const data = await res.json();  // Conversion de la réponse en JSON
      setCandidates(data);  // Mise à jour de la liste des candidats
    } catch (err: any) {
      message.error('Erreur lors du chargement');  // Affichage d'un message d'erreur si l'appel échoue
      setError(err.message);  // Mise à jour de l'état d'erreur
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  // Suppression d'un candidat
  const deleteCandidate = async (id: number) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });  // Suppression du candidat via l'API
      if (!res.ok) throw new Error('Erreur de suppression');  // Si l'API retourne une erreur, on lève une exception
      message.success('Candidat supprimé');  // Affichage d'un message de succès
      setCandidates((prev) => prev.filter((c) => c.id !== id));  // Mise à jour de l'état pour retirer le candidat supprimé
    } catch (err: any) {
      message.error(err.message || 'Erreur inconnue');  // Affichage du message d'erreur
    }
  };

  // Filtre les candidats ayant le statut "Nouveau"
  const filteredData = candidates.filter((item) => item.status === 'Nouveau');

  // Affiche un spinner pendant le chargement des données
  if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;

  // Affiche un message d'erreur s'il y a une erreur
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  // Affichage de la table avec les candidats filtrés
  return <Table columns={columns(deleteCandidate, t)} dataSource={filteredData} rowKey="id" />;
}
