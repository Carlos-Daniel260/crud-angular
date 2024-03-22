import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pet } from '../models/pet.model';

// Old Version
@Injectable()
export class PetService {
  private pets: Pet[] = [
    { id: 1, name: 'Max', species: 'Dog', age: 3, color: 'Brown', createdAt: this.formatDate(new Date()) },
    { id: 2, name: 'Snowball', species: 'Cat', age: 5, color: 'Gray', createdAt: this.formatDate(new Date()) },
    { id: 3, name: 'Paco', species: 'Parrot', age: 2, color: 'Green', createdAt: this.formatDate(new Date()) },
    { id: 4, name: 'Fluffy', species: 'Rabbit', age: 1, color: 'White', createdAt: this.formatDate(new Date()) },
  ];

  constructor() { }

  getPets(): Observable<Pet[]> {
    return of(this.pets);
  }

  addPet(pet: Pet): Observable<Pet> {
    const newPet: Pet = { ...pet, id: this.getNextId(), createdAt: this.formatDate(new Date()) };
    this.pets.push(newPet);
    return of(newPet);
  }

  getPet(id: number): Observable<Pet | undefined> {
    const pet = this.pets.find(p => p.id === id);
    return of(pet);
  }

  updatePet(updatedPet: Pet): Observable<Pet | undefined> {
    const index = this.pets.findIndex(p => p.id === updatedPet.id);
    if (index !== -1) {
      this.pets[index] = updatedPet;
      return of(updatedPet);
    } else {
      return of(undefined);
    }
  }

  deletePet(id: number): Observable<boolean> {
    const index = this.pets.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pets.splice(index, 1);
      return of(true);
    } else {
      return of(false);
    }
  }

  private getNextId(): number {
    return Math.max(...this.pets.map(p => p.id), 0) + 1;
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}