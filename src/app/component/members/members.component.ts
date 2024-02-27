import { Component } from '@angular/core';
import { MemberService } from "../../service/member.service";
import { IMember, Member } from "../../models/member";
import { IPage, Page } from "../../models/pagination/page";
import { IPageable, Pageable } from "../../models/pagination/pageable";
import { IErrors } from "../../models/errors";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup } from '@angular/forms';

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
  form!: FormGroup;

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reloadPage();
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      nationality: '',
      birthDate: '',
      identityNumber: '',
      identityDocumentTypeId: '',
      email: '',
      password: ''
    });
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

  toggleMemberStatus(member: IMember): void {
    console.log(`id: ${member.id} - toggled`);
    
    this.memberService.setStatus(member).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Member status updated successfully', showConfirmButton: false, timer: 1500 });
      },
      error: (error: any) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: error.error.message });
        console.log(error);
        member.enabled = !member.enabled;
      }
    });
  }

  reloadPage(): void {
    this.loadMembers(this.pageNumber, this.pageSize);
  }

  createMember() {
    this.memberService.createMember(this.form.getRawValue()).subscribe({
      next: () => {
        this.reloadPage();
        this.newMember = new Member();
        Swal.fire({ icon: 'success', title: 'Member created successfully', showConfirmButton: false, timer: 1500 })
          .then(() => {
            this.closeCreateMemberModal();
        });
      },
      error: (error: any) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
        this.errors = error.error.errors;
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