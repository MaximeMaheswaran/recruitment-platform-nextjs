'use client';

import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, Tag, Radio, Spin, Flex, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useCandidates } from "@/components/action/UseCanditates";
import { useTranslation } from "react-i18next";  // Importer le hook useTranslation

export default function InfoCandidate() {
  const { id } = useParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const { candidates, updateCandidateStatusLocally } = useCandidates();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const { t } = useTranslation();  // Utiliser le hook pour la traduction

  // Trouve l’index du candidat à partir de l’ID dans l’URL
  useEffect(() => {
    if (id && candidates.length > 0) {
      const index = candidates.findIndex(c => String(c.id) === String(id));
      setCurrentIndex(index);
    }
  }, [id, candidates]);

  const candidate = candidates[currentIndex];

  useEffect(() => {
    if (candidate) {
      form.setFieldsValue(candidate);
    }
  }, [candidate, form]);

  const handleStatusChange = async (status: string) => {
    if (!candidate) return;

    setIsLoading(true);

    try {
      const updatedCandidate = { ...candidate, status };
      const response = await fetch(`/api/candidates/${candidate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCandidate),
      });

      if (response.ok) {
        updateCandidateStatusLocally(candidate.id, status);
        message.success(t('messages.statusUpdated', { status }));  // Traduction du message
      } else {
        message.error(t('messages.updateError'));  // Traduction du message d'erreur
      }

    } catch (error) {
      message.error(t('messages.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepter': return 'green';
      case 'Refuser': return 'red';
      case 'En attente': return 'orange';
      default: return 'blue';
    }
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      router.push(`/rh/infoCandidate/${candidates[nextIndex].id}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      router.push(`/rh/infoCandidate/${candidates[prevIndex].id}`);
    }
  };

  if (currentIndex === -1 || !candidate) {
    return <p style={{ textAlign: "center" }}>{t('messages.candidateNotFound')}</p>;  // Traduction du message
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
          <Spin size="large" />
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
            src={`/uploads/${candidate.cv}`}
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
