import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private token: string;

  constructor() {
    var localToken = localStorage.getItem('token');
    if (localToken != null) this.token = localToken;
    else this.token = '';
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  setId(id: number): void {
    localStorage.setItem('userId', String(id));
  }

  getToken(): string {
    return this.token;
  }
}
