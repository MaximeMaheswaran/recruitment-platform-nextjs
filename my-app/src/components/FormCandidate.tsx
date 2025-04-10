'use client';

import React from 'react';
import { Button, Form, Input, Radio, InputNumber, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';

// Fonction de validation PDF uniquement
const beforeUpload = (file: RcFile) => {
  const isPDF = file.type === 'application/pdf';
  if (!isPDF) {
    message.error('Seuls les fichiers PDF sont autorisés.');
  }
  return isPDF || Upload.LIST_IGNORE;
};

// Normalisation des fichiers pour le formulaire
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function FormCandidate() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form submitted with values: ', values);
    // Tu peux ici envoyer les données à une API via fetch()
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      {/* Nom */}
      <Form.Item
        label="Nom"
        name="lastname"
        rules={[{ required: true, message: 'Veuillez entrer votre nom ' }]}
      >
        <Input placeholder="Entrez votre nom " />
      </Form.Item>

      {/* Prenom */}
      <Form.Item
        label="Prénom"
        name="firstname"
        rules={[{ required: true, message: 'Veuillez entrer votre prenom' }]}
      >
        <Input placeholder="Entrez votre prenom" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Veuillez entrer votre adresse email' },
          { type: 'email', message: 'Veuillez entrer un email valide' },
        ]}
      >
        <Input placeholder="Entrez votre email" />
      </Form.Item>

      {/* Téléphone */}
      <Form.Item
        label="Numéro de Téléphone"
        name="phone"
        rules={[{ required: true, message: 'Veuillez entrer votre numéro de téléphone' }]}
      >
        <Input placeholder="Entrez votre numéro de téléphone" />
      </Form.Item>

      {/* Type de poste */}
      <Form.Item
        label="Poste à pourvoir"
        name="position"
        rules={[{ required: true, message: 'Veuillez sélectionner le poste' }]}
      >
        <Radio.Group>
          <Radio value="Stage">Stage</Radio>
          <Radio value="Alternance">Alternance</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Upload PDF */}
      <Form.Item
        label="CV (PDF uniquement)"
        name="cv"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Veuillez uploader un CV au format PDF' }]}
      >
        <Upload
          name="cv"
          accept="application/pdf"
          beforeUpload={beforeUpload}
          listType="text"
          maxCount={1}
        >
          <Button icon={<PlusOutlined />}>Uploader votre CV (PDF)</Button>
        </Upload>
      </Form.Item>

      {/* Message pour le recruteur */}
      <Form.Item
        label="Message pour le recruteur"
        name="experienceDescription"
        rules={[{ required: true, message: 'Veuillez décrire votre expérience' }]}
      >
        <Input.TextArea
          placeholder="Parler moi de vous en quelques mots"
          rows={4}
        />
      </Form.Item>

      {/* Bouton de soumission */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Soumettre
        </Button>
      </Form.Item>
    </Form>
  );
}
