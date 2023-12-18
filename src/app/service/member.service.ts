import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  url: string;
  uri: string = "/member";

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + this.uri;
  }

}
