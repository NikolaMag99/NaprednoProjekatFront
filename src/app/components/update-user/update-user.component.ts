import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  email: string;
  name: string;
  lastName: string;

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


  constructor(private restService: RestService, private _Activatedroute: ActivatedRoute) {
    this.email = "";
    this.name = "";
    this.lastName = "";
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

    let id = this._Activatedroute.snapshot.paramMap.get("id");
    this.loadData(id!);
  }

  ngOnInit(): void {
  }

  loadData(id: string): void {
    this.restService.getUserById(
      id
    ).subscribe(result => {
      this.email = result.email;
      this.name = result.name;
      this.lastName = result.lastName;
      this.readPermission = result.permissions.canRead;
      this.createPermission = result.permissions.canCreate;
      this.updatePermission = result.permissions.canUpdate;
      this.deletePermission = result.permissions.canDelete;
      this.canSearchMachines = result.permissions.canSearchMachines;
      this.canStartMachines = result.permissions.canStartMachines;
      this.canStopMachines = result.permissions.canStopMachines;
      this.canRestartMachines = result.permissions.canRestartMachines;
      this.canCreateMachines = result.permissions.canCreateMachines;
      this.canDestroyMachines = result.permissions.canDestroyMachines;
    })
  }

  submitData(): void {
    this.restService.editUser(
      this.email, this.name, this.lastName, this.readPermission,
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
  }
}
