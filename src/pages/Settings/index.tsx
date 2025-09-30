import React, { useState } from 'react';
import { Tabs } from '../../components/Tabs';
import TenantAndModuleSettings from './TenantAndModuleSettings';
import BrandingSettings from './BrandingSettings';
import LocationSettings from './LocationSettings';

const TABS = ['Tenant & Modules', 'Branding', 'Locations'];

const Settings = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Tenant & Modules':
        return <TenantAndModuleSettings />;
      case 'Branding':
        return <BrandingSettings />;
      case 'Locations':
        return <LocationSettings />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
