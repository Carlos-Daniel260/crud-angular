import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { PetState } from './states/pet.state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([PetState])
  ]
})
export class StateModule { }
