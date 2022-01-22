import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {SaveUserComponent} from './components/save-user/save-user.component';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AllMachinesComponent} from './components/all-machines/all-machines.component';
import {CreateMachinesComponent} from './components/create-machines/create-machines.component';
import {ErrorsComponent} from './components/errors/errors.component';
import {SearchComponent} from './components/all-machines/search/search.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllUsersComponent,
    SaveUserComponent,
    UpdateUserComponent,
    AllMachinesComponent,
    CreateMachinesComponent,
    ErrorsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
