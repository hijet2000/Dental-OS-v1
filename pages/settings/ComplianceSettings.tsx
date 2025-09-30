// FIX: Created the ComplianceSettings component.
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Toggle } from '../../components/common/Toggle';
import { useTranslations } from '../../hooks/useTranslations';
import { Select } from '../../components/common/Select';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { generateId } from '../../utils/helpers';
import { ComplianceDocument, ComplianceDocumentStatus, QaChecklistTemplate, QaFrequency, RadiationEquipment } from '../../types';

const ComplianceSettings = () => {
  const { settings, setSettings } = useSettings();
  const { compliance, users } = settings;
  const { t } = useTranslations();

  const handleComplianceChange = (field: keyof typeof compliance, value: any) => {
    setSettings(prev => ({
      ...prev,
      compliance: { ...prev.compliance, [field]: value }
    }), `Updated Compliance setting: ${field}`, 'Compliance');
  };

  // --- Documents ---
  const addDocument = () => {
    const newDoc: ComplianceDocument = { id: generateId(), name: 'New Document', ownerId: users[0].id, reviewCycleMonths: 12, dueDate: new Date().toISOString(), status: ComplianceDocumentStatus.COMPLIANT, evidence: ''};
    handleComplianceChange('documents', [...compliance.documents, newDoc]);
  };
  const updateDocument = (index: number, field: keyof ComplianceDocument, value: any) => {
    const newDocs = [...compliance.documents];
    (newDocs[index] as any)[field] = value;
    handleComplianceChange('documents', newDocs);
  };
  const removeDocument = (index: number) => {
    handleComplianceChange('documents', compliance.documents.filter((_, i) => i !== index));
  };

  // --- Equipment ---
  const addEquipment = () => {
    const newEquip: RadiationEquipment = { id: generateId(), name: 'New X-ray Unit', location: 'TBC', nextQaDueDate: new Date().toISOString() };
    handleComplianceChange('radiationEquipment', [...compliance.radiationEquipment, newEquip]);
  };
  const updateEquipment = (index: number, field: keyof RadiationEquipment, value: any) => {
    const newEquips = [...compliance.radiationEquipment];
    (newEquips[index] as any)[field] = value;
    handleComplianceChange('radiationEquipment', newEquips);
  };
  const removeEquipment = (index: number) => {
    handleComplianceChange('radiationEquipment', compliance.radiationEquipment.filter((_, i) => i !== index));
  };
  
  // --- Checklists ---
    const addTemplate = () => {
    const newTemplate: QaChecklistTemplate = { id: generateId(), name: 'New Checklist', frequency: QaFrequency.DAILY, items: ['Check item 1'], requiresPhotoEvidence: false, requiresSupervisorVerification: true };
    handleComplianceChange('qaChecklistTemplates', [...compliance.qaChecklistTemplates, newTemplate]);
  };
    const updateTemplate = (index: number, field: keyof QaChecklistTemplate, value: any) => {
    const newTemplates = [...compliance.qaChecklistTemplates];
    (newTemplates[index] as any)[field] = value;
    handleComplianceChange('qaChecklistTemplates', newTemplates);
  };
    const removeTemplate = (index: number) => {
    handleComplianceChange('qaChecklistTemplates', compliance.qaChecklistTemplates.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <Card title={t('keyPersonnelAndModalities')}>
        <div className="space-y-4">
          <Select
            label={t('rps')}
            value={compliance.rpsUserId || ''}
            onChange={e => handleComplianceChange('rpsUserId', e.target.value)}
          >
            <option value="">-- Select a User --</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
          <Input
            label={t('rpaContact')}
            value={compliance.rpaContact}
            onChange={e => handleComplianceChange('rpaContact', e.target.value)}
          />
          <div>
            <h4 className="font-medium mb-2">{t('radiationModalities')}</h4>
            <div className="space-y-2">
                <Toggle label={t('usesIntraOral')} enabled={compliance.radiationModalities.usesIntraOral} onChange={c => handleComplianceChange('radiationModalities', {...compliance.radiationModalities, usesIntraOral: c})} />
                <Toggle label={t('usesCBCT')} enabled={compliance.radiationModalities.usesCBCT} onChange={c => handleComplianceChange('radiationModalities', {...compliance.radiationModalities, usesCBCT: c})} />
                <Toggle label={t('usesHandheldXray')} enabled={compliance.radiationModalities.usesHandheldXray} onChange={c => handleComplianceChange('radiationModalities', {...compliance.radiationModalities, usesHandheldXray: c})} />
            </div>
          </div>
        </div>
      </Card>
      
      <Card title={t('radiationEquipmentRegister')} footer={<Button onClick={addEquipment}>{t('addNewEquipment')}</Button>}>
        <div className="space-y-2">
            {compliance.radiationEquipment.map((equip, index) => (
                <div key={equip.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center p-2 border rounded dark:border-gray-700">
                    <Input value={equip.name} onChange={e => updateEquipment(index, 'name', e.target.value)} placeholder="Equipment Name"/>
                    <Input value={equip.location} onChange={e => updateEquipment(index, 'location', e.target.value)} placeholder="Location (e.g. Surgery 1)"/>
                    <Input type="date" label={t('nextQaDueDate')} value={equip.nextQaDueDate.split('T')[0]} onChange={e => updateEquipment(index, 'nextQaDueDate', new Date(e.target.value).toISOString())}/>
                    <Button variant="danger" onClick={() => removeEquipment(index)}>Remove</Button>
                </div>
            ))}
        </div>
      </Card>

      <Card title={t('qaChecklistTemplates')} footer={<Button onClick={addTemplate}>{t('addNewTemplate')}</Button>}>
         <div className="space-y-4">
            {compliance.qaChecklistTemplates.map((template, index) => (
                <div key={template.id} className="p-3 border rounded dark:border-gray-700 space-y-3">
                    <div className="flex justify-between items-center">
                        <Input value={template.name} onChange={e => updateTemplate(index, 'name', e.target.value)} className="font-semibold"/>
                        <Button variant="danger" onClick={() => removeTemplate(index)}>Remove</Button>
                    </div>
                     <Select label={t('frequency')} value={template.frequency} onChange={e => updateTemplate(index, 'frequency', e.target.value)}>
                        {Object.values(QaFrequency).map(f => <option key={f} value={f}>{f}</option>)}
                    </Select>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('checklistItems')} (one per line)</label>
                        <textarea 
                            rows={3}
                            value={template.items.join('\n')}
                            onChange={e => updateTemplate(index, 'items', e.target.value.split('\n'))}
                            className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
                        />
                    </div>
                    <Toggle label={t('requiresPhotoEvidence')} enabled={template.requiresPhotoEvidence} onChange={c => updateTemplate(index, 'requiresPhotoEvidence', c)} />
                    <Toggle label={t('requiresSupervisorVerification')} enabled={template.requiresSupervisorVerification} onChange={c => updateTemplate(index, 'requiresSupervisorVerification', c)} />
                </div>
            ))}
        </div>
      </Card>

      <Card title={t('complianceDocuments')} footer={<Button onClick={addDocument}>Add Document</Button>}>
        <div className="space-y-2">
            {compliance.documents.map((doc, index) => (
                <div key={doc.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-2 border rounded dark:border-gray-700">
                    <Input value={doc.name} onChange={e => updateDocument(index, 'name', e.target.value)} />
                    <Select value={doc.ownerId} onChange={e => updateDocument(index, 'ownerId', e.target.value)}>
                         {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </Select>
                    <Select value={doc.status} onChange={e => updateDocument(index, 'status', e.target.value)}>
                         {Object.values(ComplianceDocumentStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    <Input type="date" label="Due Date" value={doc.dueDate.split('T')[0]} onChange={e => updateDocument(index, 'dueDate', new Date(e.target.value).toISOString())}/>
                    <Button variant="danger" onClick={() => removeDocument(index)}>Remove</Button>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default ComplianceSettings;