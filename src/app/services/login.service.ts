import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse} from "../models/login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.authUrlApi

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    let endpoint = `${this.apiUrl}`;
    return this.httpClient.post<LoginResponse>(endpoint, {
      "username": username,
      "password": password
    });
  }

}
