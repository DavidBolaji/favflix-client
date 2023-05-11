import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const route = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [{ index: true, path: '/', element: <Home /> }],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
function App() {
  return <RouterProvider router={route} />;
}

export default App;
