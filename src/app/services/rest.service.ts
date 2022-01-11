import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ConfigService} from './config.service';
import {LoginResponse, Machines, User} from 'src/app/model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private readonly apiUrl = environment.urlApi;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) {
  }

  login(
    username: string,
    password: string
  ): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      {
        "username": username,
        "password": password,
      }
    );
  }

  getUsers(): Observable<Array<User>> {
    let token = this.configService.getToken();
    return this.httpClient.get<Array<User>>(
      `${this.apiUrl}/api/users/all`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }

  getAllMachines(): Observable<Array<Machines>> {
    let token = this.configService.getToken();
    return this.httpClient.get<Array<Machines>>(
      `${this.apiUrl}/api/machines/allMachines`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }

  getMachines(id: number): Observable<Array<Machines>> {
    let token = this.configService.getToken();
    return this.httpClient.get<Array<Machines>>(
      `${this.apiUrl}/api/machines/all?userId=${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }

  getUserById(id: string): Observable<User> {
    let token = this.configService.getToken();
    return this.httpClient.get<User>(
      `${this.apiUrl}/api/users/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }


  deleteUserById(id: number): Observable<void> {
    let token = this.configService.getToken();
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/users/delete/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }

  deleteMachine(id: number): Observable<void> {
    let token = this.configService.getToken();
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/machines/delete/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
      }
    );
  }

  createMachine(active: boolean, name: string): Observable<Machines> {
    let token = this.configService.getToken();
    return this.httpClient.post<Machines>(
      `${this.apiUrl}/api/machines/create`,
      {
        "active": active,
        "name": name
      },
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
  }

  createUser(
    email: string,
    pass: string,
    name: string,
    lastName: string,
    readPermission: boolean,
    createPermission: boolean,
    updatePermission: boolean,
    deletePermission: boolean,
    canSearchMachines: boolean,
    canStartMachines: boolean,
    canStopMachines: boolean,
    canRestartMachines: boolean,
    canCreateMachines: boolean,
    canDestroyMachines: boolean
  ): Observable<User> {
    let token = this.configService.getToken();
    return this.httpClient.post<User>(
      `${this.apiUrl}/api/users/`,
      {
        "email": email,
        "pass": pass,
        "name": name,
        "lastName": lastName,
        "readPermission": readPermission,
        "createPermission": createPermission,
        "updatePermission": updatePermission,
        "deletePermission": deletePermission,
        "canSearchMachines": canSearchMachines,
        "canStartMachines": canStartMachines,
        "canStopMachines": canStopMachines,
        "canRestartMachines": canRestartMachines,
        "canCreateMachines": canCreateMachines,
        "canDestroyMachines": canDestroyMachines
      },
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
  }

  editUser(
    email: string,
    name: string,
    lastName: string,
    readPermission: boolean,
    createPermission: boolean,
    updatePermission: boolean,
    deletePermission: boolean,
    canSearchMachines: boolean,
    canStartMachines: boolean,
    canStopMachines: boolean,
    canRestartMachines: boolean,
    canCreateMachines: boolean,
    canDestroyMachines: boolean
  ): Observable<User> {
    let token = this.configService.getToken();
    return this.httpClient.put<User>(
      `${this.apiUrl}/api/users/`,
      {
        "email": email,
        "name": name,
        "lastName": lastName,
        "readPermission": readPermission,
        "createPermission": createPermission,
        "updatePermission": updatePermission,
        "deletePermission": deletePermission,
        "canSearchMachines": canSearchMachines,
        "canStartMachines": canStartMachines,
        "canStopMachines": canStopMachines,
        "canRestartMachines": canRestartMachines,
        "canCreateMachines": canCreateMachines,
        "canDestroyMachines": canDestroyMachines
      },
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
    )
  }
}
