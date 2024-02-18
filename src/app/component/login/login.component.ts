import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EnvService } from 'src/app/service/env.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url: string;
  form: any = {
    email: "john.doe@example.com",
    password: "randompassword123"
  };
  auth = inject(AuthService);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private envService: EnvService,
    private store: StoreService
  ) { 
    this.url = envService.ApiUrl + "/auth/login";
  }

  onLogin() {
    console.log(this.form.email, this.form.password);
    console.log(this.url);
    console.log("button clicked");
    
    this.http.post(this.url, { email: this.form.email, password: this.form.password }).subscribe((res: any) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      const user = this.store.getUserFromToken(res.accessToken);
      this.store.setUser(user);
      this.router.navigate(['/competitions']);
    });
  }
}
