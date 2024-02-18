import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { StoreService } from './store.service';

const AUTH_API = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private envService: EnvService,
    private store: StoreService
  ) {}

  login(form: any) {
    const url = this.envService.ApiUrl + "/auth/login";
    
    this.http.post(url, { email: form.email, password: form.password }).subscribe((res: any) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      const user = this.store.getUserFromToken(res.accessToken);
      this.store.setUser(user);
      this.router.navigate(['/competitions']);
    });
  }

  register(form: any) {
    const url = this.envService.ApiUrl + "/auth/signup";

    this.http.post(url, form, httpOptions).subscribe({
      next: (data: any) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        const user = this.store.getUserFromToken(data.accessToken);
        this.store.setUser(user);
        this.router.navigate(['/competitions']);
      }
    });
  }

  logout() {
    const url = this.envService.ApiUrl + "/auth/logout";
    
    this.http.post(url, {}, httpOptions).subscribe((res: any) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.store.clearUser();
      this.router.navigate(['/login']);
    });
  }

  refresh() {
    const url = this.envService.ApiUrl + "/auth/refresh";
    
    return this.http.post(url, {}, httpOptions).subscribe({
      next: (data: any) => {
        localStorage.setItem('accessToken', data.accessToken);
        console.log(data);
      },
      error: (err: any) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.store.clearUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
