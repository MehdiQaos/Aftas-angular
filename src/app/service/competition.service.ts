import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Competition} from "../models/competition";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  url: string = "http://localhost:8080/api/competition"

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<Competition[]>(this.url);
  }

  deleteCompetition(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateCompetition(competition: Competition): Observable<any> {
    return this.httpClient.put(`${this.url}/${competition.id}`, competition);
  }
}
