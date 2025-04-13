'use client';

import React, { useEffect, useState } from "react";
import { Flex, message, Table, Tag, Button, Popconfirm } from "antd";
import Link from "next/link";

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

export function columns(handleDelete: (id: number) => void) {
  // Fonction pour déterminer la couleur du Tag en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepter':
        return 'green';
      case 'Refuser':
        return 'red';
      case 'En attente':
        return 'orange';
      default:
        return 'blue';
    }
  };

  // Colonnes de la table
  const columns = [
    {
      title: "Nom",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Prénom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        // Utilisation de la fonction getStatusColor pour déterminer la couleur
        const color = getStatusColor(status);
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Flex justify="space-between" align="middle" style={{ width: "200px" }}>
          <Link href={`/rh/infoCandidate/${record.id}`}>
            <Button type="link" style={{ padding: 0 }}>
              Plus
            </Button>
          </Link>
          {/* Ajouter le Popconfirm autour du bouton Supprimer */}
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ce candidat?"
            onConfirm={() => handleDelete(record.id)}  // Appel de la fonction handleDelete
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger style={{ padding: 0 }}>
              Supprimer
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return columns;
}

export default function ListCandidate() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les candidats depuis l'API
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/candidates");
      if (!response.ok) throw new Error("Impossible de récupérer les candidats");
      const data = await response.json();
      setCandidates(data);
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un candidat
  const deleteCandidate = async (id: number) => {
    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Impossible de supprimer le candidat");
      message.success("Candidat supprimé avec succès");
      fetchCandidates(); // Recharger les candidats après la suppression
    } catch (err: any) {
      message.error(err.message || "Une erreur s'est produite lors de la suppression");
    }
  };

  useEffect(() => {
    fetchCandidates(); // Charger les candidats au montage du composant
  }, []);

  return (
    <>
      <Table
        columns={columns(deleteCandidate)} // Passer la fonction deleteCandidate aux colonnes
        dataSource={candidates}
        rowKey="id"
        loading={loading}
        style={{ minWidth: 400 }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
}
