import { Component } from '@angular/core';
import {MemberService} from "../../service/member.service";
import {IMember, Member} from "../../models/member";
import {IPage, Page} from "../../models/pagination/page";
import {IPageable, Pageable} from "../../models/pagination/pageable";
import {IErrors} from "../../models/errors";
import Swal from "sweetalert2";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
  members: IMember[] = [];
  data: IPage<IMember> = new Page<IMember>();
  currentPage: IPageable = new Pageable();
  pageFirst: boolean = false;
  pageLast: boolean = false;
  pageSize: number = 20;
  pageNumber: number = 0;
  newMember: IMember = new Member();
  errors: IErrors = {};

  constructor(
    private memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }

  loadMembers(page: number, size: number): void {
    this.memberService.getAll(page, size).subscribe({
      next: (data: IPage<IMember>) => {
        this.members = data.content;
        this.currentPage = data.pageable;
        this.pageFirst = data.first;
        this.pageLast = data.last;
        this.pageNumber = data.number;
      }
    });
  }

  reloadPage(): void {
    this.loadMembers(this.pageNumber, this.pageSize);
  }

  createMember() {
    this.memberService.createMember(this.newMember).subscribe({
      next: () => {
        this.reloadPage();
        this.newMember = new Member();
        Swal.fire({ icon: 'success', title: 'Member created successfully', showConfirmButton: false, timer: 1500 })
          .then(() => {
            this.closeCreateMemberModal();
        });
      },
      error: (error) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
        console.log(error);
      }
    });
  }

  closeCreateMemberModal() {
    const button = document.getElementById('closeCreateMemberModalButton');
    button?.click();
  }

  pageChange(number: number) {
    this.loadMembers(number, this.pageSize);
  }
}
