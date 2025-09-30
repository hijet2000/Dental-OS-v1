// FIX: Populated file with necessary constants.
// FIX: Imported TranslationKeys from ../i18n instead of ../types to resolve a module export error.
import { AppSettings, Plan, Module, Role, PermissionAction, PersistenceMode, Language, FontSize, ComplianceDocumentStatus, QaFrequency } from '../types';
import { TranslationKeys } from '../i18n';
import { generateId } from '../utils/helpers';

export const APP_NAME = 'DentalOS';

const today = new Date();
const getDueDate = (months: number) => new Date(today.getFullYear(), today.getMonth() + months, today.getDate()).toISOString();
const getDueDateDays = (days: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + days).toISOString();

// User IDs for seeding
const USER_RUWA_ID = 'user-ruwa';
const USER_CHERIE_ID = 'user-cherie';
const USER_ELLIE_ID = 'user-ellie';
const USER_SAM_ID = 'user-sam';
const USER_JOY_ID = 'user-joy';
const USER_AVA_ID = 'user-ava';
const USER_DYLAN_ID = 'user-dylan';
const USER_OPS_ID = 'user-ops';


export const DEFAULT_SETTINGS: AppSettings = {
  tenant: {
    name: 'Ogmore Valley Family Dental',
    plan: Plan.ENTERPRISE,
    subscription: {
        staffCount: 8,
        locations: 3,
        storageUsedMb: 256,
    }
  },
  branding: {
    displayName: 'Ogmore Valley Family Dental',
    logoUrl: null, // Placeholder: "OVFD Logo"
    faviconUrl: null, // Placeholder: "OVFD Favicon"
    colors: {
      primary: '#B38F00',
      secondary: '#0A3D91',
      accent: '#FFFFFF',
      background: '#F7F9FC',
      text: '#1F2937',
    },
    whiteLabel: true,
  },
  planModuleMatrix: {
    [Plan.BASIC]: [Module.INVENTORY, Module.EQUIPMENT, Module.TASKS, Module.TIMEKEEPING],
    [Plan.PRO]: [
      Module.INVENTORY, Module.EQUIPMENT, Module.TASKS, Module.TIMEKEEPING,
      Module.COMPLIANCE, Module.STAFF, Module.ROTA, Module.TIME_OFF,
      Module.NOTIFICATIONS, Module.REPORTS,
    ],
    [Plan.ENTERPRISE]: Object.values(Module),
  },
  moduleToggles: {
      [Module.LABS]: false,
      [Module.AI]: true,
  },
  locations: [
    { 
        id: 'loc-ogmore', 
        name: 'Ogmore Valley (Main)', 
        isDefault: true, 
        rooms: [
            { id: 'room-ogmore-recep', name: 'Reception', surgeries: [] },
            { id: 'room-ogmore-decon', name: 'Decon/STERI', surgeries: [] },
            { id: 'room-ogmore-staff', name: 'Staff Room', surgeries: [] },
            { id: 'room-ogmore-store', name: 'Store', surgeries: [] },
            { id: 'room-ogmore-plant', name: 'Plant', surgeries: [] },
            { id: 'room-ogmore-s1', name: 'Surgery 1', surgeries: [{ id: 'surg-s1', name: 'S1' }] },
            { id: 'room-ogmore-s2', name: 'Surgery 2', surgeries: [{ id: 'surg-s2', name: 'S2' }] },
            { id: 'room-ogmore-s3', name: 'Surgery 3', surgeries: [{ id: 'surg-s3', name: 'S3' }] },
        ] 
    },
    {
        id: 'loc-bridgend',
        name: 'Bridgend (Satellite)',
        isDefault: false,
        rooms: [
            { id: 'room-bridge-recep', name: 'Reception', surgeries: [] },
            { id: 'room-bridge-decon', name: 'Decon/STERI', surgeries: [] },
            { id: 'room-bridge-store', name: 'Store', surgeries: [] },
            { id: 'room-bridge-b1', name: 'Surgery B1', surgeries: [{ id: 'surg-b1', name: 'B1' }] },
            { id: 'room-bridge-b2', name: 'Surgery B2', surgeries: [{ id: 'surg-b2', name: 'B2' }] },
        ]
    },
    {
        id: 'loc-mobile',
        name: 'Mobile/Community Clinic',
        isDefault: false,
        rooms: [
            { id: 'room-mobile-prep', name: 'Mobile Prep', surgeries: [] },
            { id: 'room-mobile-store', name: 'Storage', surgeries: [] },
            { id: 'room-mobile-m1', name: 'Surgery M1', surgeries: [{ id: 'surg-m1', name: 'M1' }] },
        ]
    }
  ],
  roles: Object.values(Role),
  users: [
    { id: USER_RUWA_ID, name: 'Dr. Ruwa Kadenhe Manjoro', roles: [Role.ADMIN, Role.COMPLIANCE_LEAD], locationIds: ['loc-ogmore', 'loc-bridgend', 'loc-mobile'], pin: '1045', twoFactorEnabled: true },
    { id: USER_CHERIE_ID, name: 'Cherie Walker', roles: [Role.PRACTICE_MANAGER], locationIds: ['loc-ogmore', 'loc-bridgend'], pin: '2233', twoFactorEnabled: false },
    { id: USER_ELLIE_ID, name: 'Ellie (FD)', roles: [Role.DENTIST], locationIds: ['loc-ogmore'], pin: '1717', twoFactorEnabled: false },
    { id: USER_SAM_ID, name: 'Sam H.', roles: [Role.HYGIENIST], locationIds: ['loc-ogmore', 'loc-bridgend'], pin: '5566', twoFactorEnabled: false },
    { id: USER_JOY_ID, name: 'Joy L.', roles: [Role.HYGIENIST], locationIds: ['loc-ogmore'], pin: '7788', twoFactorEnabled: false },
    { id: USER_AVA_ID, name: 'Ava R.', roles: [Role.RECEPTIONIST], locationIds: ['loc-ogmore'], pin: '9090', twoFactorEnabled: false },
    { id: USER_DYLAN_ID, name: 'Dylan P.', roles: [Role.RECEPTIONIST], locationIds: ['loc-bridgend'], pin: '8181', twoFactorEnabled: false },
    { id: USER_OPS_ID, name: 'Ops Manager (Vacant)', roles: [Role.MANAGER], locationIds: [], pin: '0000', twoFactorEnabled: false },
  ],
  permissionMatrix: {
    [Role.ADMIN]: Object.fromEntries(Object.values(Module).map(m => [m, Object.fromEntries(Object.values(PermissionAction).map(p => [p, true]))])) as any,
    [Role.MANAGER]: Object.fromEntries(Object.values(Module).map(m => [m, Object.fromEntries(Object.values(PermissionAction).map(p => [p, true]))])) as any,
    [Role.PRACTICE_MANAGER]: {
        ...Object.fromEntries([Module.STAFF, Module.ROTA, Module.TIME_OFF, Module.COMPLIANCE].map(m => [m, { view: true, create: true, edit: true }])),
        [Module.REPORTS]: { view: true, export: true },
    },
    [Role.COMPLIANCE_LEAD]: {
        [Module.COMPLIANCE]: { view: true, create: true, edit: true, verify: true },
        [Module.EQUIPMENT]: { view: true, edit: true },
        [Module.REPORTS]: { view: true },
    },
    [Role.DENTIST]: {
        [Module.TIMEKEEPING]: { view: true, create: true, edit: true },
        [Module.TIME_OFF]: { view: true, create: true },
        [Module.TASKS]: { view: true, edit: true, verify: true },
    },
    [Role.HYGIENIST]: {
        [Module.TIMEKEEPING]: { view: true, create: true, edit: true },
        [Module.TIME_OFF]: { view: true, create: true },
        [Module.TASKS]: { view: true, edit: true },
    },
    [Role.RECEPTIONIST]: {
        [Module.ROTA]: { view: true },
        [Module.TASKS]: { view: true, create: true },
    }
  },
  persistence: {
    mode: PersistenceMode.INDEXED_DB,
    schemaVersion: 1,
    storageSizeMb: 0,
  },
  localization: {
    language: Language.EN_GB,
    fontSize: FontSize.MEDIUM,
    highContrastMode: false,
    keyboardNavigation: true,
  },
  notifications: {
      channels: { inApp: true, email: true, sms: false },
      rules: [
          {
              id: 'rule-comp-overdue',
              nameKey: 'notification_overdue_compliance',
              trigger: 'compliance_overdue',
              enabled: true,
              channels: { inApp: true, email: true, sms: false },
              recipientRoles: [Role.COMPLIANCE_LEAD, Role.PRACTICE_MANAGER],
          },
          {
              id: 'rule-comp-due-soon',
              nameKey: 'notification_due_soon_compliance',
              trigger: 'compliance_due_soon',
              enabled: true,
              channels: { inApp: true, email: false, sms: false },
              recipientRoles: [Role.COMPLIANCE_LEAD, Role.PRACTICE_MANAGER],
              thresholdDays: 30,
          },
          {
              id: 'rule-stock-low',
              nameKey: 'notification_low_stock',
              trigger: 'stock_low',
              enabled: true,
              channels: { inApp: true, email: false, sms: false },
              recipientRoles: [Role.PRACTICE_MANAGER, Role.RECEPTIONIST],
          },
          {
              id: 'rule-equip-due',
              nameKey: 'notification_equipment_service_due',
              trigger: 'equipment_service_due',
              enabled: true,
              channels: { inApp: true, email: false, sms: false },
              recipientRoles: [Role.COMPLIANCE_LEAD],
              thresholdDays: 30,
          },
          {
              id: 'rule-rota-anomaly',
              nameKey: 'notification_rota_anomaly',
              trigger: 'rota_anomaly',
              enabled: true,
              channels: { inApp: true, email: false, sms: false },
              recipientRoles: [Role.PRACTICE_MANAGER],
          },
          {
              id: 'rule-task-sla',
              nameKey: 'notification_missed_task_sla',
              trigger: 'task_sla_missed',
              enabled: true,
              channels: { inApp: true, email: true, sms: false },
              recipientRoles: [Role.MANAGER],
          }
      ],
      quietHours: { start: '21:00', end: '06:00' }
  },
  security: {
      ipAllowlist: [],
      sessionTimeout: 30,
  },
  pwa: {
      appVersion: 'ovfd-ops-1.0.0',
      schemaVersion: '1.0.0',
      buildTime: new Date().toISOString(),
      showUpdateBanner: false,
  },
  ai: {
      enabled: true,
      proxyEndpoint: '/api/ai',
      rateLimitUser: 100,
      rateLimitTenant: 1000,
  },
  compliance: {
    documents: [
        { id: generateId(), name: 'IR(M)ER Local Rules (Radiography)', ownerId: USER_RUWA_ID, reviewCycleMonths: 12, dueDate: getDueDate(12), status: ComplianceDocumentStatus.COMPLIANT, evidence: 'Signed Local Rules PDF' },
        { id: generateId(), name: 'Radiation Risk Assessment', ownerId: USER_RUWA_ID, reviewCycleMonths: 24, dueDate: getDueDateDays(30), status: ComplianceDocumentStatus.DUE_SOON, evidence: 'Risk Assessment v1.2.docx' },
        { id: generateId(), name: 'Equipment QA & Acceptance Tests', ownerId: USER_RUWA_ID, reviewCycleMonths: 12, dueDate: getDueDate(12), status: ComplianceDocumentStatus.COMPLIANT, evidence: 'QA Logbook Scans' },
        { id: generateId(), name: "IRR17 Employer's Procedures", ownerId: USER_CHERIE_ID, reviewCycleMonths: 12, dueDate: getDueDateDays(-1), status: ComplianceDocumentStatus.OVERDUE, evidence: 'Procedures v2.0.pdf' },
        { id: generateId(), name: 'Fire Safety & Evacuation Plan', ownerId: USER_CHERIE_ID, reviewCycleMonths: 12, dueDate: getDueDate(11), status: ComplianceDocumentStatus.COMPLIANT, evidence: 'FS Plan 2024.pdf' },
    ],
    rpsUserId: USER_RUWA_ID,
    rpaContact: 'RPA: [Name/Organisation], Tel: [number], Email: [email]',
    radiationModalities: {
        usesIntraOral: true,
        usesCBCT: false,
        usesHandheldXray: false,
    },
    radiationEquipment: [
        { id: generateId(), name: 'Intra-oral X-ray Unit #1', location: 'Ogmore S1', nextQaDueDate: getDueDate(11) },
        { id: generateId(), name: 'Intra-oral X-ray Unit #2', location: 'Bridgend B1', nextQaDueDate: getDueDate(6) },
    ],
    qaChecklistTemplates: [
        { id: generateId(), name: 'Daily X-ray Room Check', frequency: QaFrequency.DAILY, items: ['Room signage present', 'Exposure log updated', 'Door/indicator functioning'], requiresPhotoEvidence: true, requiresSupervisorVerification: true },
        { id: generateId(), name: 'Weekly Digital Plate Sensor Check', frequency: QaFrequency.WEEKLY, items: ['Inspect plate for scratches', 'Run test exposure', 'Check image quality'], requiresPhotoEvidence: false, requiresSupervisorVerification: true },
        { id: generateId(), name: 'Monthly Rectangular Collimation & Beam-aiming Test', frequency: QaFrequency.MONTHLY, items: ['Align beam with test tool', 'Confirm collimation on image', 'Record findings'], requiresPhotoEvidence: true, requiresSupervisorVerification: true },
    ]
  }
};

