import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Machines} from "../../model";
import {RestService} from "../../services/rest.service";
import {take, tap} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-all-machines',
  templateUrl: './all-machines.component.html',
  styleUrls: ['./all-machines.component.css']
})
export class AllMachinesComponent implements OnInit {

  data: Machines[] = [];
  message: String = ''
  status: string[] = [];
  error: string | undefined;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  searchMachineForm: FormGroup;
  endDate: Date | undefined
  startDate: Date | undefined
  stopped: boolean
  running: boolean

  constructor(private restService: RestService, private router: Router, private formBuilder: FormBuilder) {
    this.stopped = false
    this.running = false
    this.searchMachineForm = this.formBuilder.group({
      name: ['', Validators.minLength(4)],
    })
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

  searchMachine() {
    if(this.stopped) {
      this.status.push("STOPPED")
    }
    if(this.running) {
      this.status.push("RUNNING")
    }
    this.restService.searchMachine(
      this.startDate,
      this.endDate,
      this.searchMachineForm.get('name')?.value,
      this.status
    ).subscribe((response) => {
      this.data = response
    }, error => {
      this.message = ''
    })
  }

  onDelete(id: number) {
    this.restService.deleteMachine(id).subscribe(response => {
      this.ngOnInit()
    }, error => {
      setTimeout(() => {
        this.error = 'You cant delete Machine cus is RUNNING'
      }, 100);
      setTimeout(() => {
        this.error = ''
      }, 2500);
    });
  }


  startMachine(id: number) {
    this.restService.startMachine(id).subscribe((response) => {
      setTimeout(() => {
        this.ngOnInit()
      }, 100);
      setTimeout(() => {
        this.ngOnInit()
      }, 12000);
    }, (error) => {
      this.message = 'No permission'
    })
  }

  stopMachine(id: number) {
    this.restService.stopMachine(id).subscribe((response) => {
      setTimeout(() => {
        this.ngOnInit()
      }, 100);
      setTimeout(() => {
        this.ngOnInit()
      }, 12000);
    }, (error) => {
      this.message = 'No permission'
    })
  }

  restartMachine(id: number) {
    this.restService.restartMachine(id).subscribe((response) => {
      setTimeout(() => {
        this.ngOnInit()
      }, 100);
      setTimeout(() => {
        this.ngOnInit()
      }, 12000);
    }, (error) => {
      this.message = 'No permission'
    })
  }

}
