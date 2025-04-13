import type { ThemeConfig } from 'antd'

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff', // bleu principal
    colorBgContainer: '#f9f9f9',
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
  },
  components: {
    Button: {
      colorPrimary: '#1DA57A',
    },
    Input: {
      colorPrimary: '#1DA57A',
    },
  },
}

export default themeConfig