export const ROUTES = {
    DASHBOARD: '/',
    LOGIN: '/login',
    SETTINGS: '/settings',
    ...Object.fromEntries(Object.values(Module).map(m => [m.toUpperCase(), `/${m}`]))
};

// Add explicit type for nameKey
export const MODULE_CONFIG: { [key in Module]: { path: string; icon: string; nameKey: keyof TranslationKeys } } = {
    [Module.DASHBOARD]: { path: '/', icon: '🏠', nameKey: 'dashboard' },
    [Module.INVENTORY]: { path: '/inventory', icon: '📦', nameKey: 'inventory' },
    [Module.EQUIPMENT]: { path: '/equipment', icon: '📠', nameKey: 'equipment' },
    [Module.TASKS]: { path: '/tasks', icon: '✅', nameKey: 'tasks' },
    [Module.COMPLIANCE]: { path: '/compliance', icon: '🛡️', nameKey: 'compliance' },
    [Module.STAFF]: { path: '/staff', icon: '👥', nameKey: 'staff' },
    [Module.ROTA]: { path: '/rota', icon: '🗓️', nameKey: 'rota' },
    [Module.TIME_OFF]: { path: '/timeoff', icon: '✈️', nameKey: 'timeoff' },
    [Module.TIMEKEEPING]: { path: '/timekeeping', icon: '⏱️', nameKey: 'timekeeping' },
    [Module.NOTIFICATIONS]: { path: '/notifications', icon: '🔔', nameKey: 'notifications' },
    [Module.REPORTS]: { path: '/reports', icon: '📊', nameKey: 'reports' },
    [Module.AI]: { path: '/ai', icon: '🤖', nameKey: 'ai' },
    [Module.LABS]: { path: '/labs', icon: '🔬', nameKey: 'labs' },
};