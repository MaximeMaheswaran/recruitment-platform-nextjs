'use client';

import React, { useEffect, useState } from 'react';
import { Flex, message, Table, Tag, Button, Popconfirm } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // Import i18next

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

  return [
    {
      title: t('form.name'),
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: t('form.firstName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('form.position'),
      dataIndex: 'poste',
      key: 'poste',
    },
    {
      title: t('form.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = getStatusColor(status);
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: t('form.actions'),
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <Flex justify="space-between" align="middle" style={{ width: '200px' }}>
          <Link href={`/rh/infoCandidate/${record.id}`}>
            <Button type="link" style={{ padding: 0 }}>
              {t('buttons.more')}
            </Button>
          </Link>
          <Popconfirm
            title={t('messages.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
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
  const { t } = useTranslation(); // Hook pour la traduction
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/candidates');
      if (!response.ok) throw new Error(t('messages.fetchError'));
      const data = await response.json();
      setCandidates(data);
    } catch (err: any) {
      setError(err.message || t('messages.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(t('messages.candidateDeleteError'));
      message.success(t('messages.deleteSuccess'));
      fetchCandidates();
    } catch (err: any) {
      message.error(err.message || t('messages.candidateDeleteError'));
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <>
      <Table
        columns={columns(deleteCandidate, t)}
        dataSource={candidates}
        rowKey="id"
        loading={loading}
        style={{ minWidth: 400 }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
}
