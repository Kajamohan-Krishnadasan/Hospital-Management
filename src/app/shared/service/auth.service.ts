import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      this.auth.authState.subscribe(async (user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          await this.router.navigate(['/dashboard']);
          location.reload();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    localStorage.setItem('user', 'null');
    await this.router.navigate(['']);
    location.reload();
  }

  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
}
