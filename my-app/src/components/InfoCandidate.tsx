'use client';

import { Card, Input, Layout, Radio, Form, Flex } from "antd";
import { useParams } from "next/navigation";
import { dataa } from "@/components/ListCandidate";
import { useEffect } from "react";

export default function InfoCandidate() {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const [form] = Form.useForm();

  const candidate = dataa().find((c) => String(c.id) === String(id));

  useEffect(() => {
    if (candidate) {
      form.setFieldsValue(candidate);
    }
  }, [candidate, form]);

  if (!candidate) {
    return <p style={{ textAlign: "center" }}>Candidat non trouvé</p>;
  }

  return (
    <Flex wrap gap={16} className=" justify-between">
      <Card title="Informations du candidat" style={{width:"49%", minWidth:"300px"}}>
        <Form layout="vertical" form={form}>
          <Form.Item label="Nom" name="lastname">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Prénom" name="name">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Téléphone" name="tel">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Poste à pourvoir" name="poste">
            <Radio.Group disabled>
              <Radio value="Stage">Stage</Radio>
              <Radio value="Alternance">Alternance</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Message / Expérience" name="message">
            <Input.TextArea disabled rows={4} />
          </Form.Item>
        </Form>
      </Card>
      <Card style={{width:"49%", minWidth:"300px"}}>
        <iframe
            src={`/pdf/cv/${candidate.cv}`}
            width="100%"
            height="640px"
            style={{ border: "none" }}
            />
      </Card>
    </Flex>
  );
}
