import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { IFish } from '../models/fish';
import { Page } from '../models/pagination/page';

@Injectable({
  providedIn: 'root'
})
export class FishService {
  url: string;
  uri: string = "/fish";

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + this.uri;
  }

  getAll() {
    return this.httpClient.get<Page<IFish>>(this.url);
  }

  get(id: number) {
    return this.httpClient.get<IFish>(this.url + '/' + id);
  }
}
