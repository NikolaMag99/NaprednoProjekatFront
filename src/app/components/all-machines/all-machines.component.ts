import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Machines} from "../../model";
import {RestService} from "../../services/rest.service";
import {take, tap} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-all-machines',
  templateUrl: './all-machines.component.html',
  styleUrls: ['./all-machines.component.css']
})
export class AllMachinesComponent implements OnInit {

  data: Machines[] = [];
  permissions: { [key: string]: boolean } = {};
  readonly START = 'START';
  readonly STOP = 'STOP';
  readonly RESTART = 'RESTART';
  actions!: Observable<Machines>;
  error = null;


  constructor(private restService: RestService, private router: Router) {
  }


  ngOnInit(): void {
    this.restService.getMachines(Number(localStorage.getItem('userId'))).subscribe(response => {
      this.data = response;
    })
    // this.getMachines(Number(localStorage.getItem('userId')));
  }

  // getMachines(id: number) {
  //   this.restService.getMachines(id).subscribe(response => {
  //     this.data = response;
  //   })
  // }

  getAllMachines() {
    this.restService.getAllMachines().subscribe(response => {
      this.data = response;
    });
  }


  onDelete(id: number) {
    this.restService.deleteMachine(id).subscribe(response => {
      this.ngOnInit()
    });
  }

  onAction(id: number, action: string) {
    switch (action) {
      case this.START:
        this.actions = this.restService.startMachine(id);
        break;
      case this.STOP:
        this.actions = this.restService.stopMachine(id);
        break;
      case this.RESTART:
        this.actions = this.restService.restartMachine(id);
        break;
    }
  }

}
