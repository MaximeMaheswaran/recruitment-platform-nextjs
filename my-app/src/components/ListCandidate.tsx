'use client';

import React, { useEffect, useState } from 'react';
import { Flex, message, Table, Tag, Button, Popconfirm } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';  // Importer i18next pour la gestion de la traduction

// Type pour les candidats
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

// Fonction pour générer les colonnes avec traduction
export function columns(handleDelete: (id: number) => void, t: any) {
  // Fonction pour déterminer la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepter':
        return 'green';
      case 'Refuser':
        return 'red';
      case 'En attente':
        return 'orange';
      default:
        return 'blue';  // Default color for undefined status
    }
  };

  return [
    {
      title: t('form.name'),  // Traduction du titre
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: t('form.firstName'),  // Traduction du titre
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('form.position'),  // Traduction du titre
      dataIndex: 'poste',
      key: 'poste',
    },
    {
      title: t('form.status'),  // Traduction du titre
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = getStatusColor(status);
        return <Tag color={color}>{status}</Tag>;  // Affiche un tag coloré selon le statut
      },
    },
    {
      title: t('form.actions'),  // Traduction du titre
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <Flex justify="space-between" align="middle" style={{ width: '200px' }}>
          {/* Lien vers la page d'information détaillée d'un candidat */}
          <Link href={`/rh/infoCandidate/${record.id}`}>
            <Button type="link" style={{ padding: 0 }}>
              {t('buttons.more')}
            </Button>
          </Link>
          {/* Bouton de suppression avec confirmation */}
          <Popconfirm
            title={t('messages.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}  // Appel à la fonction de suppression
            okText={t('buttons.yes')}
            cancelText={t('buttons.no')}
          >
            <Button type="link" danger style={{ padding: 0 }}>
              {t('buttons.delete')}
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
}

export default function ListCandidate() {
  const { t } = useTranslation();  // Hook pour la traduction
  const [candidates, setCandidates] = useState<Candidate[]>([]);  // État pour stocker la liste des candidats
  const [loading, setLoading] = useState<boolean>(false);  // Indicateur de chargement
  const [error, setError] = useState<string | null>(null);  // Gestion des erreurs

  // Récupération des candidats depuis l'API
  const fetchCandidates = async () => {
    try {
      setLoading(true);  // Début du chargement
      setError(null);  // Réinitialisation des erreurs
      const response = await fetch('/api/candidates');  // Appel API pour récupérer les candidats
      if (!response.ok) throw new Error(t('messages.fetchError'));  // Gestion des erreurs API
      const data = await response.json();  // Extraction des données JSON
      setCandidates(data);  // Mise à jour des candidats dans l'état
    } catch (err: any) {
      setError(err.message || t('messages.fetchError'));  // Gestion des erreurs
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  // Suppression d'un candidat
  const deleteCandidate = async (id: number) => {
    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: 'DELETE',  // Méthode DELETE pour supprimer un candidat
      });
      if (!response.ok) throw new Error(t('messages.candidateDeleteError'));
      message.success(t('messages.deleteSuccess'));  // Message de succès
      fetchCandidates();  // Rafraîchit la liste des candidats
    } catch (err: any) {
      message.error(err.message || t('messages.candidateDeleteError'));  // Gestion des erreurs
    }
  };

  // Récupération des candidats au chargement du composant
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <>
      {/* Table des candidats avec colonnes dynamiques et traduction */}
      <Table
        columns={columns(deleteCandidate, t)}  // Passe la fonction de suppression et la traduction
        dataSource={candidates}  // Source de données pour la table
        rowKey="id"  // Clé unique pour chaque ligne
        loading={loading}  // Indicateur de chargement
        style={{ minWidth: 400 }}  // Largeur minimale de la table
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Affichage des erreurs */}
    </>
  );
}
