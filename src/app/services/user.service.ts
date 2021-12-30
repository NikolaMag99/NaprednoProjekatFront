import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SingleRole, SingleUser} from "../models/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.urlApi

  constructor(private httpClient: HttpClient) {
  }

  saveUser(name: String, surname: String, email: String): Observable<SingleUser> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.post<SingleUser>(`${this.apiUrl + "users/new"}`, {
      name: name,
      surname: surname,
      email: email
    }, {
      headers: httpHeaders
    })
  }

  getRoles(id: number): Observable<Array<SingleRole>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.get<Array<SingleRole>>(`${this.apiUrl + `users/all-role/${id}`}`, {headers: httpHeaders})
  }

  updateUser(id: number, name: String, surname: String, email: String): Observable<SingleUser> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.put<SingleUser>(`${this.apiUrl + "users"}`, {
      id: id,
      name: name,
      surname: surname,
      email: email
    }, {
      headers: httpHeaders
    })
  }

  findUser(id: number): Observable<SingleUser> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    let params = new HttpParams();
    params = params.append('userId', id);
    return this.httpClient.get<SingleUser>(`${this.apiUrl + `users/?`}`, {headers: httpHeaders, params: params})
  }

  deleteUser(id: number) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.delete<Object>(`${this.apiUrl + `users/${id}`}`, {headers: httpHeaders})
  }

  fetchAllUser(): Observable<Array<SingleUser>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.get<Array<SingleUser>>(`${this.apiUrl + "users/all"}`, {headers: httpHeaders})
  }

  fetchAllRole(): Observable<Array<SingleRole>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return this.httpClient.get<Array<SingleRole>>(`${this.apiUrl + "roles/all"}`, {headers: httpHeaders})
  }

}
