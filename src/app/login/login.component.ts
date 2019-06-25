import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { take } from 'rxjs/operators'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loggedIn$ = this.auth.isLoggedIn$

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login() {
    const creds = this.loginForm.value

    if (creds.email && creds.password) {
      this.auth.login(creds)
        .pipe(take(1)).subscribe()
    }
  }

  public logout() {
    this.auth.logout()
  }
}
