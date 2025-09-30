import { AppSettings, Plan, Module, Location, Room, Surgery } from './types';
import { generateId } from './utils/helpers';

export const APP_NAME = 'DentalOS';

const createLocation = (
  name: string,
  isDefault: boolean,
  roomsConfig: { name: string; surgeries?: string[] }[]
): Location => ({
  id: generateId(),
  name,
  isDefault,
  rooms: roomsConfig.map(
    (rc): Room => ({
      id: generateId(),
      name: rc.name,
      surgeries: (rc.surgeries || []).map(
        (sName): Surgery => ({
          id: generateId(),
          name: sName,
        })
      ),
    })
  ),
});

export const DEFAULT_SETTINGS: AppSettings = {
  tenant: {
    name: 'Ogmore Valley Family Dental',
    plan: Plan.ENTERPRISE,
  },
  branding: {
    displayName: 'Ogmore Valley Family Dental',
    logoUrl: null,
    faviconUrl: null,
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
    [Plan.BASIC]: [Module.INVENTORY, Module.EQUIPMENT, Module.TASKS, Module.TIMEKEEPING, Module.SETTINGS, Module.AUDIT],
    [Plan.PRO]: [
      Module.INVENTORY, Module.EQUIPMENT, Module.TASKS, Module.TIMEKEEPING, Module.SETTINGS, Module.AUDIT,
      Module.COMPLIANCE, Module.STAFF, Module.ROTA, Module.TIME_OFF, Module.NOTIFICATIONS, Module.REPORTING,
    ],
    [Plan.ENTERPRISE]: [
      Module.INVENTORY, Module.EQUIPMENT, Module.TASKS, Module.TIMEKEEPING, Module.SETTINGS, Module.AUDIT,
      Module.COMPLIANCE, Module.STAFF, Module.ROTA, Module.TIME_OFF, Module.NOTIFICATIONS, Module.REPORTING,
      Module.LABS, Module.AI,
    ],
  },
  moduleToggles: {
    [Module.AI]: true,
    [Module.LABS]: false,
  },
  locations: [
    createLocation('Ogmore Valley (Main)', true, [
      { name: 'Reception' },
      { name: 'Decon/STERI' },
      { name: 'Staff Room' },
      { name: 'Store' },
      { name: 'Plant' },
      { name: 'Surgery 1', surgeries: ['S1'] },
      { name: 'Surgery 2', surgeries: ['S2'] },
      { name: 'Surgery 3', surgeries: ['S3'] },
    ]),
    createLocation('Bridgend (Satellite)', false, [
      { name: 'Reception' },
      { name: 'Decon/STERI' },
      { name: 'Store' },
      { name: 'Surgery B1', surgeries: ['B1'] },
      { name: 'Surgery B2', surgeries: ['B2'] },
    ]),
    createLocation('Mobile/Community Clinic', false, [
      { name: 'Mobile Prep' },
      { name: 'Storage' },
      { name: 'Surgery M1', surgeries: ['M1'] },
    ]),
  ],
};
