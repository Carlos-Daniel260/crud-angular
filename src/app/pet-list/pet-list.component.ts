import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetsDetailComponent } from '../pets-detail/pets-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { PetState } from '../state/states/pet.state';
import { DeletePet } from '../state/states/pet.actions';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'species', 'age', 'color', 'actions'];
  pets$: Observable<any> = new Observable<Pet[]>();
  pets: Pet[] = [];
  searchTerm: any;

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pets$ = this.store.select(PetState.getPets);
    this.pets$.subscribe(result => {
      this.pets = result.pets;
    });
  }


  addPet(): void {
    this.dialog.open(PetsDetailComponent, {
      width: '500px',
      data: {}
    });
  }

  editPet(pet: Pet): void {
    this.dialog.open(PetsDetailComponent, {
      width: '500px',
      data: { pet: pet }
    });
  }

  deletePet(pet: Pet): void {
    this.store.dispatch(new DeletePet(pet.id));
  }
}
