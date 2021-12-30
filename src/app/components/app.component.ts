import { Component } from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3-front';
  noToken: boolean;
  constructor(private appRoutingModule: AppRoutingModule) {
    this.noToken = appRoutingModule.login
  }
}
