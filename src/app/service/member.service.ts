import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import {IMember, Member} from '../models/member';
import {Competition, ICompetition} from '../models/competition';
import {Observable} from "rxjs";
import {IPage} from "../models/pagination/page";

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

  getAll(page: number, size: number): Observable<IPage<IMember>> {
    const url = `${this.url}?page=${page}&size=${size}`;
    return this.httpClient.get<IPage<IMember>>(url);
  }

  getMember(id: number): Observable<IMember> {
    return this.httpClient.get<IMember>(`${this.url}/${id}`);
  }

  createMember(member: any): Observable<any> {
    return this.httpClient.post(this.envService.ApiUrl + "/auth/signup", member);
  }

  searchMembers(searchTerm: string) {
    const url = `${this.url}/search/${searchTerm}`;
    console.log(url);
    return this.httpClient.get<IMember[]>(url);
  }

  setStatus(member: IMember): Observable<any> {
    return this.httpClient.post(`${this.url}/${member.id}/${member.enabled}`, {});
  }
}
