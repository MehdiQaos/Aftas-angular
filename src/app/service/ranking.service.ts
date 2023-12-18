import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { IRankingMember } from '../models/rankingMember';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  url: string;
  uri: string = "/ranking";

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + this.uri;
  }

  getAllByCompetitionId(id: number) {
    return this.httpClient.get<IRankingMember[]>(`${this.url}/${id}`);
  }
}
