// src/pages/infoCandidate/[id].tsx
'use client'
import { Card, Input, Layout, Radio, Form, Button } from "antd";
import { GetServerSideProps } from "next";
import { useState } from "react";

// Fonction pour récupérer les données côté serveur
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params;

    // Appel API ou logique pour récupérer les données du candidat par ID
    // Par exemple, tu pourrais faire une requête pour obtenir les informations du candidat
    const candidateData = await fetch(`https://api.example.com/candidates/${id}`)
        .then((res) => res.json())
        .catch((err) => null); // Gérer les erreurs au besoin

    if (!candidateData) {
        return {
            notFound: true, // Retourner une page 404 si le candidat n'est pas trouvé
        };
    }

    // Retourne les données en tant que props pour le composant
    return {
        props: {
            candidateData,
        },
    };
};

export default function InfoCandidate({ candidateData }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Préremplir le formulaire avec les données récupérées
    if (candidateData) {
        form.setFieldsValue(candidateData);
    }

    const handleSubmit = (values) => {
        // Gérer la soumission du formulaire
        console.log(values);
        setLoading(true);
    };

    return (
        <Layout>
            <Card>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={candidateData} // Préremplir les valeurs initiales
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
                        rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}
                    >
                        <Input placeholder="Entrez votre prénom" />
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

                    {/* Message pour le recruteur */}
                    <Form.Item
                        label="Message pour le recruteur"
                        name="experienceDescription"
                        rules={[{ required: true, message: 'Veuillez décrire votre expérience' }]}
                    >
                        <Input.TextArea
                            placeholder="Parlez-moi de vous en quelques mots"
                            rows={4}
                        />
                    </Form.Item>

                    {/* Bouton de soumission */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading} // Affiche le chargement pendant la récupération des données
                        >
                            Soumettre
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    );
}
