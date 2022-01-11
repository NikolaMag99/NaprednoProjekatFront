import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-create-machines',
  templateUrl: './create-machines.component.html',
  styleUrls: ['./create-machines.component.css']
})
export class CreateMachinesComponent implements OnInit {

  active: boolean;
  name: string;


  constructor(private restService: RestService) {
    this.active = true;
    this.name = "";
  }

  ngOnInit(): void {
  }

  submitData(): void {
    this.restService.createMachine(
      this.active, this.name
    ).subscribe(result => {
      console.log(result);
    });
  }
}
