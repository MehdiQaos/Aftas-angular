import {Component} from '@angular/core';
import {Competition} from "../../models/competition";
import {CompetitionService} from "../../service/competition.service";
import {FormControl, FormGroup} from "@angular/forms";
import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent {
  competitions: Competition[] = [];
  selectedCompetition: Competition | null = null;

  editCompetitionForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    location: new FormControl('')
  });

  constructor(private competitionService: CompetitionService) {
  }

  ngOnInit(): void {
    this.competitionService.getAll().subscribe((data: Competition[]) => {
      this.competitions = data;
    })
  }

  openEditModal(competition: Competition): void {
    this.selectedCompetition = competition;
    this.editCompetitionForm.setValue({
      id: competition.id.toString(),
      code: competition.code,
      date: competition.date,
      startTime: competition.startTime,
      endTime: competition.endTime,
      location: competition.location
    });
    const myModal = new bootstrap.Modal(document.getElementById('editCompetitionModal') as Element, {});
    myModal.show();
  }

  updateCompetition(): void {
    if (this.selectedCompetition) {
      const updatedCompetition = {...this.selectedCompetition, ...this.editCompetitionForm.value};
      this.competitionService.updateCompetition(updatedCompetition).subscribe(() => {
        this.competitions = this.competitions.map(competition =>
          competition.id === updatedCompetition.id ? updatedCompetition : competition
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
