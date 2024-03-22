import { Component, Inject, OnInit } from '@angular/core';
import { Pet } from '../models/pet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AddPet, UpdatePet } from '../state/states/pet.actions';

@Component({
  selector: 'app-pets-detail',
  templateUrl: './pets-detail.component.html',
  styleUrls: ['./pets-detail.component.scss']
})
export class PetsDetailComponent implements OnInit {
  petForm!: FormGroup;
  speciesList: string[] = ['Dog', 'Cat', 'Rabbit', 'Parrot']; 
  colorList: string[] = ['Brown', 'Gray', 'White', 'Green']; 

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<PetsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.petForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      species: ['', Validators.required],
      age: ['', Validators.required],
      color: ['', Validators.required]
    });

    if (this.data) {
      this.petForm.patchValue(this.data.pet);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const formData = this.petForm.value;
      if (formData.id) {
        this.updatePet(formData);
      } else {
        this.addPet(formData);
      }
      this.dialogRef.close(true);
    }
  }

  addPet(formData: Pet): void {
    this.store.dispatch(new AddPet(formData));
  }

  updatePet(formData: Pet): void {
    this.store.dispatch(new UpdatePet(formData));
  }

}
