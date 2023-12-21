import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Competition, ICompetition} from "../models/competition";
import {Observable} from "rxjs";
import { IPage, Page } from '../models/pagination/page';
import { EnvService } from './env.service';
import { IMember, Member } from '../models/member';
import { IMemberRanking } from '../models/memberRanking';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  url: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + "/competition";
  }

  getAll(page: number, size: number, filter: string): Observable<IPage<Competition>> {
    const url = `${this.url}?page=${page}&size=${size}&filter=${filter}`;
    return this.httpClient.get<IPage<ICompetition>>(url);
  }

  getMembersOfCompetition(id: number, page: number, size: number) {
    const url = `${this.url}/${id}/members?page=${page}&size=${size}`;
    return this.httpClient.get<IPage<IMemberRanking>>(url);
  }

  getCompetition(id: number): Observable<Competition> {
    return this.httpClient.get<Competition>(`${this.url}/${id}`);
  }

  createCompetition(competition: Competition): Observable<any> {
    return this.httpClient.post(this.url, competition);
  }

  deleteCompetition(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateCompetition(competition: Competition): Observable<any> {
    return this.httpClient.put(`${this.url}/${competition.id}`, competition);
  }

  registerMember(member: IMember, competition: ICompetition) {
    const url = `${this.url}/${competition.id}/${member.id}`
    return this.httpClient.get(url);
  }
}
