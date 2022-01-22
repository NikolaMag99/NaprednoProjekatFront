import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ConfigService} from './config.service';
import {ErrorMessage, LoginResponse, Machines, User} from 'src/app/model';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

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

  findAllErrorMessages(): Observable<Array<ErrorMessage>>  {
    let token = this.configService.getToken();
    return this.httpClient.get<ErrorMessage[]>(
      `${this.apiUrl}/api/machines/allErrors`,
      {
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

  searchMachine(dateFrom: Date | undefined, dateTo: Date | undefined, name?: string, status?: string[] | undefined): Observable<Array<Machines>> {
    let token = this.configService.getToken();
    let params = new HttpParams();

    if(dateFrom != undefined) {
      // @ts-ignore
      params = params.append('dateFrom', dateFrom.toISOString().slice(0,10));
    }

    if(dateTo != undefined){
      // @ts-ignore
      params = params.append('dateTo', dateTo.toISOString().slice(0,10));
    }
    // @ts-ignore
    params = params.append('name', name);

    // @ts-ignore
    if(status != '') {
      // @ts-ignore
      params = params.append('status', status);
    }
    console.log(dateTo)
    console.log(name)
    return this.httpClient.get<Machines[]>(
      `${this.apiUrl}/api/machines/search`,
      {
        headers: {Authorization: `Bearer ${token}`}, params: params
      },
    )
  }

  startMachine(id: number): Observable<Machines> {
    let token = this.configService.getToken();
    return this.httpClient.post<Machines>(
      `${this.apiUrl}/api/machines/start?machineId=${id}`,
      {}, {
         headers: {'Authorization': `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}
      }
    )
  }

  stopMachine(id: number): Observable<Machines> {
    let token = this.configService.getToken();
    return this.httpClient.post<Machines>(
      `${this.apiUrl}/api/machines/stop?machineId=` + id,
      {}, {
         headers: {'Authorization': `Bearer ${token}`}
      }
    )
  }

  restartMachine(id: number): Observable<Machines> {
    let token = this.configService.getToken();
    return this.httpClient.post<Machines>(
      `${this.apiUrl}/api/machines/restart?machineId=` + id,
      {}, {
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

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.status === 400) {
      errorMessage = errorRes.error ? errorRes.error : 'Bad Request!';
    } else if (errorRes.status === 401) {
      errorMessage = 'Bad Credentials!';
    } else if (errorRes.status === 403 || errorRes.status === 0) {
      errorMessage = errorRes.error ? errorRes.error : 'Unauthorized access!';
    } else if (errorRes.status === 404) {
      errorMessage = 'Not Found!';
    }
    return throwError(errorMessage);
  }
}
