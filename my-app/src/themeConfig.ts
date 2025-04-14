import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff', // bleu principal
    colorBgContainer: '#f9f9f9',
    fontSize: 16,
    borderRadius: 16,
    padding: 12,
    colorLink: "#529eef",
  },
  components: {
    Button: {
      colorPrimary: '#1DA57A',
    },
    Input: {
      colorPrimary: '#1DA57A',
    },
  },
};

export default themeConfig;
