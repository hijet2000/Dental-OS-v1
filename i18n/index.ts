// FIX: Populated file with translation data and types.
import { Language } from '../types';

export type TranslationKeys = {
    dashboard: string;
    inventory: string;
    equipment: string;
    tasks: string;
    compliance: string;
    staff: string;
    rota: string;
    timeoff: string;
    timekeeping: string;
    notifications: string;
    reports: string;
    ai: string;
    labs: string;
    settings: string;
    
    // UI Labels
    locations: string;
    surgeries: string;
    radiographyLogbook: string;
    
    // Settings Tabs
    tenant_settings: string;
    branding_settings: string;
    module_settings: string;
    location_settings: string;
    role_settings: string;
    user_settings: string;
    backup_restore_settings: string;
    language_settings: string;
    notification_settings: string;
    security_settings: string;
    pwa_settings: string;
    ai_settings: string;
    compliance_settings: string;
    audit_log: string;
    
    // Roles
    admin: string;
    manager: string;
    dentist: string;
    hygienist: string;
    receptionist: string;
    practiceManager: string;
    complianceLead: string;

    // Compliance Page
    keyPersonnelAndModalities: string;
    rps: string;
    rpaContact: string;
    radiationModalities: string;
    usesIntraOral: string;
    usesCBCT: string;
    usesHandheldXray: string;
    complianceDocuments: string;
    radiationEquipmentRegister: string;
    addNewEquipment: string;
    nextQaDueDate: string;
    qaChecklistTemplates: string;
    addNewTemplate: string;
    frequency: string;
    checklistItems: string;
    requiresPhotoEvidence: string;
    requiresSupervisorVerification: string;
    
    // Notification Rules
    notification_overdue_compliance: string;
    notification_due_soon_compliance: string;
    notification_low_stock: string;
    notification_equipment_service_due: string;
    notification_rota_anomaly: string;
    notification_missed_task_sla: string;
};

