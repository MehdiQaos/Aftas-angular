import { Component } from '@angular/core';
import { Competition, ICompetition } from "../../models/competition";
import { CompetitionService } from "../../service/competition.service";
import { IPage, Page } from 'src/app/models/pagination/page';
import { IPageable, Pageable } from 'src/app/models/pagination/pageable';
import Swal from 'sweetalert2';
import {IErrors} from "../../models/errors";
import { AuthService } from 'src/app/service/auth.service';

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
  pageSize: number = 2;
  filter: string = "ALL";
  pageNumber: number = 0;
  errors: IErrors = {};

  constructor(
    private competitionService: CompetitionService,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadPage(this.pageNumber, this.pageSize, this.filter);
  }

  loadPage(page: number, size: number, filter: string): void {
    this.competitionService.getAll(page, size, filter)
      .subscribe((data: IPage<Competition>) => {
        this.competitions = data.content;
        this.currentPage = data.pageable;
        this.pageFirst = data.first;
        this.pageLast = data.last;
        this.pageNumber = page;
      });
  }

  filterCompetitions() {
    this.loadPage(this.pageNumber, this.pageSize, this.filter);
  }

  pageChange(number: number) {
    this.loadPage(number, this.pageSize, this.filter);
  }

  openEditModal(competition: Competition): void {
    this.selectedCompetition = {...competition};
    const button = document.getElementById('openEditCompetitionModalButton');
    button?.click();
  }

  updateCompetition(): void {
    if (!this.selectedCompetition) return;

    this.competitionService.updateCompetition(this.selectedCompetition).subscribe({
        next: () => {
          this.competitions = this.competitions.map(competition =>
            competition.id === this.selectedCompetition.id ? this.selectedCompetition : competition
          );
          Swal.fire({ position: 'center', icon: 'success', title: 'Competition updated successfully', showConfirmButton: false, timer: 1500 })
            .then(() => {
              this.errors = {};
              this.closeEditModal();
            });
        },
        error: error => {
          console.log(error);
          Swal.fire({ position: 'center', icon: 'error', title: 'Competition could not be updated', showConfirmButton: false, timer: 1500 });
          this.errors = error.error.errors;
        }
      });
  }

  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe({
      next: () => {
        this.competitions = this.competitions.filter(competition => competition.id !== id);
        Swal.fire({ position: 'center', icon: 'success', title: 'Competition deleted successfully', showConfirmButton: false, timer: 1500 });
      },
      error: error => {
        Swal.fire({ position: 'center', icon: 'error', title: 'Competition could not be deleted', showConfirmButton: false, timer: 1500 });
      }
    });
  }

  createCompetition(): void {
    this.competitionService.createCompetition(this.newCompetition).subscribe(
      {
        next: () => {
          this.loadPage(this.currentPage.pageNumber, this.pageSize, this.filter);
          this.newCompetition = new Competition();
          Swal.fire({ position: 'center', icon: 'success', title: 'Competition created successfully', showConfirmButton: false, timer: 1500 })
            .then(() => {
              this.errors = {};
              this.closeCreateModal();
            });
        }, error: error => {
          console.log(error);
          Swal.fire({ position: 'center', icon: 'error', title: 'Competition could not be created', showConfirmButton: false, timer: 1500 })
            .then(() => {
              this.errors = error.error.errors;
            });
        }
      }
    );
  }

  closeCreateModal(): void {
    const button = document.getElementById('closeCreateCompetitionModalButton');
    button?.click();
  }

  closeEditModal(): void {
    const button = document.getElementById('closeEditCompetitionModalButton');
    button?.click();
  }
}
