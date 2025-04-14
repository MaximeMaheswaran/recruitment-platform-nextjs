'use client';

import { Button, Space } from 'antd';
import { useLanguage } from '../language/LanguageProvider';

export default function LanguageSwitcher() {
  const { changeLanguage } = useLanguage();

  return (
    <Space>
      <Button onClick={() => changeLanguage('fr')}>🇫🇷 FR</Button>
      <Button onClick={() => changeLanguage('en')}>🇬🇧 EN</Button>
    </Space>
  );
}
