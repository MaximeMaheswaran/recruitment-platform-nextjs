'use client';

import React, { useEffect, useState } from "react";
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Typography, message } from "antd";
import ListCandidate from "@/components/ListCandidate";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from 'react-i18next';  // Ajout de l'importation pour la traduction

const { Title } = Typography;

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

interface SessionData {
  id: string;
  firstname: string;
  lastname: string;
}

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [session, setSession] = useState<SessionData | null>(null);
  const router = useRouter();
  const { t } = useTranslation();  // Initialisation de la traduction

  useEffect(() => {
    // Lire le cookie JWT
    const cookie = document.cookie.split('; ').find(row => row.startsWith('recruteur_token='));
    if (!cookie) {
      router.push('/signup');
      return;
    }

    try {
      const token = cookie.split('=')[1];
      const decoded = jwtDecode<any>(token);
      setSession(decoded);
      fetchCandidates(); // Charger les données après vérification du token
    } catch (err) {
      console.error("Token invalide :", err);
      router.push('/signup');
    }
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      if (!response.ok) throw new Error(t('unable_to_fetch_candidates')); // Utilisation de la traduction
      const data = await response.json();
      setCandidates(data);
    } catch (err: any) {
      message.error(err.message || t('loading_error')); // Utilisation de la traduction
    }
  };

  const nbNv = candidates.filter(c => c.status === "Nouveau").length;
  const nbAc = candidates.filter(c => c.status === "Accepter").length;
  const nbAt = candidates.filter(c => c.status === "En attente").length;
  const nbRe = candidates.filter(c => c.status === "Refuser").length;

  return (
    <Row gutter={10}>
      <Col span={19}>
        <Row style={{ marginBottom: "50px" }}>
          <div style={{ display: 'flex', gap: 25, flexWrap: "wrap" }}>
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-blue-200">
                  <CrownOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {nbNv}
                  </Title>
                  <Typography>
                    {t('new_candidates')}  {/* Utilisation de la traduction */}
                  </Typography>
                </div>
              </div>
            </Card>
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-green-200">
                  <CheckOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {nbAc}
                  </Title>
                  <Typography>
                    {t('accepted_candidates')}  {/* Utilisation de la traduction */}
                  </Typography>
                </div>
              </div>
            </Card>
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-orange-200">
                  <ClockCircleOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {nbAt}
                  </Title>
                  <Typography>
                    {t('pending_candidates')}  {/* Utilisation de la traduction */}
                  </Typography>
                </div>
              </div>
            </Card>
            <Card style={{ width: "250px" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="text-2xl flex items-center justify-center rounded-md h-12 w-12 bg-red-200">
                  <CloseOutlined />
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {nbRe}
                  </Title>
                  <Typography>
                    {t('rejected_candidates')}  {/* Utilisation de la traduction */}
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        </Row>
        <ListCandidate />
      </Col>
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
