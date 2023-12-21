import { Component } from '@angular/core';
import {Fish, IFish} from "../../models/fish";
import {IPage, Page} from "../../models/pagination/page";
import {FishService} from "../../service/fish.service";

@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css']
})
export class FishesComponent {
  Fishes: Fish[] = [];
  data: IPage<IFish> = new Page<IFish>();

  constructor(
    private fishService: FishService,
  ) {}

  ngOnInit(): void {
    this.loadFishes();
  }

  loadFishes(): void {
    this.fishService.getAll()
      .subscribe((data: IPage<Fish>) => {
        this.Fishes = data.content;
      });
  }
}
