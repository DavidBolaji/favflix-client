import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.tsx';
import { ConfigProvider } from 'antd';
import { theme } from './layouts/ui/theme.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <ToastContainer />
      <App />
    </ConfigProvider>
  </Provider>
);
