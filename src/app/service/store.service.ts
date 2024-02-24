import { Injectable } from '@angular/core';
import { IMember } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private user: IMember | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private authorities: string[] = [];
  private authenticated: boolean = false;

  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: IMember | null) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }

  getAuthorities() {
    return this.authorities;
  }

  setAuthorities(authorities: string[]) {
    this.authorities = authorities;
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setRefreshToken(token: string | null) {
    this.refreshToken = token;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  setAuthenticated(val: boolean) {
    this.authenticated = val;
  }
}
