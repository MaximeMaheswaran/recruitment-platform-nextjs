'use client';

import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, Tag, Radio, Spin, Flex, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useCandidates } from "@/components/action/UseCanditates";
import { useTranslation } from "react-i18next";  // Importer le hook useTranslation pour gérer la traduction

export default function InfoCandidate() {
  const { id } = useParams();  // Récupère l'ID du candidat depuis l'URL
  const router = useRouter();  // Utilise le router pour naviguer entre les pages
  const [form] = Form.useForm();  // Crée une instance de formulaire
  const { candidates, updateCandidateStatusLocally } = useCandidates();  // Récupère les données des candidats et la fonction pour mettre à jour leur statut
  const [isLoading, setIsLoading] = useState(false);  // État de chargement pour l'interface
  const [currentIndex, setCurrentIndex] = useState<number>(-1);  // Garde la trace de l'index du candidat actuel
  const { t } = useTranslation();  // Utilisation du hook de traduction

  // Recherche l'index du candidat avec l'ID de l'URL dans la liste des candidats
  useEffect(() => {
    if (id && candidates.length > 0) {
      const index = candidates.findIndex(c => String(c.id) === String(id));  // Recherche de l'index par ID
      setCurrentIndex(index);  // Mise à jour de l'index du candidat actuel
    }
  }, [id, candidates]);  // Réexécute cet effet lorsque l'ID ou la liste des candidats change

  const candidate = candidates[currentIndex];  // Le candidat actuel

  // Lorsque le candidat est trouvé, on met à jour les valeurs du formulaire
  useEffect(() => {
    if (candidate) {
      form.setFieldsValue(candidate);  // Remplissage du formulaire avec les données du candidat
    }
  }, [candidate, form]);  // Réexécute cet effet lorsque les données du candidat changent

  // Fonction pour changer le statut du candidat
  const handleStatusChange = async (status: string) => {
    if (!candidate) return;  // Si aucun candidat n'est sélectionné, on arrête la fonction

    setIsLoading(true);  // Affiche le spinner de chargement

    try {
      const updatedCandidate = { ...candidate, status };  // Met à jour le statut du candidat
      const response = await fetch(`/api/candidates/${candidate.id}`, {  // Envoie la mise à jour au serveur
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCandidate),
      });

      if (response.ok) {
        updateCandidateStatusLocally(candidate.id, status);  // Met à jour le statut localement
        message.success(t('messages.statusUpdated', { status }));  // Affiche un message de succès avec la traduction
      } else {
        message.error(t('messages.updateError'));  // Affiche un message d'erreur si la mise à jour échoue
      }

    } catch (error) {
      message.error(t('messages.updateError'));  // En cas d'erreur de réseau ou autre
    } finally {
      setIsLoading(false);  // Cache le spinner de chargement
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepter': return 'green';  // Si accepté, couleur verte
      case 'Refuser': return 'red';  // Si refusé, couleur rouge
      case 'En attente': return 'orange';  // Si en attente, couleur orange
      default: return 'blue';  // Statut par défaut, couleur bleue
    }
  };

  // Fonction pour passer au candidat suivant
  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);  // Mise à jour de l'index du candidat suivant
      router.push(`/rh/infoCandidate/${candidates[nextIndex].id}`);  // Navigation vers la page du candidat suivant
    }
  };

  // Fonction pour revenir au candidat précédent
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);  // Mise à jour de l'index du candidat précédent
      router.push(`/rh/infoCandidate/${candidates[prevIndex].id}`);  // Navigation vers la page du candidat précédent
    }
  };

  // Si aucun candidat n'est trouvé ou l'index est invalide, on affiche un message
  if (currentIndex === -1 || !candidate) {
    return <p style={{ textAlign: "center" }}>{t('messages.candidateNotFound')}</p>;  // Traduction du message "Candidat non trouvé"
  }

  return (
    <>
      {isLoading && (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
        }}>
          <Spin size="large" />  {/* Affiche un spinner de chargement */}
        </div>
      )}

      <Flex wrap gap={16} className="justify-between">
        <Card
          title={
            <span>
              {t('messages.candidateInfo')} <Tag color={getStatusColor(candidate.status)}>{candidate.status}</Tag>
            </span>
          }
          style={{ width: "49%", minWidth: "300px" }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item label={t("form.name")} name="lastname"><Input disabled /></Form.Item>
            <Form.Item label={t("form.firstname")} name="name"><Input disabled /></Form.Item>
            <Form.Item label={t("form.email")} name="email"><Input disabled /></Form.Item>
            <Form.Item label={t("form.phone")} name="tel"><Input disabled /></Form.Item>
            <Form.Item label={t("form.position")} name="poste">
              <Radio.Group disabled>
                <Radio value="Stage">{t("form.internship")}</Radio>
                <Radio value="Alternance">{t("form.apprenticeship")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label={t("form.message")} name="message">
              <Input.TextArea disabled rows={4} />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => handleStatusChange('Accepter')} type="primary">{t("buttons.accept")}</Button>
              <Button onClick={() => handleStatusChange('En attente')}>{t("buttons.pending")}</Button>
              <Button onClick={() => handleStatusChange('Refuser')} danger>{t("buttons.reject")}</Button>
            </div>
          </Form>
        </Card>

        <Card style={{ width: "49%", minWidth: "300px" }}>
          <iframe
            src={`/uploads/${candidate.cv}`}  // Affiche le CV du candidat dans un iframe
            width="100%"
            height="640px"
            style={{ border: "none" }}
          />
        </Card>
      </Flex>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button icon={<LeftOutlined />} onClick={handlePrev} disabled={currentIndex === 0}>
          {t("buttons.previous")}
        </Button>
        <Button icon={<RightOutlined />} onClick={handleNext} disabled={currentIndex === candidates.length - 1} style={{ marginLeft: '20px' }}>
          {t("buttons.next")}
        </Button>
      </div>
    </>
  );
}
