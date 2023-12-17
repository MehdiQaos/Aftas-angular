import { Component } from '@angular/core';
import { ICompetition } from 'src/app/models/competition';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent {
  competition: ICompetition = {
    id: 0,
    code: 'Competition Code',
    date: '2022-01-01',
    numberOfParticipants: 100,
    startTime: '10:00',
    endTime: '18:00',
    location: 'Competition Location',
    amount: 1000
  };
}
