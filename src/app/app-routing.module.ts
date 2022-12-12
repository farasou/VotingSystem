import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTS
import { HomeComponent } from './views/home/home.component';
import { TypesComponent } from './views/types/types.component';
import { ManagerComponent } from './views/manager/manager.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'types', component: TypesComponent },
  { path: 'manage', component: ManagerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
