import type { NextConfig } from 'next';
import i18nConfig from './next-i18next.config.js';

const config: NextConfig = {
  reactStrictMode: true,
  i18n: {
    ...i18nConfig.i18n,
    localeDetection: false as false, 
  },
};

export default config;
