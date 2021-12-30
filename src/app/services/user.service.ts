import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Permission, User} from "../models/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.urlApi

  constructor(private httpClient: HttpClient) {
  }

  saveUser(name: string, lastName: string, email: string, pass: string, permissions: Permission[]): Observable<User> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.post<User>(`${this.apiUrl + "/create"}`, {
      "name": name,
      "lastName": lastName,
      "email": email,
      "pass": pass,
      "permissions": permissions
    }, {
      headers: httpHeaders
    })
  }


  updateUser(id: number, name: string, lastName: string, email: string, pass: string, permissions: Permission[]): Observable<User> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.put<User>(`${this.apiUrl + "/"}`, {
      "name": name,
      "lastName": lastName,
      "email": email,
      "pass": pass,
      "permissions": permissions
    }, {
      headers: httpHeaders
    })
  }

  findUser(username: string): Observable<User> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.get<User>(`${this.apiUrl + `/myself`}`, {headers: httpHeaders})
  }

  deleteUser(id: number) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.delete<Object>(`${this.apiUrl + `/delete/${id}`}`, {headers: httpHeaders})
  }

  getAllUsers(): Observable<Array<User>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.get<Array<User>>(`${this.apiUrl + "/all"}`, {headers: httpHeaders})
  }

}
