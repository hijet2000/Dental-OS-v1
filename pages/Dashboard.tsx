// FIX: Created the Dashboard component.
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { useSettings } from '../contexts/SettingsContext';
import { ComplianceDocumentStatus } from '../types';
import { Toast } from '../components/common/Toast';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { settings } = useSettings();
    const location = useLocation();
    const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'success' }>({ message: '', type: 'info' });
    
    useEffect(() => {
        if (location.state?.message) {
            setToast({ message: location.state.message, type: location.state.type || 'info' });
            // Clear the state from history so the message doesn't reappear on refresh
            window.history.replaceState({}, document.title)
        }
    }, [location.state]);
    
    const overdueDocs = settings.compliance.documents.filter(d => d.status === ComplianceDocumentStatus.OVERDUE);
    const dueSoonDocs = settings.compliance.documents.filter(d => d.status === ComplianceDocumentStatus.DUE_SOON);

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const dueSoonEquip = settings.compliance.radiationEquipment.filter(e => {
        const dueDate = new Date(e.nextQaDueDate);
        return dueDate <= thirtyDaysFromNow && dueDate > new Date();
    });

    return (
        <div>
            {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />}
            <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser?.name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {(overdueDocs.length > 0 || dueSoonDocs.length > 0 || dueSoonEquip.length > 0) && (
                    <Card title="Compliance Alerts" className="border-l-4 border-yellow-500">
                        {overdueDocs.map(doc => (
                            <div key={doc.id} className="p-2 mb-2 bg-red-100 dark:bg-red-900 rounded-md">
                                <p className="font-bold text-red-800 dark:text-red-200">Overdue: {doc.name}</p>
                                <p className="text-sm text-red-600 dark:text-red-300">Was due: {new Date(doc.dueDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                         {dueSoonDocs.map(doc => (
                            <div key={doc.id} className="p-2 mb-2 bg-yellow-100 dark:bg-yellow-900 rounded-md">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">Due Soon: {doc.name}</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-300">Due: {new Date(doc.dueDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {dueSoonEquip.map(equip => (
                            <div key={equip.id} className="p-2 mb-2 bg-yellow-100 dark:bg-yellow-900 rounded-md">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">Equipment QA Due: {equip.name}</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-300">Due: {new Date(equip.nextQaDueDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </Card>
                )}

                <Card title="Your Details">
                    <p><strong>Name:</strong> {currentUser?.name}</p>
                    <p><strong>Roles:</strong> {currentUser?.roles.join(', ')}</p>
                </Card>
                <Card title="Tenant Information">
                    <p><strong>Practice Name:</strong> {settings.tenant.name}</p>
                    <p><strong>Plan:</strong> {settings.tenant.plan}</p>
                </Card>
                 <Card title="Quick Stats">
                    <p><strong>Active Users:</strong> {settings.users.length}</p>
                    <p><strong>Locations:</strong> {settings.locations.length}</p>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;