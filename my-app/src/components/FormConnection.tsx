'use client';

import React, { useState } from 'react';  // Importation de React et du hook useState
import { Form, Input, Button } from 'antd';  // Importation des composants d'Ant Design pour le formulaire
import axios from 'axios';  // Importation de la bibliothèque axios pour faire des requêtes HTTP
import useIsMounted from '../components/action/UseMounted';  // Hook personnalisé pour vérifier si le composant est monté
import { useTranslation } from 'react-i18next';  // Hook pour la gestion de la traduction

export default function FormConnection() {

    type FieldType = {  // Définition du type des champs pour le formulaire
        username?: string;
        password?: string;
    };

    const { t } = useTranslation();  // Récupère la fonction de traduction 't'
    const isMounted = useIsMounted();  // Utilisation du hook personnalisé pour vérifier si le composant est monté
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Gestion des messages d'erreur

    // Fonction appelée lors de la soumission du formulaire
    const onFinish = async (values: FieldType) => {
        const { username, password } = values;  // Récupère les valeurs du formulaire (nom d'utilisateur et mot de passe)

        try {
            // Envoie les données au serveur pour vérifier les identifiants
            const response = await axios.post('/api/auth', { username, password });

            // Si la réponse contient un utilisateur recruteur, redirige vers la page des candidats
            if (response.data && response.data.recruteur) {
                setErrorMessage(null);  // Réinitialise le message d'erreur
                window.location.href = '/rh';  // Redirige l'utilisateur vers la page 'rh'
            } else {
                setErrorMessage('Identifiants ou Mot de passe incorrects');  // Message d'erreur si l'authentification échoue
            }
        } catch (error: unknown) {
            // Gestion des erreurs lors de la requête
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data?.error || 'Erreur lors de la connexion';  // Récupère l'erreur de l'API
                setErrorMessage(errorMsg);  // Affiche le message d'erreur
            } else {
                setErrorMessage('Erreur inconnue');  // Message d'erreur générique si l'erreur n'est pas d'origine Axios
            }
        }
    };

    // Fonction appelée si la soumission échoue (validation des champs)
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);  // Affiche les informations d'erreur dans la console
    };

    // Si le composant n'est pas encore monté, on ne rend rien
    if (!isMounted) return null;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',  // Style de la page de connexion
            }}
        >
            <Form
                name="basic"  // Nom du formulaire
                labelCol={{ span: 8 }}  // Position du label (8 colonnes sur 24)
                wrapperCol={{ span: 16 }}  // Position du champ de saisie (16 colonnes sur 24)
                style={{ maxWidth: 600, width: '100%' }}  // Largeur du formulaire
                initialValues={{ remember: true }}  // Valeurs initiales du formulaire
                onFinish={onFinish}  // Fonction appelée lors de la soumission réussie
                onFinishFailed={onFinishFailed}  // Fonction appelée lors de la soumission échouée
            >
                {/* Champ pour le nom d'utilisateur */}
                <Form.Item<FieldType>
                    label={t("form.username")}  // Utilisation de la traduction pour le label
                    name="username"  // Nom du champ
                    validateStatus={errorMessage ? 'error' : ''}  // Applique un état d'erreur si un message d'erreur est présent
                    rules={[{ required: true, message: 'Please input your username!' }]}  // Validation du champ : requis
                >
                    <Input />  {/* Champ de saisie pour le nom d'utilisateur */}
                </Form.Item>

                {/* Champ pour le mot de passe */}
                <Form.Item<FieldType>
                    label={t("form.password")}  // Utilisation de la traduction pour le label
                    name="password"  // Nom du champ
                    validateStatus={errorMessage ? 'error' : ''}  // Applique un état d'erreur si un message d'erreur est présent
                    help={errorMessage || ''}  // Affiche le message d'erreur sous le champ si présent
                    rules={[{ required: true, message: 'Please input your password!' }]}  // Validation du champ : requis
                >
                    <Input.Password />  {/* Champ de saisie pour le mot de passe */}
                </Form.Item>

                {/* Bouton de soumission */}
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        {t("form.submit")}  {/* Texte du bouton, traduit */}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
