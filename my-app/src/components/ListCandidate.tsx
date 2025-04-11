'use client';  // Marquer ce fichier comme un composant client

import React from "react";
import { Flex, message, Space, Table, Tag } from "antd";
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
            render: (_: any, record: any) => (
                <Flex wrap justify="space-between">
                    <Link href={`infoCandidate/${record.id}`}>Plus</Link>
                    <Link href="">Supprimer</Link>
                </Flex>
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
            email: "jhon.smith@example.com",
            tel: "0123456789",
            poste: "Alternance",
            message: "Motivé et intéressé par une alternance dans le développement web.",
            cv:"pdf.pdf",
            status: "Nouveau",
        },
        {
            id: 2,
            name: "Alice",
            lastname: "Dupont",
            email: "alice.dupont@example.com",
            tel: "0645783214",
            poste: "Stage",
            message: "Étudiante en informatique, recherche un stage de fin d'études.",
            status: "Accepté",
        },
        {
            id: 3,
            lastname: "Marc",
            name: "Martin",
            email: "marc.martin@example.com",
            tel: "0678952147",
            poste: "Stage",
            message: "Passionné de tech, mais encore débutant.",
            status: "Refusé",
        },
        {
            id: 4,
            lastname: "Sophie",
            name: "Durand",
            email: "sophie.durand@example.com",
            tel: "0612345678",
            poste: "Alternance",
            message: "Recherche une alternance en marketing digital.",
            status: "En Attente",
        },
        {
            id: 5,
            lastname: "Pierre",
            name: "Lemoine",
            email: "pierre.lemoine@example.com",
            tel: "0698451236",
            poste: "Stage",
            message: "Disponible dès maintenant pour un stage de 3 mois.",
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
    return <Table columns={columns()} dataSource={dataa()} rowKey="id" style={{minWidth:400}}/>;
}


