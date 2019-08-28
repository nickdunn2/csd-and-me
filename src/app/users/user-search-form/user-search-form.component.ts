import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { IUserSearch } from 'src/app/shared/services/user.service'
import { EmailValidators, validateEmail } from 'src/app/shared/validators/email.validators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csd-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent {
  // public forgotPasswordSubmitting = false
  // public showEmailSpinner$: Observable<boolean>
  // public forgotPasswordForm = this.fb.group({
  //   email: [
  //     '',
  //     [Validators.required, validateEmail],
  //     [this.emailValidators.validateEmailExists()]
  //   ]
  // })

  // public get canSubmitForgotPassword() {
  //   return (
  //     this.forgotPasswordForm.valid &&
  //     !this.forgotPasswordForm.pending &&
  //     !this.forgotPasswordSubmitting
  //   )
  // }

  // public get email() {
  //   return this.forgotPasswordForm.get('email')
  // }

  // public showFormErrorComponent() {
  //   return (
  //     (this.forgotPasswordForm.controls.email.touched &&
  //       this.forgotPasswordForm.controls.email.invalid &&
  //       !this.forgotPasswordForm.controls.email.hasError(
  //         'unclaimed_account'
  //       )) ||
  //     this.forgotPasswordForm.controls.email.hasError('email_does_not_exist')
  //   )
  // }

  // private get emailValue() {
  //   return this.email && this.email.value
  // }

  // constructor(
  //   private fb: FormBuilder,
  //   private emailValidators: EmailValidators
  // ) { }

  // ngOnInit() {
  //   if (this.email) {
  //     this.showEmailSpinner$ = this.email.statusChanges.pipe(map(
  //       status => status === 'PENDING'
  //     ))
  //   }
  // }

  // public sendEmail() {
  //   if (!this.canSubmitForgotPassword) {
  //     return
  //   }
  //   this.forgotPasswordSubmitting = true

  //   this.userService
  //     .sendForgotPasswordEmail(this.emailValue)
  //     .pipe(take(1))
  //     .subscribe(
  //       () => {
  //         this.forgotPasswordSubmitting = false
  //         this.viewSource.next(this.FORGOT_PASSWORD_SUCCESS)
  //         this.changeRef.markForCheck()
  //       },
  //       (err: HttpErrorResponse) => {
  //         this.forgotPasswordSubmitting = false
  //         this.logger.error(err.message, err.error)
  //         const errorType =
  //           err.status === 400 ? { email_format: true } : { server_error: true }
  //         this.email && this.email.setErrors(errorType)
  //         this.changeRef.markForCheck()
  //       }
  //     )
  // }

  public userSearchForm = this.fb.group({
    // email: [
    //   '',
    //   [validateEmail],
    //   [this.duplicateAsyncValidators.validateUnclaimedAccountExists()]
    // ],
    email: ['', [Validators.required, Validators.email], [this.emailValidators.validateEmailExists()]],
    username: [],
    creditCard: [],
    phoneNumber: [],
    firstName: [],
    lastName: [],
    stripeCustomerId: []
  })

  @Output() readonly genericSearchSubmitted = new EventEmitter<IUserSearch>()
  @Output() readonly emailSearchSubmitted = new EventEmitter<string>()

  constructor(
    private fb: FormBuilder,
    private emailValidators: EmailValidators
  ) { }

  search() {
    if (!this.userSearchForm.value) return

    if (isEmailOnly(this.userSearchForm.value)) {
      this.emailSearchSubmitted.next(this.email.value)
    } else {
      this.genericSearchSubmitted.emit(this.userSearchForm.value)
    }
  }

  public get email() {
    return this.userSearchForm.get('email')
  }

  public get emailControl() {
    return this.userSearchForm.controls.email
  }

  public showEmailError() {
    // console.log('hasRequiredError --', this.emailControl.hasError('required'))
    // console.log('hasDneError --', this.emailControl.hasError('email_does_not_exist'))
    // console.log('errors --', this.userSearchForm.errors)

    return (this.emailControl.touched && this.emailControl.invalid) || this.emailControl.hasError('email_does_not_exist')
  }

  // public showFormErrorComponent() {
  //   return (
  //     (this.forgotPasswordForm.controls.email.touched &&
  //       this.forgotPasswordForm.controls.email.invalid &&
  //       !this.forgotPasswordForm.controls.email.hasError(
  //         'unclaimed_account'
  //       )) ||
  //     this.forgotPasswordForm.controls.email.hasError('email_does_not_exist')
  //   )
  // }
}

export const isEmailOnly = (data: IUserSearch) => {
  return !!data.email &&
    !data.username &&
    !data.creditCard &&
    !data.phoneNumber &&
    !data.firstName &&
    !data.lastName &&
    !data.stripeCustomerId
}
