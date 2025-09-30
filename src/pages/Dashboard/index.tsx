import React from 'react';
import { useAppSettings } from '../../contexts/AppSettingsContext';
import { Card } from '../../components/common/Card';

const Dashboard = () => {
  const { settings } = useAppSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Card title={`Welcome to ${settings.tenant.name}`}>
        <p>This is the main dashboard. More widgets and information will be added here soon.</p>
        <p className="mt-2">Your current plan is: <strong>{settings.tenant.plan}</strong>.</p>
      </Card>
    </div>
  );
};

export default Dashboard;
