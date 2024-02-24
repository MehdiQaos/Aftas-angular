import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { StoreService } from './store.service';
import { getPaylodFromToken, getUserFromToken } from '../utils/Token-utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  store: StoreService = inject(StoreService);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private envService: EnvService
  ) {}

  private getUser(email: string) {
    const url = this.envService.ApiUrl + `/member/email/${email}`;
    this.http.get(url, httpOptions).subscribe((res: any) => {
      console.log(res);
      this.store.setUser(res);
    });
  }

  login(form: any) {
    const url = this.envService.ApiUrl + "/auth/login";
    
    this.http.post(url, { email: form.email, password: form.password }).subscribe({
      next: (res) => this.getToken(res)
    });
  }

  register(form: any) {
    const url = this.envService.ApiUrl + "/auth/signup";

    this.http.post(url, form, httpOptions).subscribe({
      next: (res) => this.getToken(res)
    });
  }

  private getToken(res: any) {
    this.saveTokens(res);
    
    this.store.setAccessToken(res.accessToken);
    this.store.setRefreshToken(res.refreshToken);
    const email = getUserFromToken(res.accessToken);
    this.store.setAuthenticated(true);
    this.getUser(email);
    const payload = getPaylodFromToken(res.accessToken);
    const authorities = payload.authorities;
    
    this.store.setAuthorities(authorities);
    
    this.router.navigate(['/competitions']);
    console.log("navigating");
  }

  private saveTokens(res: any) {
    this.store.setAccessToken(res.accessToken);
    this.store.setRefreshToken(res.refreshToken);
  }

  logout() {
    const url = this.envService.ApiUrl + "/auth/logout";
    
    this.http.post(url, {}, httpOptions).subscribe((res: any) => {
      this.store.setAccessToken(null);
      this.store.setRefreshToken(null);
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
          this.store.setAccessToken(null);
          this.store.setRefreshToken(null);
          this.store.clearUser();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
