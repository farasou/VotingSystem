import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TypesComponent } from './views/types/types.component';
import { ManagerComponent } from './views/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TypesComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
