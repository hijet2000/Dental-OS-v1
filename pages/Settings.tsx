import React, { useState } from 'react';
import TenantSettings from './settings/TenantSettings';
import BrandingSettings from './settings/BrandingSettings';
import ModuleSettings from './settings/ModuleSettings';
import LocationSettings from './settings/LocationSettings';
import RoleSettings from './settings/RoleSettings';
import UserSettings from './settings/UserSettings';
import PersistenceSettings from './settings/PersistenceSettings';
import LanguageSettings from './settings/LanguageSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import PwaSettings from './settings/PwaSettings';
import AiSettings from './settings/AiSettings';
import ComplianceSettings from './settings/ComplianceSettings';
import AuditLog from './settings/AuditLog';

const settingsTabs: { [key: string]: React.ComponentType } = {
    'Tenant': TenantSettings,
    'Branding': BrandingSettings,
    'Modules': ModuleSettings,
    'Locations': LocationSettings,
    'Roles': RoleSettings,
    'Users': UserSettings,
    'Backup & Restore': PersistenceSettings,
    'Language': LanguageSettings,
    'Notifications': NotificationSettings,
    'Security': SecuritySettings,
    'PWA': PwaSettings,
    'AI': AiSettings,
    'Compliance': ComplianceSettings,
    'Audit Log': AuditLog,
};

const Settings = () => {
    const [activeTab, setActiveTab] = useState('Tenant');
    const ActiveComponent = settingsTabs[activeTab];

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6">
                <h2 className="text-xl font-bold mb-4">Settings</h2>
                <nav className="space-y-1">
                    {Object.keys(settingsTabs).map(tabName => (
                         <button 
                            key={tabName} 
                            onClick={() => setActiveTab(tabName)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === tabName 
                                ? 'bg-brand-primary text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {tabName}
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1">
                {ActiveComponent && <ActiveComponent />}
            </main>
        </div>
    );
};
export default Settings;