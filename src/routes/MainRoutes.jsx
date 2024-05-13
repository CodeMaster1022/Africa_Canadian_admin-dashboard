import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
// import PagesLayout from 'layout/Pages';
// import SimpleLayout from 'layout/Simple';
const Dashboard = Loadable(lazy(() => import('pages/main/dashboard')));
const Group = Loadable(lazy(() => import('pages/main/group')));
// const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
const Users = Loadable(lazy(() => import('pages/main/users')));
const Updates = Loadable(lazy(() => import('pages/main/updates')));
const Logout = Loadable(lazy(() => import('pages/logout')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'groups',
          element: <Group />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'updates',
          element: <Updates />
        },
        {
          path: 'logout',
          element: <Logout />
        }
      ]
    }
  ]
};

export default MainRoutes;
