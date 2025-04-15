'use client';

import React from 'react';
import { Button, Form, Input, Radio, Upload, message, Card, Layout } from 'antd';  // Importation des composants d'Ant Design
import { PlusOutlined } from '@ant-design/icons';  // Icône d'ajout pour le bouton
import { useTranslation } from 'react-i18next';  // Hook pour la gestion de la traduction
import type { RcFile } from 'antd/es/upload/interface';  // Typage pour les fichiers uploadés

// Fonction pour vérifier avant l'upload si le fichier est un PDF
const beforeUpload = (file: RcFile) => {
  const isPDF = file.type === 'application/pdf';  // Vérifie si le fichier est un PDF
  if (!isPDF) {
    message.error('Seuls les fichiers PDF sont autorisés.');  // Message d'erreur si ce n'est pas un PDF
  }
  return isPDF || Upload.LIST_IGNORE;  // Ignore si ce n'est pas un PDF
};

// Fonction pour récupérer la liste des fichiers uploadés
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;  // Récupère la liste des fichiers uploadés
};

export default function FormCandidate() {
  const { t } = useTranslation();  // Récupère la fonction de traduction 't'
  const [form] = Form.useForm();  // Initialise le formulaire d'Ant Design

  // Fonction de soumission du formulaire
  const handleSubmit = async (values: any) => {
    try {
      // Étape 1 : Upload du fichier CV
      const fileObj = values.cv?.[0]?.originFileObj;  // Récupère le fichier du CV depuis le formulaire
      let uploadedFileName = '';

      if (fileObj) {
        // Création d'un FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append('file', fileObj);

        // Envoie du fichier au serveur pour upload
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          message.error(t('form.uploadError'));  // Affiche un message d'erreur si l'upload échoue
          return;
        }

        const uploadData = await uploadResponse.json();
        uploadedFileName = uploadData.fileName;  // Récupère le nom du fichier après upload
      }

      // Si le fichier n'a pas été uploadé, empêcher la soumission
      if (!uploadedFileName && fileObj) {
        message.error(t('form.uploadError'));  // Message d'erreur si l'upload échoue
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
        status: 'Nouveau',  // Statut par défaut
      };

      // Envoi des données du candidat au serveur
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  // Envoie des données en JSON
      });

      if (response.ok) {
        message.success('Candidat enregistré avec succès !');  // Message de succès si l'enregistrement réussit
        form.resetFields();  // Réinitialise le formulaire
      } else {
        message.error('Erreur lors de l’enregistrement du candidat.');  // Message d'erreur si l'enregistrement échoue
      }
    } catch (error) {
      console.error(error);
      message.error('Erreur serveur.');  // Message d'erreur en cas de problème serveur
    }
  };

  return (
    <Layout className="flex items-center justify-center" style={{ marginTop: 100 }}>
      {/* Carte contenant le formulaire */}
      <Card style={{ width: '70%' }}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Champ de nom */}
          <Form.Item
            label={t('form.name')}
            name="lastname"
            rules={[{ required: true, message: t('form.name') }]}  // Règle de validation : le champ est requis
          >
            <Input placeholder={t('form.name')} />
          </Form.Item>
          
          {/* Champ de prénom */}
          <Form.Item
            label={t('form.firstName')}
            name="firstname"
            rules={[{ required: true, message: t('form.firstName') }]}  // Règle de validation : le champ est requis
          >
            <Input placeholder={t('form.firstName')} />
          </Form.Item>

          {/* Champ d'email */}
          <Form.Item
            label={t('form.email')}
            name="email"
            rules={[
              { required: true, message: t('form.email') },
              { type: 'email', message: t('form.email') },  // Validation du format email
            ]}
          >
            <Input placeholder="exemple@domain.com" />
          </Form.Item>

          {/* Champ de téléphone */}
          <Form.Item
            label={t('form.phone')}
            name="phone"
            rules={[{ required: true, message: t('form.phone') }]}  // Règle de validation : le champ est requis
          >
            <Input placeholder="0601020304" />
          </Form.Item>

          {/* Champ de position (stage ou alternance) */}
          <Form.Item
            label={t('form.position')}
            name="position"
            rules={[{ required: true, message: t('form.position') }]}  // Règle de validation : le champ est requis
          >
            <Radio.Group>
              <Radio value={t('form.internship')}>{t('form.internship')}</Radio>
              <Radio value={t('form.apprenticeship')}>{t('form.apprenticeship')}</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Champ pour le fichier CV */}
          <Form.Item
            label={t('form.cv')}
            name="cv"
            valuePropName="fileList"
            getValueFromEvent={normFile}  // Récupère la liste des fichiers uploadés
            rules={[{ required: true, message: t('form.cv') }]}  // Règle de validation : le champ est requis
          >
            <Upload
              name="cv"
              accept="application/pdf"  // Accepte uniquement les fichiers PDF
              beforeUpload={beforeUpload}  // Vérification avant l'upload
              listType="text"  // Affiche une liste de fichiers en texte
              maxCount={1}  // Limite le nombre de fichiers à 1
            >
              <Button icon={<PlusOutlined />}>{t('form.cv')}</Button>
            </Upload>
          </Form.Item>

          {/* Champ pour la description de l'expérience */}
          <Form.Item
            label={t('form.message')}
            name="experienceDescription"
            rules={[{ required: true, message: t('form.message') }]}  // Règle de validation : le champ est requis
          >
            <Input.TextArea
              placeholder={t('form.message')}
              rows={4}
            />
          </Form.Item>

          {/* Bouton de soumission */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('form.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
