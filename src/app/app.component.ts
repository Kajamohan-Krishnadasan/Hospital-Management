import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Hospital-Management';
  userLoggedIn: boolean = false;

  constructor(private authApi: AuthService) {}

  ngOnInit(): void {
    this.userLoggedIn = this.authApi.isUserLoggedIn();
  }
}
