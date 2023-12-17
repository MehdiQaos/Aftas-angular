import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompetition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent {
  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
  ) {}

  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadCompetition(this.id);
  }

  loadCompetition(id: number): void {
    this.competitionService.getCompetition(id).subscribe((data: ICompetition) => {
      this.competition = data;
    });
  }
  competition: ICompetition = {
    id: 0,
    code: 'Competition Code',
    date: '2022-01-01',
    numberOfParticipants: 100,
    startTime: '10:00',
    endTime: '18:00',
    location: 'Competition Location',
    amount: 1000,
    status: 'COMING',
  };
}
