import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    email: "john.doe@example.com",
    password: "randompassword123"
  };
  auth = inject(AuthService);

  constructor() {}
}