import { Injectable } from '@angular/core';
import { IMember, Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private user: IMember | null = null;
  // private accessToken: string | null = null;
  // private refreshToken: string | null = null;
  // private authorities: string[] = [];
  // private authenticated: boolean = false;

  constructor() {
    console.log("store service constructor");
    
    // if (localStorage.getItem('user') !== null)
    //   this.user = JSON.parse(localStorage.getItem('user') as string);
    // if (localStorage.getItem('accessToken') !== null)
    //   this.accessToken = localStorage.getItem('accessToken');
    // if (localStorage.getItem('refreshToken') !== null)
    //   this.accessToken = localStorage.getItem('refreshToken');
    // if (localStorage.getItem('authenticated') !== null)
    //   this.accessToken = JSON.parse(localStorage.getItem('authenticated') as string);
    // if (localStorage.getItem('authorities') !== null)
    //   this.authorities = JSON.parse(localStorage.getItem('authorities') as string);
  }

  getUser() {
    const rawUser = localStorage['user'];
    return rawUser ? JSON.parse(rawUser) : null;
  }

  setUser(user: IMember | null) {
    // this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    localStorage.removeItem('user');
  }

  getAuthorities() {
    // return this.authorities;
    const rawAuthorties = localStorage['authorities'];
    return rawAuthorties ? JSON.parse(rawAuthorties) : [];
  }

  setAuthorities(authorities: string[]) {
    // this.authorities = authorities;
    localStorage.setItem('authorities', JSON.stringify(authorities));
  }

  getAccessToken() {
    return localStorage['accessToken'];
  }

  setAccessToken(token: string | null) {
    // this.accessToken = token;
    if (token)
      localStorage.setItem('accessToken', token);
    else
      localStorage.removeItem('accessToken');
  }

  getRefreshToken() {
    return localStorage['refreshToken'];
  }

  setRefreshToken(token: string | null) {
    // this.refreshToken = token;
    if (token)
      localStorage.setItem('refreshToken', token);
    else
      localStorage.removeItem('refreshToken');
  }

  isAuthenticated() {
    return localStorage['authenticated'] ? JSON.parse(localStorage['authenticated']) : false;
  }

  setAuthenticated(val: boolean) {
    // this.authenticated = val;
    localStorage.setItem('authenticated', JSON.stringify(val));
  }

  clearAuth() {
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setAuthorities([]);
    this.setAuthenticated(false);
    this.setUser(null);
    // this.accessToken = null;
    // this.refreshToken = null;
    // this.authenticated = false;
    // this.user = null;
  }
}
