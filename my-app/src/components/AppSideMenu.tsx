'use client';

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

export default function AppSide() {
    const { t } = useTranslation();
    const menu = AppSideMenu(t);
    return (
        <Sider
            theme="light"
            style={{
                zIndex: 2,
                position: "fixed",
                top: "64px",
                left: 0,
                borderRight: "1px solid #f1f1f1",
                height: "calc(100vh - 64px)",
            }}
        >
            {menu}
        </Sider>
    );
}

export function AppSideMenu(t: any) {
    const menuItems = [
        {
            label: <Link href="/rh">{t('sidebar.home')}</Link>,
            key: '1', // Assurez-vous que `key` est une chaîne
        },
        {
            type: 'divider', // Correctement spécifié comme 'divider'
            key: 'divider-1',
        },
        {
            label: <Link href="/rh/listCandidate">{t('sidebar.listCandidates')}</Link>,
            key: '2',
        },
        {
            label: <Link href="/rh/newCandidate">{t('sidebar.newCandidates')}</Link>,
            key: '3',
        },
        {
            label: <Link href="/rh/acceptedCandidate">{t('sidebar.acceptedCandidates')}</Link>,
            key: '4',
        },
        {
            label: <Link href="/rh/pendingCandidate">{t('sidebar.pendingCandidates')}</Link>,
            key: '5',
        },
        {
            label: <Link href="/rh/rejectedCandidate">{t('sidebar.rejectedCandidates')}</Link>,
            key: '6',
        },
    ];

    return <Menu mode="inline" items={menuItems as any} />; // Cast du type si nécessaire
}
