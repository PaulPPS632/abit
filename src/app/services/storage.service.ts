import { Injectable } from '@angular/core';
import { Habito } from '../models/habito';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'habit';
  constructor() { }
  saveHabits(habits: Habito[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(habits));
  }
  getHabits(): Habito[] {
    const storedHabits = localStorage.getItem(this.STORAGE_KEY);
    return storedHabits ? JSON.parse(storedHabits) : [];
  }
  clearHabits(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
