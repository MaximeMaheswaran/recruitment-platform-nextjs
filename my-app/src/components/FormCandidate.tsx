'use client';

import React from 'react';
import { Button, Form, Input, Radio, Upload, message, Card, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          message.error(t('form.uploadError'));
          return;
        }

        const uploadData = await uploadResponse.json();
        uploadedFileName = uploadData.fileName;
      }

      // Si le fichier n'a pas été uploadé, empêcher la soumission
      if (!uploadedFileName && fileObj) {
        message.error(t('form.uploadError'));
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
            label={t('form.name')}
            name="lastname"
            rules={[{ required: true, message: t('form.name') }]}
          >
            <Input placeholder={t('form.name')} />
          </Form.Item>
          <Form.Item
            label={t('form.firstName')}
            name="firstname"
            rules={[{ required: true, message: t('form.firstName') }]}
          >
            <Input placeholder={t('form.firstName')} />
          </Form.Item>
          <Form.Item
            label={t('form.email')}
            name="email"
            rules={[
              { required: true, message: t('form.email') },
              { type: 'email', message: t('form.email') },
            ]}
          >
            <Input placeholder="exemple@domain.com" />
          </Form.Item>
          <Form.Item
            label={t('form.phone')}
            name="phone"
            rules={[{ required: true, message: t('form.phone') }]}
          >
            <Input placeholder="0601020304" />
          </Form.Item>
          <Form.Item
            label={t('form.position')}
            name="position"
            rules={[{ required: true, message: t('form.position') }]}
          >
            <Radio.Group>
              <Radio value={t('form.internship')}>{t('form.internship')}</Radio>
              <Radio value={t('form.apprenticeship')}>{t('form.apprenticeship')}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t('form.cv')}
            name="cv"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: t('form.cv') }]}
          >
            <Upload
              name="cv"
              accept="application/pdf"
              beforeUpload={beforeUpload}
              listType="text"
              maxCount={1}
            >
              <Button icon={<PlusOutlined />}>{t('form.cv')}</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={t('form.message')}
            name="experienceDescription"
            rules={[{ required: true, message: t('form.message') }]}
          >
            <Input.TextArea
              placeholder={t('form.message')}
              rows={4}
            />
          </Form.Item>
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
