import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Competition} from "../models/competition";
import {Observable} from "rxjs";
import { IPage, Page } from '../models/pagination/page';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  url: string = "http://localhost:8080/api/competition?size=2"

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, size: number) {
    const url = `${this.url}&page=${page}&size=${size}`;
    return this.httpClient.get<IPage<Competition>>(url);
  }

  deleteCompetition(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateCompetition(competition: Competition): Observable<any> {
    return this.httpClient.put(`${this.url}/${competition.id}`, competition);
  }
}
