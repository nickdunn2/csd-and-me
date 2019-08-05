import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { take } from 'rxjs/operators'
import { AuthService, ILoginError } from '../shared/services/auth.service'
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'csd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup
  public loggedIn$ = this.auth.isLoggedIn$
  public loginErrorSubject = new Subject<ILoginError | undefined>()
  public loginError$ = this.loginErrorSubject.asObservable()
  public formSubmitting = false // TODO: Should this be a subject/observable like everything else?

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
      this.formSubmitting = true

      this.auth.login(creds)
        .pipe(take(1))
        .subscribe(res => {
          console.log('login res', res)
          this.formSubmitting = false
          this.auth.updateLoggedIn(true)
          this.router.navigate(['users'])
        },
          error => {
            console.error('login error', error)
            this.formSubmitting = false
            this.loginErrorSubject.next(error)
          })
    }
  }

  public get canSubmitForm() {
    return (
      this.loginForm.valid &&
      !this.loginForm.pending &&
      !this.formSubmitting
    )
  }
}
