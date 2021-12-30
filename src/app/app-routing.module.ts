import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {AllUsersComponent} from "./components/all-users/all-users.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  login: boolean = localStorage.getItem('token') ? false : true
}
