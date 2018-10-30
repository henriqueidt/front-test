import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { DetailsComponent } from './details/details.component';
import { CharacterComponent } from './character/character.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'character/:id',
    component: CharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