const translations: { [key in Language]: TranslationKeys } = {
  [Language.EN_GB]: {
    dashboard: 'Dashboard', inventory: 'Inventory', equipment: 'Equipment', tasks: 'Tasks (QR)',
    compliance: 'Compliance', staff: 'Staff', rota: 'Rota', timeoff: 'Time-off',
    timekeeping: 'Timekeeping', notifications: 'Notifications', reports: 'Reporting', ai: 'AI', labs: 'Labs',
    settings: 'Settings', locations: 'Locations', surgeries: 'Surgeries', radiographyLogbook: 'Radiography Logbook',
    tenant_settings: 'Tenant', branding_settings: 'Branding', module_settings: 'Modules',
    location_settings: 'Locations', role_settings: 'Roles', user_settings: 'Users',
    backup_restore_settings: 'Backup & Restore', language_settings: 'Language', notification_settings: 'Notifications',
    security_settings: 'Security', pwa_settings: 'PWA', ai_settings: 'AI', compliance_settings: 'Compliance', audit_log: 'Audit Log',
    admin: 'Admin', manager: 'Manager', dentist: 'Dentist', hygienist: 'Hygienist',
    receptionist: 'Receptionist', practiceManager: 'Practice Manager', complianceLead: 'Compliance Lead',
    keyPersonnelAndModalities: 'Key Personnel & Modalities', rps: 'Radiation Protection Supervisor (RPS)', rpaContact: 'RPA (Advisor) Contact',
    radiationModalities: 'Radiation Modalities', usesIntraOral: 'Uses Intra-oral X-ray', usesCBCT: 'Uses CBCT Scanner',
    usesHandheldXray: 'Uses Handheld X-ray', complianceDocuments: 'Compliance Documents',
    radiationEquipmentRegister: 'Radiation Equipment Register', addNewEquipment: 'Add New Equipment',
    nextQaDueDate: 'Next QA Due', qaChecklistTemplates: 'QA Checklist Templates', addNewTemplate: 'Add New Template',
    frequency: 'Frequency', checklistItems: 'Checklist Items', requiresPhotoEvidence: 'Requires Photo Evidence',
    requiresSupervisorVerification: 'Requires Supervisor Verification',
    notification_overdue_compliance: 'Overdue Compliance',
    notification_due_soon_compliance: 'Due Soon Compliance (30 days)',
    notification_low_stock: 'Low Stock (below reorder)',
    notification_equipment_service_due: 'Equipment Service Due (30 days)',
    notification_rota_anomaly: 'Rota Anomaly',
    notification_missed_task_sla: 'Missed Task SLA',
  },
  [Language.WELSH]: {
    dashboard: 'Dangosfwrdd', inventory: 'Rhestr', equipment: 'Offer', tasks: 'Tasgau (QR)',
    compliance: 'Cydymffurfiaeth', staff: 'Staff', rota: 'Rota', timeoff: 'Amser i ffwrdd',
    timekeeping: 'Cadw Amser', notifications: 'Hysbysiadau', reports: 'Adrodd', ai: 'AI', labs: 'Labordai',
    settings: 'Gosodiadau', locations: 'Lleoliadau', surgeries: 'Meddygfeydd', radiographyLogbook: 'Llyfr Log Radioograffeg',
    tenant_settings: 'Tenant', branding_settings: 'Brandio', module_settings: 'Modiwlau',
    location_settings: 'Lleoliadau', role_settings: 'Rolau', user_settings: 'Defnyddwyr',
    backup_restore_settings: 'Gwneud Còpi Wrth Gefn ac Adfer', language_settings: 'Iaith', notification_settings: 'Hysbysiadau',
    security_settings: 'Diogelwch', pwa_settings: 'PWA', ai_settings: 'AI', compliance_settings: 'Cydymffurfiaeth', audit_log: 'Log Archwilio',
    admin: 'Gweinyddwr', manager: 'Rheolwr', dentist: 'Deintydd', hygienist: 'Hylenydd',
    receptionist: 'Derbynnydd', practiceManager: 'Rheolwr Practis', complianceLead: 'Arweinydd Cydymffurfiaeth',
    keyPersonnelAndModalities: 'Personél Allweddol a dulliau', rps: 'Goruchwyliwr Diogelu Ymbelydredd (RPS)', rpaContact: 'Cyswllt RPA (Cynghorydd)',
    radiationModalities: 'Dulliau Ymbelydredd', usesIntraOral: 'Defnyddio Pelydr-X Mewn-geneuol', usesCBCT: 'Defnyddio Sganiwr CBCT',
    usesHandheldXray: 'Defnyddio Pelydr-X Llaw', complianceDocuments: 'Dogfennau Cydymffurfio',
    radiationEquipmentRegister: 'Cofrestr Offer Ymbelydredd', addNewEquipment: 'Ychwanegu Offer Newydd',
    nextQaDueDate: 'QA Nesaf yn Ddyledus', qaChecklistTemplates: 'Templedi Rhestr Wirio QA', addNewTemplate: 'Ychwanegu Templed Newydd',
    frequency: 'Amlder', checklistItems: 'Eitemau Rhestr Wirio', requiresPhotoEvidence: 'Angen Tystiolaeth Ffotograffig',
    requiresSupervisorVerification: 'Angen Gwirio gan Oruchwyliwr',
    notification_overdue_compliance: 'Cydymffurfiaeth hwyr',
    notification_due_soon_compliance: 'Cydymffurfiaeth yn ddyledus cyn bo hir (30 diwrnod)',
    notification_low_stock: 'Stoc isel (o dan aildrefnu)',
    notification_equipment_service_due: 'Gwasanaeth Offer yn Dyledus (30 diwrnod)',
    notification_rota_anomaly: 'Anomaledd Rota',
    notification_missed_task_sla: 'SLA Tasg a Fethodd',
  },
  [Language.SHONA]: {
    dashboard: 'Dashboard', inventory: 'Zvekushandisa', equipment: 'Midziyo', tasks: 'Mabasa (QR)',
    compliance: 'Kuteerera', staff: 'Vashandi', rota: 'Rota', timeoff: 'Nguva yekuzorora',
    timekeeping: 'Kuchengeta Nguva', notifications: 'Zviziviso', reports: 'Mishumo', ai: 'AI', labs: 'Marabhoritari',
    settings: 'Zvirongwa', locations: 'Nzvimbo', surgeries: 'Nzvimbo dzekuvhiya', radiographyLogbook: 'Radiography Logbook',
    tenant_settings: 'Tenant', branding_settings: 'Branding', module_settings: 'Modules',
    location_settings: 'Nzvimbo', role_settings: 'Mabasa', user_settings: 'Vashandisi',
    backup_restore_settings: 'Backup & Dzosera', language_settings: 'Mutauro', notification_settings: 'Zviziviso',
    security_settings: 'Chengetedzo', pwa_settings: 'PWA', ai_settings: 'AI', compliance_settings: 'Kuteerera', audit_log: 'Audit Log',
    admin: 'Admin', manager: 'Manager', dentist: 'Chiremba wemazino', hygienist: 'Hygienist',
    receptionist: 'Receptionist', practiceManager: 'Practice Manager', complianceLead: 'Compliance Lead',
    keyPersonnelAndModalities: 'Vashandi Vakakosha & Nzira', rps: 'Radiation Protection Supervisor (RPS)', rpaContact: 'RPA (Chipangamazano) Contact',
    radiationModalities: 'Radiation Modalities', usesIntraOral: 'Inoshandisa Intra-oral X-ray', usesCBCT: 'Inoshandisa CBCT Scanner',
    usesHandheldXray: 'Inoshandisa Handheld X-ray', complianceDocuments: 'Zvinyorwa Zvekuteerera',
    radiationEquipmentRegister: 'Rejista Yemidziyo yeRadiation', addNewEquipment: 'Wedzera Midziyo Mutsva',
    nextQaDueDate: 'QA Inotevera Inofanira', qaChecklistTemplates: 'QA Checklist Templates', addNewTemplate: 'Wedzera Template Itsva',
    frequency: 'Frequency', checklistItems: 'Zvekutarisa', requiresPhotoEvidence: 'Inoda Humbowo Hwemufananidzo',
    requiresSupervisorVerification: 'Inoda Kusimbiswa neMutariri',
    notification_overdue_compliance: 'Kuteerera Kwapera Nguva',
    notification_due_soon_compliance: 'Kuteerera Kwave Pedyo (mazuva makumi matatu)',
    notification_low_stock: 'Stock Idiki (pasi pekurayirazve)',
    notification_equipment_service_due: 'Sevhisi Yemidziyo Yave Nguva (mazuva makumi matatu)',
    notification_rota_anomaly: 'Rota Anomaly',
    notification_missed_task_sla: 'Task SLA Yakapotswa',
  },
  [Language.NDEBELE]: {
    dashboard: 'Ideshibhodi', inventory: 'Impahla', equipment: 'Izinto zokusebenza', tasks: 'Imisebenzi (QR)',
    compliance: 'Ukuhambisana', staff: 'Abasebenzi', rota: 'I-Rota', timeoff: 'Isikhathi sokuphumula',
    timekeeping: 'Ukugcinwa kwesikhathi', notifications: 'Izaziso', reports: 'Imibiko', ai: 'AI', labs: 'Amalebhu',
    settings: 'Izilungiselelo', locations: 'Indawo', surgeries: 'Ukuhlinza', radiographyLogbook: 'Ibhuku le-Radiography',
    tenant_settings: 'Umqashi', branding_settings: 'Uphawu', module_settings: 'Amamojula',
    location_settings: 'Izindawo', role_settings: 'Izindima', user_settings: 'Abasebenzisi',
    backup_restore_settings: 'Isipele Nokubuyisela', language_settings: 'Ulimi', notification_settings: 'Izaziso',
    security_settings: 'Ezokuphepha', pwa_settings: 'PWA', ai_settings: 'AI', compliance_settings: 'Ukuhambisana', audit_log: 'I-Audit Log',
    admin: 'Umlawuli', manager: 'Umphathi', dentist: 'Udokotela wamazinyo', hygienist: 'Ohlanzayo',
    receptionist: 'Owamukelayo', practiceManager: 'Umphathi Wokuzijwayeza', complianceLead: 'Umholi Wokuthobela',
    keyPersonnelAndModalities: 'Abasebenzi Abaqavile & Nezindlela', rps: 'Umphathi Wokuvikelwa Kwemisebe (RPS)', rpaContact: 'Othintana naye we-RPA (Umeluleki)',
    radiationModalities: 'Izindlela Zemisebe', usesIntraOral: 'Isebenzisa i-Intra-oral X-ray', usesCBCT: 'Isebenzisa i-CBCT Scanner',
    usesHandheldXray: 'Isebenzisa i-Handheld X-ray', complianceDocuments: 'Amadokhumenti Okuthobela',
    radiationEquipmentRegister: 'Irejista Yezinto Zokusebenza Zemisebe', addNewEquipment: 'Faka Izinto Ezintsha',
    nextQaDueDate: 'I-QA Elandelayo Ifunek', qaChecklistTemplates: 'Izifanekiso Zohlu Lokuhlola lwe-QA', addNewTemplate: 'Faka Isifanekiso Esisha',
    frequency: 'Imvamisa', checklistItems: 'Izinto Zohlu Lokuhlola', requiresPhotoEvidence: 'Kudinga Ubufakazi Bezithombe',
    requiresSupervisorVerification: 'Kudinga Ukuqinisekiswa Komphathi',
    notification_overdue_compliance: 'Ukuthobela Okudlulwe Isikhathi',
    notification_due_soon_compliance: 'Ukuthobela Okuzofika Maduze (izinsuku ezingu-30)',
    notification_low_stock: 'Isitoko Esiphansi (ngaphansi koku-oda kabusha)',
    notification_equipment_service_due: 'Isevisi Yezinto Zokusebenza Ifunekile (izinsuku ezingu-30)',
    notification_rota_anomaly: 'I-Rota Anomaly',
    notification_missed_task_sla: 'I-SLA Yomsebenzi Ephuthelwe',
  },
};

export default translations;