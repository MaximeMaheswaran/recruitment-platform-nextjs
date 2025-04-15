'use client';

import { useEffect, useState } from 'react';
import { message } from 'antd'; // Importation d'Ant Design pour afficher les messages d'erreur

// Définition du type Candidate qui représente la structure des données d'un candidat
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

// Hook personnalisé pour gérer les candidats
export function useCandidates() {
  // État pour stocker la liste des candidats
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // État pour savoir si les données sont en train de charger
  const [loading, setLoading] = useState<boolean>(false);
  // État pour stocker les erreurs potentielles
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer tous les candidats
  const fetchCandidates = async () => {
    try {
      // Marquer l'état de chargement comme étant vrai avant de commencer la récupération des données
      setLoading(true);
      
      // Effectuer la requête fetch pour récupérer les candidats
      const response = await fetch('/api/candidates');
      
      // Si la réponse n'est pas OK, on lance une erreur
      if (!response.ok) throw new Error('Erreur lors du chargement des candidats');
      
      // Si la réponse est valide, on transforme les données en JSON
      const data = await response.json();
      
      // Mise à jour de l'état candidates avec les données récupérées
      setCandidates(data);
    } catch (err: any) {
      // En cas d'erreur, on met à jour l'état error avec le message d'erreur
      setError(err.message || 'Erreur inconnue');
      // Afficher un message d'erreur à l'utilisateur
      message.error(err.message || 'Erreur inconnue');
    } finally {
      // À la fin de l'opération (réussie ou échouée), on marque l'état de chargement comme terminé
      setLoading(false);
    }
  };

  // Fonction pour ajouter un nouveau candidat à la liste
  const addNewCandidate = (candidate: Candidate) => {
    // On ajoute le nouveau candidat à la liste en conservant les anciens candidats
    setCandidates((prev: Candidate[]) => [...prev, candidate]);
  };

  // Fonction pour mettre à jour un candidat existant
  const updateExistingCandidate = (updated: Candidate) => {
    // On met à jour l'état des candidats, en remplaçant le candidat avec le même ID
    setCandidates((prev: Candidate[]) =>
      prev.map((c: Candidate) => (c.id === updated.id ? updated : c))
    );
  };

  // Fonction pour supprimer un candidat
  const deleteExistingCandidate = (id: number) => {
    // On filtre les candidats pour supprimer celui avec l'ID correspondant
    setCandidates((prev: Candidate[]) => prev.filter((c: Candidate) => c.id !== id));
  };

  // Fonction pour mettre à jour le statut d'un candidat
  const updateCandidateStatusLocally = (id: number, status: string) => {
    // On met à jour le statut du candidat localement dans la liste des candidats
    setCandidates((prev: Candidate[]) =>
      prev.map((c: Candidate) =>
        c.id === id ? { ...c, status } : c // On met à jour uniquement le candidat dont l'ID correspond
      )
    );
  };

  // Hook useEffect pour charger les candidats au moment où le composant est monté
  useEffect(() => {
    // Appel à la fonction fetchCandidates pour récupérer les données lors du premier rendu
    fetchCandidates();
  }, []); // Le tableau vide [] signifie que cet effet ne se déclenche qu'une seule fois, au montage du composant

  // Retour des valeurs du hook pour être utilisées dans le composant qui l'appelle
  return {
    candidates, // Liste des candidats
    loading, // Indicateur de chargement
    error, // Message d'erreur si une erreur est survenue
    addNewCandidate, // Fonction pour ajouter un nouveau candidat
    updateExistingCandidate, // Fonction pour mettre à jour un candidat existant
    deleteExistingCandidate, // Fonction pour supprimer un candidat
    updateCandidateStatusLocally, // Fonction pour mettre à jour le statut d'un candidat
  };
}
