import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Habito } from '../models/habito';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 
@Injectable({
  providedIn: 'root'
})
export class HabitoService {
  private habitsSubject: BehaviorSubject<Habito[]> = new BehaviorSubject<Habito[]>([]);
  

  constructor(private storageService: StorageService) {
    // Cargar hábitos desde localStorage al inicializar
    const storedHabits = this.storageService.getHabits();
    this.habitsSubject.next(storedHabits);
  }

  /**
   * Obtiene todos los hábitos.
   * @returns Lista de hábitos.
   */
  getHabits(): Observable<Habito[]> {
    return this.habitsSubject.asObservable();
  }

  /**
   * Agrega un nuevo hábito y lo almacena.
   * @param habit Hábito a agregar.
   */
  addHabit(habit: Habito): void {
    const currentHabits = this.habitsSubject.value;
    const newHabit: Habito = {
      ...habit,
      id: uuidv4() // Generar un ID único
    };
    const updatedHabits = [...currentHabits, newHabit];
    this.habitsSubject.next(updatedHabits);
    this.storageService.saveHabits(updatedHabits);
  }

  /**
   * Elimina un hábito de la lista.
   * @param index Índice del hábito a eliminar.
   */
  removeHabit(id: string): void {
    const currentHabits = this.habitsSubject.value;
    const updatedHabits = currentHabits.filter(habit => habit.id !== id);
    this.habitsSubject.next(updatedHabits);
    this.storageService.saveHabits(updatedHabits);
  }
  updateHabit(updatedHabit: Habito): void {
    const currentHabits = this.habitsSubject.value;
    const index = currentHabits.findIndex((habit) => habit.id === updatedHabit.id);
    if(index !== -1){
      currentHabits[index] = updatedHabit;
      this.habitsSubject.next([...currentHabits]);
    this.storageService.saveHabits(currentHabits);
    }
  }
}
