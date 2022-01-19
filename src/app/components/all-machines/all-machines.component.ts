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
  message: String = ''


  constructor(private restService: RestService, private router: Router) {
  }



  ngOnInit(): void {
    this.getMachines(Number(localStorage.getItem('userId')));
  }

  getMachines(id: number) {
    this.restService.getMachines(id).subscribe(response => {
      this.data = response;
    })
  }

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


  startMachine(id: number){
      this.restService.startMachine(id).subscribe((response) => {
        setTimeout(() => {
          this.ngOnInit()
        }, 100);
        setTimeout(() => {
          this.ngOnInit()
        }, 12000);
      },(error)=>{
        this.message = 'This machine is currently being used'
      })
    }

  stopMachine(id: number){
    this.restService.stopMachine(id).subscribe((response) => {
      setTimeout(() => {
        this.ngOnInit()
      }, 100);
      setTimeout(() => {
        this.ngOnInit()
      }, 12000);
    },(error)=>{
      this.message = 'This machine is currently being used'
    })
  }

  restartMachine(id: number){
      this.restService.restartMachine(id).subscribe((response) => {
        setTimeout(() => {
          this.ngOnInit()
        }, 100);
        setTimeout(() => {
          this.ngOnInit()
        }, 12000);
      },(error)=>{
        this.message = 'No permission'
      })
    }

}
