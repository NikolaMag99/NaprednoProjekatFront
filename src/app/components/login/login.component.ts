import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {RestService} from "../../services/rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;


  constructor(private configService: ConfigService, private restService: RestService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  login() {
    this.restService.login(
      this.username, this.password
    ).subscribe(response => {
      this.configService.setToken(response.jwt);
      this.configService.setId(response.id);
    }, error => {
      console.log("LUDIIIIIIIIIIIII")
    });
    console.log( this.username)
    console.log( this.password)
    this.router.navigate(["/all-machines"])
    // window.location.href = 'http://localhost:4200/all-machines';
  }
}
