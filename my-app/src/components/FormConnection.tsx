'use client';

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import useIsMounted from '../components/action/UseMounted';

export default function FormConnection() {
    type FieldType = {
        username?: string;
        password?: string;
    };

    const isMounted = useIsMounted();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFinish = async (values: FieldType) => {
        const { username, password } = values;

        try {
            const response = await axios.post('/api/auth', { username, password });

            if (response.data && response.data.recruteur) {
                setErrorMessage(null); // Réinitialiser les erreurs
                window.location.href = '/rh';
            } else {
                setErrorMessage('Identifiants ou Mot de passe incorrects');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.error || 'Erreur lors de la connexion';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Erreur inconnue');
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (!isMounted) return null;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, width: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    validateStatus={errorMessage ? 'error' : ''}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    validateStatus={errorMessage ? 'error' : ''}
                    help={errorMessage || ''}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
