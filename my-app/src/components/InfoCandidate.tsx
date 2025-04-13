'use client';

import React, { useEffect, useState } from "react";
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, Tag, Radio, Spin, Flex, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useCandidates } from "@/components/action/UseCanditates";

export default function InfoCandidate() {
  const { id } = useParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const { candidates, updateCandidateStatusLocally } = useCandidates();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

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
        message.success(`Statut mis à jour à "${status}"`);
      } else {
        message.error('Erreur lors de la mise à jour');
      }

    } catch (error) {
      message.error('Erreur lors de la mise à jour du statut');
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
    return <p style={{ textAlign: "center" }}>Candidat non trouvé</p>;
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
              Informations du candidat <Tag color={getStatusColor(candidate.status)}>{candidate.status}</Tag>
            </span>
          }
          style={{ width: "49%", minWidth: "300px" }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item label="Nom" name="lastname"><Input disabled /></Form.Item>
            <Form.Item label="Prénom" name="name"><Input disabled /></Form.Item>
            <Form.Item label="Email" name="email"><Input disabled /></Form.Item>
            <Form.Item label="Téléphone" name="tel"><Input disabled /></Form.Item>
            <Form.Item label="Poste à pourvoir" name="poste">
              <Radio.Group disabled>
                <Radio value="Stage">Stage</Radio>
                <Radio value="Alternance">Alternance</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Message / Expérience" name="message">
              <Input.TextArea disabled rows={4} />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => handleStatusChange('Accepter')} type="primary">Accepter</Button>
              <Button onClick={() => handleStatusChange('En attente')}>En attente</Button>
              <Button onClick={() => handleStatusChange('Refuser')} danger>Refuser</Button>
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
          Précédent
        </Button>
        <Button icon={<RightOutlined />} onClick={handleNext} disabled={currentIndex === candidates.length - 1} style={{ marginLeft: '20px' }}>
          Suivant
        </Button>
      </div>
    </>
  );
}
