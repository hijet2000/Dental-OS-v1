import { AuditEvent, AppSettings } from '../types';
import { generateId } from '../utils/helpers';

class AuditService {
  private auditLog: AuditEvent[] = [];
  // In a real app, user would come from an auth context
  private currentUser = 'admin@ovfd.co.uk'; 

  public getEvents(): AuditEvent[] {
    return [...this.auditLog].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public log(action: string, entity: string, before: Partial<AppSettings>, after: Partial<AppSettings>): void {
    const event: AuditEvent = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      user: this.currentUser,
      action,
      entity,
      details: { before, after },
    };
    this.auditLog.push(event);
    console.log('Audit Event:', event);
  }
}

export const auditService = new AuditService();
