'use client';

import React from 'react';
import { Button, Form, Input, Radio, Upload, message, Card, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';

const beforeUpload = (file: RcFile) => {
  const isPDF = file.type === 'application/pdf';
  if (!isPDF) {
    message.error('Seuls les fichiers PDF sont autorisés.');
  }
  return isPDF || Upload.LIST_IGNORE;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function FormCandidate() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // Étape 1 : Upload du fichier CV
      const fileObj = values.cv?.[0]?.originFileObj;
      let uploadedFileName = '';

      if (fileObj) {
        const formData = new FormData();
        formData.append('file', fileObj);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          message.error('Échec de l’upload du fichier.');
          return;
        }

        const uploadData = await uploadResponse.json();
        uploadedFileName = uploadData.fileName;
      }

      // Si le fichier n'a pas été uploadé, empêcher la soumission
      if (!uploadedFileName && fileObj) {
        message.error('Le fichier CV n\'a pas été téléchargé avec succès.');
        return;
      }

      // Étape 2 : Envoi des données du candidat avec le nom du fichier CV
      const payload = {
        name: values.firstname,
        lastname: values.lastname,
        email: values.email,
        tel: values.phone,
        poste: values.position,
        message: values.experienceDescription,
        cv: uploadedFileName,
        status: 'Nouveau',
      };

      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success('Candidat enregistré avec succès !');
        form.resetFields();
      } else {
        message.error('Erreur lors de l’enregistrement du candidat.');
      }
    } catch (error) {
      console.error(error);
      message.error('Erreur serveur.');
    }
  };

  return (
    <Layout className="flex items-center justify-center" style={{ marginTop: 100 }}>
      <Card style={{ width: '70%' }}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Form Fields */}
          <Form.Item
            label="Nom"
            name="lastname"
            rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
          >
            <Input placeholder="Entrez votre nom" />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="firstname"
            rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}
          >
            <Input placeholder="Entrez votre prénom" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Veuillez entrer votre email' },
              { type: 'email', message: 'Email invalide' },
            ]}
          >
            <Input placeholder="exemple@domain.com" />
          </Form.Item>
          <Form.Item
            label="Numéro de téléphone"
            name="phone"
            rules={[{ required: true, message: 'Veuillez entrer votre numéro' }]}
          >
            <Input placeholder="0601020304" />
          </Form.Item>
          <Form.Item
            label="Poste à pourvoir"
            name="position"
            rules={[{ required: true, message: 'Veuillez choisir un poste' }]}
          >
            <Radio.Group>
              <Radio value="Stage">Stage</Radio>
              <Radio value="Alternance">Alternance</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="CV (PDF uniquement)"
            name="cv"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Veuillez envoyer un fichier PDF' }]}
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
          <Form.Item
            label="Message pour le recruteur"
            name="experienceDescription"
            rules={[{ required: true, message: 'Veuillez ajouter un message' }]}
          >
            <Input.TextArea
              placeholder="Décrivez votre motivation, parcours, etc."
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
