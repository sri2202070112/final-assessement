import { useRoutes, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import Login from '../pages/Auth/Auth';
import Dashboard from '../pages/Dashboard';
import TransactionReport from '../pages/TransactionReport';
import QrDetails from '../pages/QrDetails';
import LanguageUpdate from '../pages/LanguageUpdate';
import CallbackPage from '../pages/Callback/callback';
import ProtectedRoute from './Protectedroutes';


export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <MinimalLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/login" replace />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'redirected',
          element:<CallbackPage/>,
        }
      ]
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'transactions',
          element: <TransactionReport />
        },
        {
          path: 'qr-details',
          element: <QrDetails />
        },
        {
          path: 'language',
          element: <LanguageUpdate />
        }
      ]
    }
  ]);
}
