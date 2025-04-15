'use client';

import { Table, Spin, message } from 'antd';  // Importation des composants Ant Design
import { useEffect, useState } from 'react';  // Importation des hooks React pour la gestion de l'état et des effets
import { columns } from './ListCandidate';  // Importation des colonnes de la table
import { useTranslation } from 'react-i18next';  // Importation du hook useTranslation pour la gestion des traductions

// Définition du composant 'AcceptedCandidate'
export default function AcceptedCandidate() {
  // Initialisation du hook de traduction
  const { t } = useTranslation();  // Accéder à la fonction de traduction
  
  // Déclaration de l'état pour les candidats, le chargement et les erreurs
  const [candidates, setCandidates] = useState<any[]>([]);  // Liste des candidats
  const [loading, setLoading] = useState(false);  // État pour gérer le chargement
  const [error, setError] = useState<string | null>(null);  // État pour gérer les erreurs

  // Hook useEffect qui s'exécute au montage du composant pour récupérer les candidats
  useEffect(() => {
    fetchCandidates();
  }, []);  // Le tableau vide [] signifie que l'effet s'exécute uniquement une fois au montage

  // Fonction pour récupérer les candidats depuis l'API
  const fetchCandidates = async () => {
    setLoading(true);  // Active le chargement
    try {
      const res = await fetch('/api/candidates');  // Envoi de la requête pour récupérer les candidats
      const data = await res.json();  // Récupération des données de la réponse JSON
      setCandidates(data);  // Mise à jour de l'état des candidats
    } catch (err: any) {
      // Si une erreur se produit, affiche un message d'erreur via Ant Design
      message.error(t('messages.loadError'));  // Utilisation de la clé de traduction pour l'erreur
      setError(err.message);  // Mise à jour de l'état de l'erreur
    } finally {
      setLoading(false);  // Désactive le chargement
    }
  };

  // Fonction pour supprimer un candidat
  const deleteCandidate = async (id: number) => {
    try {
      const res = await fetch(`/api/candidates/${id}`, { method: 'DELETE' });  // Envoi de la requête de suppression
      if (!res.ok) throw new Error(t('messages.deleteError'));  // Si la suppression échoue, on lève une erreur avec la traduction
      message.success(t('messages.candidateDeleted'));  // Affichage du message de succès
      setCandidates((prev) => prev.filter((c) => c.id !== id));  // Mise à jour de la liste des candidats après suppression
    } catch (err: any) {
      message.error(err.message || t('messages.unknownError'));  // Affichage de l'erreur si la suppression échoue
    }
  };

  // Filtre les candidats dont le statut est 'Accepter'
  const filteredData = candidates.filter((item) => item.status === 'Accepter');

  // Si les données sont en cours de chargement, afficher un spin
  if (loading) return <Spin style={{ display: 'block', margin: '20px auto' }} />;
  
  // Si une erreur est survenue, afficher le message d'erreur
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  // Affiche la table avec les candidats filtrés et les colonnes définies dans ListCandidate
  return <Table columns={columns(deleteCandidate, t)} dataSource={filteredData} rowKey="id" />;
}
