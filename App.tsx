import React from 'react';
// FIX: Changed quotes on import to fix module resolution error.
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UpdateBanner } from './components/UpdateBanner';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ModulePlaceholder from './pages/ModulePlaceholder';

import { ROUTES, MODULE_CONFIG } from './constants';
import { Module } from './types';

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
          <HashRouter>
            <UpdateBanner />
            <Routes>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />

                {/* Stubbed routes */}
                {/* FIX: Add explicit type to moduleKey to resolve type error. */}
                {Object.values(Module).map((moduleKey: Module) => (
                    <Route 
                        key={moduleKey} 
                        path={MODULE_CONFIG[moduleKey].path} 
                        element={
                            <ProtectedRoute module={moduleKey}>
                                <ModulePlaceholder />
                            </ProtectedRoute>
                        } 
                    />
                ))}

                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </HashRouter>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
