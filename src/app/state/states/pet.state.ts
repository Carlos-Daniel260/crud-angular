import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Pet } from 'src/app/models/pet.model';
import { AddPet, DeletePet, UpdatePet } from './pet.actions';

export interface PetStateModel {
  pets: Pet[];
}

@State<PetStateModel>({
  name: 'pets',
  defaults: {
    pets: [
        { id: 1, name: 'Max', species: 'Dog', age: 3, color: 'Brown', createdAt: PetState.formatDate(new Date()) },
        { id: 2, name: 'Snowball', species: 'Cat', age: 5, color: 'Gray', createdAt: PetState.formatDate(new Date()) },
        { id: 3, name: 'Paco', species: 'Parrot', age: 2, color: 'White', createdAt: PetState.formatDate(new Date()) },
        { id: 4, name: 'Fluffy', species: 'Rabbit', age: 1, color: 'White', createdAt: PetState.formatDate(new Date()) }
    ]
  }
})
@Injectable()
export class PetState {
    @Action(AddPet)
    addPet(ctx: StateContext<PetStateModel>, action: AddPet) {
      const state = ctx.getState();
      const newPetId = Math.max(...state.pets.map(pet => pet.id), 0) + 1;
      const newPet: Pet = { ...action.pet, id: newPetId, createdAt: PetState.formatDate(new Date()) };
      ctx.setState({
        ...state,
        pets: [...state.pets, newPet]
      });
    }
  
    @Action(UpdatePet)
    updatePet(ctx: StateContext<PetStateModel>, action: UpdatePet) {
      const state = ctx.getState();
      const updatedPets = state.pets.map(pet => {
        if (pet.id === action.pet.id) {
          return { ...action.pet, createdAt: pet.createdAt }; 
        }
        return pet;
      });
      ctx.setState({
        ...state,
        pets: updatedPets
      });
    }
  
    @Action(DeletePet)
    deletePet(ctx: StateContext<PetStateModel>, action: DeletePet) {
      const state = ctx.getState();
      const filteredPets = state.pets.filter(pet => pet.id !== action.id);
      ctx.setState({
        ...state,
        pets: filteredPets
      });
    }
  
    static getPets(state: PetStateModel): Pet[] {
      return state.pets;
    }
  
    private static formatDate(date: Date): string {
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