import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {
  url: string;
  uri: string = "/hunting";

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + this.uri;
  }

  addHunt(hunt: any) {
    return this.httpClient.post(this.url, hunt);
  }
}
