import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import Orders from './pages/Orders';
import Purchase from './pages/Purchase';

const route = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/orders', element: <Orders /> },
      { path: '/checkout', element: <Purchase /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot',
    element: <Forgot />,
  },
  {
    path: '/reset/:token',
    element: <Reset />,
  },
]);
function App() {
  return <RouterProvider router={route} />;
}

export default App;
