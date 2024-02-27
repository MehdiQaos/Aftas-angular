import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition, ICompetition } from 'src/app/models/competition';
import { Fish, IFish } from 'src/app/models/fish';
import { IMember, IdentityDocumentType, Member } from 'src/app/models/member';
import { IMemberRanking } from 'src/app/models/memberRanking';
import { IRankingMember, RankingMember } from 'src/app/models/rankingMember';
import { AuthService } from 'src/app/service/auth.service';
import { CompetitionService } from 'src/app/service/competition.service';
import { FishService } from 'src/app/service/fish.service';
import { HuntingService } from 'src/app/service/hunting.service';
import { MemberService } from 'src/app/service/member.service';
import { RankingService } from 'src/app/service/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent {
  competition: ICompetition = new Competition;
  members: IMemberRanking[] = [];
  searchedMembers: IMember[] = [];
  selectedMember: IMember = new Member;
  selectedRanking: IRankingMember = new RankingMember;
  rankingMembers: IRankingMember[] = [];
  fishes: IFish[] = [];
  fishWeight: number = 0;
  selectedFish: IFish = new Fish;
  id: number = 0;
  searchTerm: string = '';

  constructor(
    private competitionService: CompetitionService,
    private memberService: MemberService,
    private fishService: FishService,
    private huntingService: HuntingService,
    private rankingService: RankingService,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadPage();
    // this.loadCompetition();
    // this.loadMembers();
    // this.loadFishes();
    
    // this.loadRankingsWithMembers(this.id);
  }

  loadPage(): void {
    this.loadCompetition();
    this.loadMembers();
    this.loadFishes();
    this.loadRankingsWithMembers(this.id);
  }

  competitionActifOrCompleted() {
    return this.competition.status === 'COMPLETED' || this.competition.status === 'ACTIVE';
  }

  loadFishes() {
    this.fishService.getAll().subscribe((data) => {
      this.fishes = data.content;
      console.log(this.fishes);
    })
  }

  loadCompetition(): void {
    this.competitionService.getCompetition(this.id).subscribe((data: ICompetition) => {
      this.competition = data;
    });
  }

  loadMembers() {
    this.competitionService.getMembersOfCompetition(this.id, 0, 30).subscribe((data) => {
      this.members = data.content;
      console.log(this.members);
      
      if (this.competitionActifOrCompleted()) {
        this.members.sort((a, b) => b.score - a.score);
      }
      if (this.competition.status === 'COMPLETED') {
        this.members = this.members.slice(0, 3);
      }
    });
  }

  loadRankingsWithMembers(id: number) {
    this.rankingService.getAllByCompetitionId(id).subscribe((data) => {
      this.rankingMembers = data;
      console.log(this.rankingMembers);
      
    })
  }

  registerMember() {
    if (!this.auth.isJury())
      return;
    this.competitionService.registerMember(this.selectedMember, this.competition).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Your registration has been taken into account.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.loadPage();
    }, (error) => { 
      Swal.fire({
        title: 'Error!',
        text: error.error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
    this.searchedMembers = [];
    this.selectedMember = new Member;
    this.searchTerm = '';
    const button = document.getElementById('closeMemberModalButton');
    button?.click();
    this.loadCompetition();
  }

  addHunt() {
    if (!this.auth.isJury())
      return;
    const rankingId = this.selectedRanking.rankingId;
    const fishId = this.selectedFish.id;
    const weight = this.fishWeight;
    this.huntingService.addHunt({rankingId, fishId, weight}).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Your hunt has been taken into account.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.loadPage();
    }, (error) => { 
      Swal.fire({
        title: 'Error!',
        text: error.error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });
    const button = document.getElementById('closeHuntModalButton');
    button?.click();
    this.selectedFish = new Fish;
    this.fishWeight = 0;
    this.selectedRanking = new RankingMember;
  }

  searchMembers() {
    if (!this.auth.isJury())
      return;
    if (this.searchTerm.trim() === '') return;
    this.memberService.searchMembers(this.searchTerm).subscribe((data: IMember[]) => {
      this.searchedMembers = data;
    });
  }
}