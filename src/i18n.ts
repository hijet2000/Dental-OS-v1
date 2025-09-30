export type TranslationKeys = {
  // Sidebar
  dashboard: string;
  inventory: string;
  equipment: string;
  tasks: string;
  compliance: string;
  complaints: string;
  labs: string;
  staff: string;
  rota: string;
  timeoff: string;
  timekeeping: string;
  notifications: string;
  reporting: string;
  audit: string;
  settings: string;
  ai: string;

  // Labels
  // FIX: Add 'locations' key to support translation.
  locations: string;
  surgeries: string;
};

const translations: { [key: string]: TranslationKeys } = {
  'en-GB': {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    equipment: 'Equipment',
    tasks: 'Tasks',
    compliance: 'Compliance',
    complaints: 'Complaints',
    labs: 'Labs',
    staff: 'Staff',
    rota: 'Rota',
    timeoff: 'Time-off',
    timekeeping: 'Timekeeping',
    notifications: 'Notifications',
    reporting: 'Reporting',
    audit: 'Audit',
    settings: 'Settings',
    ai: 'AI',
    locations: 'Locations',
    surgeries: 'Surgeries',
  },
  'cy-GB': { // Welsh
    dashboard: 'Dangosfwrdd',
    inventory: 'Rhestr',
    equipment: 'Offer',
    tasks: 'Tasgau',
    compliance: 'Cydymffurfiaeth',
    complaints: 'Cwynion',
    labs: 'Labordai',
    staff: 'Staff',
    rota: 'Rota',
    timeoff: 'Amser i ffwrdd',
    timekeeping: 'Cadw Amser',
    notifications: 'Hysbysiadau',
    reporting: 'Adrodd',
    audit: 'Archwilio',
    settings: 'Gosodiadau',
    ai: 'AI',
    locations: 'Lleoliadau',
    surgeries: 'Meddygfeydd',
  },
  'sn-ZW': { // Shona
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    equipment: 'Equipment',
    tasks: 'Tasks',
    compliance: 'Compliance',
    complaints: 'Complaints',
    labs: 'Labs',
    staff: 'Staff',
    rota: 'Rota',
    timeoff: 'Time-off',
    timekeeping: 'Timekeeping',
    notifications: 'Notifications',
    reporting: 'Reporting',
    audit: 'Audit',
    settings: 'Settings',
    ai: 'AI',
    locations: 'Nzvimbo',
    surgeries: 'Surgeries',
  },
  'nd-ZW': { // Ndebele
    dashboard: 'Ideshibhodi',
    inventory: 'Inventory',
    equipment: 'Equipment',
    tasks: 'Tasks',
    compliance: 'Compliance',
    complaints: 'Complaints',
    labs: 'Labs',
    staff: 'Staff',
    rota: 'Rota',
    timeoff: 'Time-off',
    timekeeping: 'Timekeeping',
    notifications: 'Notifications',
    reporting: 'Reporting',
    audit: 'Audit',
    settings: 'Settings',
    ai: 'AI',
    locations: 'Indawo',
    surgeries: 'Surgeries',
  },
};

export default translations;