import {Component, OnInit} from '@angular/core';
import {Machines} from "../../model";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-all-machines',
  templateUrl: './all-machines.component.html',
  styleUrls: ['./all-machines.component.css']
})
export class AllMachinesComponent implements OnInit {

  data: Machines[] = [];


  constructor(private restService: RestService) {
  }

  ngOnInit(): void {

    // @ts-ignore
    this.getMachines(localStorage.getItem('userId'));
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
      this.getMachines(id);
    });
  }

}
