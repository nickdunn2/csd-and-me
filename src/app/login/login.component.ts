import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { take } from 'rxjs/operators'
import { AuthService, ILoginError } from '../shared/services/auth.service'
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup
  public loggedIn$ = this.auth.isLoggedIn$
  public loginErrorSubject = new Subject<ILoginError | undefined>()
  public loginError$ = this.loginErrorSubject.asObservable()

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
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
        .pipe(take(1))
        .subscribe(res => {
          console.log('login res', res)
          this.auth.updateLoggedIn(true)
          this.router.navigate(['users'])
        },
          error => {
            console.error('login error', error)
            this.loginErrorSubject.next(error)
          })
    }
  }

  public logout() {
    this.auth.logout()
  }
}
