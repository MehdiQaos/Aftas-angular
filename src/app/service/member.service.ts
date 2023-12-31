import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { IMember } from '../models/member';
import { ICompetition } from '../models/competition';

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

  searchMembers(searchTerm: string) {
    const url = `${this.url}/search/${searchTerm}`;
    console.log(url);
    return this.httpClient.get<IMember[]>(url);
  }
}
