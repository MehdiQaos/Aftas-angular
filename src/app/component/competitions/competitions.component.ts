import {Component, ChangeDetectorRef } from '@angular/core';
import {Competition, ICompetition} from "../../models/competition";
import {CompetitionService} from "../../service/competition.service";
// import * as bootstrap from "bootstrap";
import { catchError } from 'rxjs';
import { IPage, Page } from 'src/app/models/pagination/page';
import { IPageable, Pageable } from 'src/app/models/pagination/pageable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent {
  competitions: Competition[] = [];
  data: IPage<ICompetition> = new Page<ICompetition>();
  selectedCompetition: ICompetition = new Competition();
  newCompetition: ICompetition = new Competition();
  currentPage: IPageable = new Pageable();
  pageFirst: boolean = false;
  pageLast: boolean = false;
  PAGESIZE: number = 2;

  constructor(
    private competitionService: CompetitionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPage(0, 2);
  }

  loadPage(page: number, size: number): void {
    this.competitionService.getAll(page, size)
      .subscribe((data: IPage<Competition>) => {
        this.competitions = data.content;
        this.currentPage = data.pageable;
        this.pageFirst = data.first;
        this.pageLast = data.last;
        this.cdr.detectChanges();
      });
  }

  pageChange(number: number) {
    this.loadPage(number, this.PAGESIZE);
  }

  openEditModal(competition: Competition): void {
    this.selectedCompetition = {...competition};
    const button = document.getElementById('openEditCompetitionModalButton');
    button?.click();
  }

  updateCompetition(): void {
    if (this.selectedCompetition) {
      this.competitionService.updateCompetition(this.selectedCompetition).subscribe(() => {
        this.competitions = this.competitions.map(competition =>
          competition.id === this.selectedCompetition.id ? this.selectedCompetition : competition
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Competition updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Competition could not be updated',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
    const button = document.getElementById('closeEditCompetitionModalButton');
    button?.click();
  }

  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe(() => {
      this.competitions = this.competitions.filter(competition => competition.id !== id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Competition deleted successfully',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Competition could not be deleted',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  createCompetition(): void {
    this.competitionService.createCompetition(this.newCompetition).subscribe(() => {
      this.loadPage(this.currentPage.pageNumber, this.PAGESIZE);
      this.newCompetition = new Competition();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Competition created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Competition could not be created',
        showConfirmButton: false,
        timer: 1500
      });
    });
    const button = document.getElementById('closeCreateCompetitionModalButton');
    button?.click();
  }
}
