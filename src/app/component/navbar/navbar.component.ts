import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EnvService } from 'src/app/service/env.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  url: string;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private envService: EnvService,
    public auth: AuthService,
    public store: StoreService,
  ) { 
    this.url = envService.ApiUrl + "/auth/logout";
  }

  isLogedIn() {
    return this.store.isAuthenticated();
  }
}
