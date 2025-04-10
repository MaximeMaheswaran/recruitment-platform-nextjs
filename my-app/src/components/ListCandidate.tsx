'use client';  // Marquer ce fichier comme un composant client

import React from "react";
import { Space, Table, Tag } from "antd";
import Link from "next/link";


export function columns() {
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
            // Fonction de rendu du statut
            render: (status: string) => {
                // Détermine la couleur du Tag en fonction du statut
                const color = status === "Accepté" ? "green" : status === "Refusé" ? "red" : status === "En Attente" ? "orange" : "blue";
                return <Tag color={color}>{status}</Tag>;
            }
            ,  // Rendu côté client
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render : (_: any, record: any) => (
                <Space size="large">
                    <Link href={`infoCandidate/${record.id}`}>Plus</Link>
                    <Link href="">Supprimer</Link>
                </Space>
            ),
     },
    ];
return columns
}

export function dataa() {
    // Données pour la table
const data = [
    {
        id: 1,
        lastname: "Jhon",
        name: "Smith",
        poste: "Alternance",
        status: "Nouveau",
    },
    {
        id: 2,
        name: "Alice",
        lastname: "Dupont",
        poste: "Stage",
        status: "Accepté",
    },
    {
        id: 3,
        lastname: "Marc",
        name: "Martin",
        poste: "Stage",
        status: "Refusé",
    },
    {
        id: 4,
        lastname: "Sophie",
        name: "Durand",
        poste: "Alternance",
        status: "En Attente",
    },
    {
        id: 5,
        lastname: "Pierre",
        name: "Lemoine",
        poste: "Stage",
        status: "En Attente",
    },
];

return data;
}


// Définition du composant Listcandidate
export default function ListCandidate() {
// Exemple d'action pour la colonne "Action"
const handleAction = (id: number) => {
    console.log("Action clicked for candidate with ID:", id);
};

// Rendu de la table
return <Table columns={columns()} dataSource={dataa()} rowKey="id"/>;
}


