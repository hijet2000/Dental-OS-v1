import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ModulePlaceholder from './pages/ModulePlaceholder';
import { Module } from './types';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      // Stub routes for all modules
      ...Object.values(Module).map(module => ({
          path: `/${module}`,
          element: <ModulePlaceholder key={module} module={module}/>
      }))
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
