// FIX: Populated file with necessary types and enums.

export enum Module {
    DASHBOARD = 'dashboard',
    INVENTORY = 'inventory',
    EQUIPMENT = 'equipment',
    TASKS = 'tasks',
    COMPLIANCE = 'compliance',
    STAFF = 'staff',
    ROTA = 'rota',
    TIME_OFF = 'timeoff',
    TIMEKEEPING = 'timekeeping',
    NOTIFICATIONS = 'notifications',
    REPORTS = 'reports',
    AI = 'ai',
    LABS = 'labs',
}

export enum Role {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  DENTIST = 'Dentist',
  HYGIENIST = 'Hygienist',
  RECEPTIONIST = 'Receptionist',
  PRACTICE_MANAGER = 'Practice Manager',
  COMPLIANCE_LEAD = 'Compliance Lead',
}

export enum PermissionAction {
  CREATE = 'create',
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete',
  EXPORT = 'export',
  VERIFY = 'verify',
}

export enum Plan {
  BASIC = 'Basic',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise',
}

export enum PersistenceMode {
  INDEXED_DB = 'IndexedDB',
  LOCAL_STORAGE = 'LocalStorage',
  NONE = 'None',
}

export enum Language {
  EN_GB = 'en-GB',
  WELSH = 'cy-GB',
  SHONA = 'sn-ZW',
  NDEBELE = 'nd-ZW',
}

export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface User {
  id: string;
  name: string;
  roles: Role[];
  locationIds: string[];
  pin: string;
  twoFactorEnabled: boolean;
}

export interface Surgery {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  surgeries: Surgery[];
}

export interface Location {
  id: string;
  name: string;
  isDefault: boolean;
  rooms: Room[];
}

export type PermissionMatrix = {
  [key in Role]?: {
    [key in Module]?: {
      [key in PermissionAction]?: boolean;
    };
  };
};

export type PlanModuleMatrix = {
  [key in Plan]: Module[];
};

export type ModuleToggles = {
  [key in Module]?: boolean;
};

export enum ComplianceDocumentStatus {
    COMPLIANT = 'Compliant',
    DUE_SOON = 'Due Soon',
    OVERDUE = 'Overdue',
}

export interface ComplianceDocument {
    id: string;
    name: string;
    ownerId: string; // User ID
    reviewCycleMonths: number;
    dueDate: string; // ISO string
    status: ComplianceDocumentStatus;
    evidence: string; // Placeholder for now
}

export interface RadiationEquipment {
    id: string;
    name: string;
    location: string;
    nextQaDueDate: string; // ISO string
}

export enum QaFrequency {
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
}

export interface QaChecklistTemplate {
    id: string;
    name: string;
    frequency: QaFrequency;
    items: string[];
    requiresPhotoEvidence: boolean;
    requiresSupervisorVerification: boolean;
}

export interface NotificationRule {
    id: string;
    nameKey: keyof import('../i18n').TranslationKeys;
    trigger: string;
    enabled: boolean;
    channels: {
        inApp: boolean;
        email: boolean;
        sms: boolean;
    };
    recipientRoles: Role[];
    thresholdDays?: number;
}

export interface AppSettings {
  tenant: {
    name: string;
    plan: Plan;
    subscription: {
        staffCount: number;
        locations: number;
        storageUsedMb: number;
    }
  };
  branding: {
    displayName: string;
    logoUrl: string | null;
    faviconUrl: string | null;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    whiteLabel: boolean;
  };
  planModuleMatrix: PlanModuleMatrix;
  moduleToggles: ModuleToggles;
  locations: Location[];
  roles: Role[];
  users: User[];
  permissionMatrix: PermissionMatrix;
  persistence: {
    mode: PersistenceMode;
    schemaVersion: number;
    storageSizeMb: number;
  };
  localization: {
    language: Language;
    fontSize: FontSize;
    highContrastMode: boolean;
    keyboardNavigation: boolean;
  };
  notifications: {
      channels: {
          inApp: boolean;
          email: boolean;
          sms: boolean;
      },
      rules: NotificationRule[];
      quietHours: {
          start: string;
          end: string;
      }
  };
  security: {
      ipAllowlist: string[];
      sessionTimeout: number; // in minutes
  };
  pwa: {
      appVersion: string;
      schemaVersion: string;
      buildTime: string;
      showUpdateBanner: boolean;
  };
  ai: {
      enabled: boolean;
      proxyEndpoint: string;
      rateLimitUser: number;
      rateLimitTenant: number;
  };
  compliance: {
    documents: ComplianceDocument[];
    rpsUserId: string | null;
    rpaContact: string;
    radiationModalities: {
        usesIntraOral: boolean;
        usesCBCT: boolean;
        usesHandheldXray: boolean;
    },
    radiationEquipment: RadiationEquipment[];
    qaChecklistTemplates: QaChecklistTemplate[];
  };
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  details: {
    before: Partial<AppSettings>;
    after: Partial<AppSettings>;
  };
}

export interface Snapshot {
  appSettings: AppSettings;
  auditLog: AuditEvent[];
}