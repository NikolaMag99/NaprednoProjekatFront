import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string | undefined
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

  ngOnInit(): void {
  }

  setNewToken(newToken: string): void {
    localStorage.setItem("token", newToken)
    this.token = newToken;

    let token = localStorage.getItem('token');
    if(token != null) {
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      let isAdmin = decodedJwtData.admin

      console.log('jwtData: ' + jwtData)
      console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
      console.log('decodedJwtData: ' + decodedJwtData)
      console.log('Is admin: ' + isAdmin)
    }
  }

  loginUser() {
    this.loginService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
    ).subscribe((response) => {
      this.setNewToken(response.jwt.toString())
      this.loginForm.reset()
    })
  }

}
