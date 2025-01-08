import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// 初始化 i18next
i18next.init({
  interpolation: { escapeValue: false },  // React 已经处理了 XSS
  lng: 'zh',  // 默认语言
  resources: {
    en: { translation: enTranslation },
    zh: { translation: zhTranslation },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
