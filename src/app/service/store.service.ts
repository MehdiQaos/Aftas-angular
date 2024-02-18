import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private user: string | null = null;
  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: string) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }

  isLoggedIn() {
    return this.user !== null;
  }

  getUserFromToken(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const user = JSON.parse(decodedPayload);
    return user.sub;
  }
}
