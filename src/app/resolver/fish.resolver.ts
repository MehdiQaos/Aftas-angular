import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Page} from "../models/pagination/page";
import {Fish} from "../models/fish";
import {FishService} from "../service/fish.service";

@Injectable({
  providedIn: 'root'
})
export class FishResolver {
  constructor(private fishService: FishService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Fish>> {
    return this.fishService.getAll();
  }
}
