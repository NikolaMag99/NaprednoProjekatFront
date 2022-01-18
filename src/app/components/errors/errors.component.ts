import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ErrorMessage} from "../../model";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errorMessageList: ErrorMessage[] = [];
  sub!: Subscription;

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {

    this.sub = this.restService.findAllErrorMessages().subscribe(response => {
      this.errorMessageList = response;
    })
  }


}
