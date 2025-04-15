// Indique que ce composant s'exécute côté client
'use client';

import React, { useEffect, useState } from "react";

// Icônes d'Ant Design pour illustrer les différentes catégories de candidats
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";

// Composants visuels de la librairie Ant Design
import { Avatar, Card, Col, Row, Typography, message } from "antd";

// Composant pour afficher la liste des candidats
import ListCandidate from "@/components/ListCandidate";

// Hook de navigation côté client de Next.js
import { useRouter } from "next/navigation";

// Pour décoder le JWT stocké dans le cookie
import { jwtDecode } from "jwt-decode";

// Hook pour utiliser les traductions (i18n)
import { useTranslation } from 'react-i18next';

const { Title } = Typography; // Déstructure le composant Title depuis Typography

// Définition de l’interface d’un candidat
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

// Interface décrivant les données contenues dans le JWT
interface SessionData {
  id: string;
  firstname: string;
  lastname: string;
}

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);     // Liste des candidats
  const [session, setSession] = useState<SessionData | null>(null); // Infos de l'utilisateur connecté
  const router = useRouter();                                        // Pour rediriger si pas authentifié
  const { t } = useTranslation();                                    // Hook de traduction

  // Vérifie le token d'authentification au montage du composant
  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
    
    if (!cookie) {
      router.push('/signup'); // Si pas de token, redirection
      return;
    }

    try {
      const token = cookie.split('=')[1];        // Extraction du token
      const decoded = jwtDecode<any>(token);     // Décodage du token JWT
      setSession(decoded);                       // Stocke les données utilisateur
      fetchCandidates();                         // Récupère les candidats
    } catch (err) {
      console.error("Token invalide :", err);    // En cas de problème avec le token
      router.push('/signup');
    }
  }, []);

  // Fonction pour récupérer les candidats via l’API
  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      if (!response.ok) throw new Error(t('unable_to_fetch_candidates')); // Message d'erreur traduit
      const data = await response.json();
      setCandidates(data); // Met à jour la liste des candidats
    } catch (err: any) {
      message.error(err.message || t('loading_error')); // Affiche une erreur via Ant Design
    }
  };

  // Calcul du nombre de candidats selon leur statut
  const nbNv = candidates.filter(c => c.status === "Nouveau").length;
  const nbAc = candidates.filter(c => c.status === "Accepter").length;
  const nbAt = candidates.filter(c => c.status === "En attente").length;
  const nbRe = candidates.filter(c => c.status === "Refuser").length;

  return (
    <Row gutter={10}>
      {/* Colonne principale avec les stats + la liste */}
      <Col span={19}>
        <Row style={{ marginBottom: "50px" }}>
          <div style={{ display: 'flex', gap: 25, flexWrap: "wrap" }}>
            {/* Carte pour les nouveaux candidats */}
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-blue-200">
                  <CrownOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>{nbNv}</Title>
                  <Typography>{t('new_candidates')}</Typography>
                </div>
              </div>
            </Card>

            {/* Carte pour les candidats acceptés */}
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-green-200">
                  <CheckOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>{nbAc}</Title>
                  <Typography>{t('accepted_candidates')}</Typography>
                </div>
              </div>
            </Card>

            {/* Carte pour les candidats en attente */}
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-orange-200">
                  <ClockCircleOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>{nbAt}</Title>
                  <Typography>{t('pending_candidates')}</Typography>
                </div>
              </div>
            </Card>

            {/* Carte pour les candidats refusés */}
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-red-200">
                  <CloseOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>{nbRe}</Title>
                  <Typography>{t('rejected_candidates')}</Typography>
                </div>
              </div>
            </Card>
          </div>
        </Row>

        {/* Liste complète des candidats */}
        <ListCandidate />
      </Col>

      {/* Colonne latérale avec les infos de l'utilisateur */}
      <Col span={5}>
        <Card>
          <div style={{ flexDirection: "column", display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", width: "100%" }}>
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontSize: 20 }}>
              {session?.firstname} {session?.lastname}
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
