import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../service/store.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private store: StoreService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.store.getAccessToken();
    const refreshToken = this.store.getRefreshToken();

    if (accessToken) {
      const cloned = request.clone(
        { headers: request.headers.set('Authorization', `Bearer ${accessToken}`) }
      );
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
