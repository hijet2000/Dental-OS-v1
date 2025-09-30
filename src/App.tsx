import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSettingsProvider, useAppSettings } from './contexts/AppSettingsContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UpdateBanner } from './components/UpdateBanner';

const AppContent = () => {
    const { loading, applyBranding } = useAppSettings();

    useEffect(() => {
        applyBranding();
    }, [applyBranding]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="h-screen flex text-brand-text bg-brand-bg">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                    <Outlet />
                </main>
            </div>
            <UpdateBanner />
        </div>
    );
}


const App = () => {
  return (
    <AppSettingsProvider>
      <AppContent />
    </AppSettingsProvider>
  );
};

export default App;
