import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthDate: '',
    identityNumber: '',
    identityDocumentTypeId: '',
    email: '',
    password: ''
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form);
  }
}
