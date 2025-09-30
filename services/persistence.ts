import { openDB, IDBPDatabase } from 'idb';
import { Snapshot } from '../types';

const DB_NAME = 'DentalOS';
const DB_VERSION = 1;
const STORE_NAME = 'settings';
const SNAPSHOT_KEY = 'snapshot';

export interface PersistenceStrategy {
  save(snapshot: Snapshot): Promise<void>;
  load(): Promise<Snapshot | null>;
  clear(): Promise<void>;
}

class IndexedDBStrategy implements PersistenceStrategy {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  async save(snapshot: Snapshot): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, snapshot, SNAPSHOT_KEY);
  }

  async load(): Promise<Snapshot | null> {
    const db = await this.dbPromise;
    const snapshot = await db.get(STORE_NAME, SNAPSHOT_KEY);
    return snapshot || null;
  }
  
  async clear(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear(STORE_NAME);
  }
}

class LocalStorageStrategy implements PersistenceStrategy {
  private key = 'dental-os-snapshot';

  async save(snapshot: Snapshot): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(snapshot));
  }

  async load(): Promise<Snapshot | null> {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  async clear(): Promise<void> {
    localStorage.removeItem(this.key);
  }
}

class NoPersistenceStrategy implements PersistenceStrategy {
  async save(_snapshot: Snapshot): Promise<void> {}
  async load(): Promise<Snapshot | null> { return null; }
  async clear(): Promise<void> {}
}

export const persistenceStrategies = {
  indexedDB: new IndexedDBStrategy(),
  localStorage: new LocalStorageStrategy(),
  none: new NoPersistenceStrategy(),
};
