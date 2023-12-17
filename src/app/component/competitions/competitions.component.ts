import {Component, ChangeDetectorRef } from '@angular/core';
import {Competition, ICompetition} from "../../models/competition";
import {CompetitionService} from "../../service/competition.service";
import * as bootstrap from "bootstrap";
import { catchError } from 'rxjs';
import { IPage, Page } from 'src/app/models/pagination/page';
import { Pageable } from 'src/app/models/pagination/pageable';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent {
  competitions: Competition[] = [];
  data: IPage<ICompetition> = new Page<ICompetition>();
  selectedCompetition: ICompetition = new Competition();
  currentPage: Pageable | undefined = undefined;
  pageFirst: boolean = false;
  pageLast: boolean = false;
  pageSize: number = 2;

  isLoading = true;
  hasError = false;

  constructor(
    private competitionService: CompetitionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPage(0, 2);
  }

  loadPage(page: number, size: number): void {
    this.competitionService.getAll(page, size)
      // .pipe(
      //   catchError((error) => {
      //     this.isLoading = false;
      //     this.hasError = true;
      //     return [];
      //   })
      // )
      .subscribe((data: IPage<Competition>) => {
        this.isLoading = false;
        this.hasError = false;
        this.competitions = data.content;
        this.currentPage = data.pageable;
        this.pageFirst = data.first || false;
        this.pageLast = data.last || false;
        this.cdr.detectChanges();
      });
  }

  nextPage(): void {
    if (!this.pageLast && this.currentPage) {
      this.loadPage(this.currentPage.pageNumber + 1, this.pageSize);
    }
  }

  previousPage(): void {
    if (!this.pageFirst && this.currentPage) {
      this.loadPage(this.currentPage.pageNumber - 1, this.pageSize);
    }
  }

  openEditModal(competition: Competition): void {
    this.selectedCompetition = {...competition};
    const myModal = new bootstrap.Modal(document.getElementById('editCompetitionModal') as Element, {});
    myModal.show();
  }

  updateCompetition(): void {
    if (this.selectedCompetition) {
      this.competitionService.updateCompetition(this.selectedCompetition).subscribe(() => {
        this.competitions = this.competitions.map(competition =>
          competition.id === this.selectedCompetition.id ? this.selectedCompetition : competition
        );
      });
    }
  }

  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe(() => {
      this.competitions = this.competitions.filter(competition => competition.id !== id);
    });
  }

}
