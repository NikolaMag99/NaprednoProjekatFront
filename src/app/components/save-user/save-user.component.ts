import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {

  email: string;
  name: string;
  lastName: string;
  pass: string;

  readPermission: boolean;
  createPermission: boolean;
  updatePermission: boolean;
  deletePermission: boolean;
  canSearchMachines: boolean;
  canStartMachines: boolean;
  canStopMachines: boolean;
  canRestartMachines: boolean;
  canCreateMachines: boolean;
  canDestroyMachines: boolean;

  constructor(private restService: RestService, private router: Router) {
    this.email = "";
    this.name = "";
    this.lastName = "";
    this.pass = "";
    this.readPermission = false;
    this.createPermission = false;
    this.updatePermission = false;
    this.deletePermission = false;
    this.canSearchMachines = false;
    this.canStartMachines = false;
    this.canStopMachines = false;
    this.canRestartMachines = false;
    this.canCreateMachines = false;
    this.canDestroyMachines = false;

  }

  ngOnInit(): void {
  }

  submitData(): void {
    this.restService.createUser(
      this.email, this.pass, this.name, this.lastName, this.readPermission,
      this.createPermission, this.updatePermission, this.deletePermission,
      this.canSearchMachines,
      this.canStartMachines,
      this.canStopMachines,
      this.canRestartMachines,
      this.canCreateMachines,
      this.canDestroyMachines,
    ).subscribe(result => {
      console.log(result);
    });
    this.router.navigate(["/all-machines"])
    window.location.href = 'http://localhost:4200/all-users';
  }
}

