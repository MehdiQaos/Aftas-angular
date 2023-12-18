import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition, ICompetition } from 'src/app/models/competition';
import { IdentityDocumentType } from 'src/app/models/member';
import { IMemberRanking } from 'src/app/models/memberRanking';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent {
  competition: ICompetition = new Competition;
  members: IMemberRanking[] = [];
  id: number = 0;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadCompetition();
    this.loadMembers();
  }

  competitionActifOrCompleted() {
    return this.competition.status === 'COMPLETED' || this.competition.status === 'ACTIVE';
  }

  loadCompetition(): void {
    this.competitionService.getCompetition(this.id).subscribe((data: ICompetition) => {
      this.competition = data;
    });
  }

  loadMembers() {
    this.competitionService.getMembersOfCompetition(this.id, 0, 30).subscribe((data) => {
      this.members = data.content;
      if (this.competitionActifOrCompleted()) {
        this.members.sort((a, b) => b.score - a.score);
      }
      if (this.competition.status === 'COMPLETED') {
        this.members = this.members.slice(0, 3);
      }
    });
  }
}