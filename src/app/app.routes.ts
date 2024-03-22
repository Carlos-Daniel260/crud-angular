import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetsDetailComponent } from './pets-detail/pets-detail.component';

const routes: Routes = [
  { path: '**', redirectTo: 'pets-list', pathMatch: 'full' },
  { path: 'pets', component: PetsDetailComponent },
  { path: 'pets-list', component: PetListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }