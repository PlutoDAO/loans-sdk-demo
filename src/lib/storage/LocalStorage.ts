import type IStorage from './IStorage';

export default class LocalStorage implements IStorage {
  storeItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }
}
