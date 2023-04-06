import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  email!: string;
  password!: string;
  isLoading: boolean = false;
  userLoggedIn: boolean = false;

  constructor(private authApi: AuthService, private formBulider: FormBuilder) {
    this.loginForm = this.formBulider.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userLoggedIn = this.authApi.isUserLoggedIn();
  }


  login() {
    this.isLoading = true;
    this.authApi.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    setTimeout(() => {}, 2000);
  }
}
