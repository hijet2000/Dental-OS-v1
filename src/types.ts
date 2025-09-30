export enum Module {
  INVENTORY = 'inventory',
  EQUIPMENT = 'equipment',
  TASKS = 'tasks',
  COMPLIANCE = 'compliance',
  COMPLAINTS = 'complaints',
  LABS = 'labs',
  STAFF = 'staff',
  ROTA = 'rota',
  TIME_OFF = 'timeoff',
  TIMEKEEPING = 'timekeeping',
  NOTIFICATIONS = 'notifications',
  REPORTING = 'reporting',
  AUDIT = 'audit',
  SETTINGS = 'settings',
  AI = 'ai',
}

export enum Plan {
  BASIC = 'Basic',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise',
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

export type PlanModuleMatrix = {
  [key in Plan]: Module[];
};

export type ModuleToggles = {
  [key in Module]?: boolean;
};

export interface AppSettings {
  tenant: {
    name: string;
    plan: Plan;
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
