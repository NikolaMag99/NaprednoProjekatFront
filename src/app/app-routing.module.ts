import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";
import {SaveUserComponent} from "./components/save-user/save-user.component";
import {AllMachinesComponent} from "./components/all-machines/all-machines.component";
import {CreateMachinesComponent} from "./components/create-machines/create-machines.component";
import {ErrorsComponent} from "./components/errors/errors.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "all-users",
    component: AllUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "save-user",
    component: SaveUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users/:id",
    component: UpdateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "all-machines",
    component: AllMachinesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-machine",
    component: CreateMachinesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "all-errors",
    component: ErrorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  login: boolean = localStorage.getItem('token') ? false : true
}
