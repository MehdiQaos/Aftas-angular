import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit() {
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.auth.processToken(res);
        this.router.navigate(['/competitions']);
        this.error = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
      } 
    });
  }
}