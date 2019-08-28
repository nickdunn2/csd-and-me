import { HttpClient } from '@angular/common/http'
import { FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'
import { STAGING_BASE_URL } from '../services/auth.service'
import { debounceTime, map, shareReplay } from 'rxjs/operators'
import { of } from 'rxjs'


// tslint:disable:no-null-keyword
@Injectable()
export class EmailValidators {
  public static readonly DEBOUNCE_TIME_SECONDS = 1000

  constructor(
    private http: HttpClient
  ) { }

  public validateEmailExists() {
    return (control: FormControl) => {
      // return of({ email_does_not_exist: true })
      if (control && control.value) {
        console.log('in here')

        return this.http.get<IEmailValidation>(`${STAGING_BASE_URL}/api/users/check-email-exists/${control.value}`)
          .pipe(
            debounceTime(EmailValidators.DEBOUNCE_TIME_SECONDS),
            map(email => {
              console.log('email.exists', email.exists)
              return !email.exists ? { email_does_not_exist: true } : null
            }),
            shareReplay(1)
          )
      }

      return of(null)
    }
  }

  // public validateEmailExists(excludeDisabledUser = false) {
  //   return (control: FormControl) => {
  //     if (control && control.value) {
  //       const url = `users/check-email-exists/${
  //         control.value
  //         }?excludeDisabledUser=${excludeDisabledUser ? 1 : 0}`
  //       return this.http
  //         .get<{
  //           exists: boolean
  //           unclaimedAccount: boolean
  //           migratedSite: string
  //         }>(url)
  //         .pipe(
  //           this.debounce(),
  //           map(email => {
  //             if (email.unclaimedAccount) {
  //               return { unclaimed_account: { customText: email.migratedSite } }
  //             } else if (!email.exists) {
  //               return { email_does_not_exist: true }
  //             }
  //             return null
  //           })
  //         )
  //     }
  //     return of(null)
  //   }
  // }

  // // TODO: write tests around new values
  // // TODO: this method and validateEmailExists should probably be combined
  // public validateEmailDoesNotExist(excludeDisabledUser = false) {
  //   return (control: FormControl) => {
  //     if (control && control.value) {
  //       const url = `users/check-email-exists/${
  //         control.value
  //         }?excludeDisabledUser=${excludeDisabledUser ? 1 : 0}`
  //       return of(control.value).pipe(
  //         this.debounce(),
  //         flatMap(() =>
  //           this.http.get<{
  //             exists: boolean
  //             unclaimedAccount: boolean
  //             migratedSite: string
  //           }>(url)
  //         ),
  //         map(email => {
  //           if (email.unclaimedAccount) {
  //             return { unclaimed_account: { customText: email.migratedSite } }
  //           } else if (email.exists) {
  //             return { email_exists: true }
  //           }
  //           return null
  //         })
  //       )
  //     }
  //     return of(null)
  //   }
  // }

  // public validateUsernameDoesNotExist() {
  //   return (control: FormControl) => {
  //     if (control && control.value) {
  //       return of(control.value).pipe(
  //         this.debounce(),
  //         flatMap(username =>
  //           this.http.get<{ exists: boolean }>(
  //             `users/check-username-exists/${username}`
  //           )
  //         ),
  //         map(username => {
  //           if (username.exists) {
  //             return { username_exists: true }
  //           }
  //           return null
  //         })
  //       )
  //     }
  //     return of(null)
  //   }
  // }

  // // TODO: Write tests around this
  // public validateUnclaimedAccountExists(): ValidatorFn {
  //   return (control: FormControl) => {
  //     if (control && control.value) {
  //       const url = `users/check-email-exists/${
  //         control.value
  //         }?excludeDisabledUser=0`
  //       return of(control.value).pipe(
  //         this.debounce(),
  //         flatMap(() =>
  //           this.http.get<{
  //             exists: boolean
  //             unclaimedAccount: boolean
  //             migratedSite: string
  //           }>(url)
  //         ),
  //         map(email => {
  //           return email.unclaimedAccount
  //             ? {
  //               unclaimed_account: { customText: email.migratedSite }
  //             }
  //             : null
  //         })
  //       )
  //     }
  //     return of(null)
  //   }
  // }
}

export interface IEmailValidation {
  exists: boolean
  unclaimedAccount: boolean
  migratedSite: string
}

/**
 * Check for "emails" that don't have a domain.tld after the @
 * The email RFC says that jerry@localhost is valid, but for our usecases we don't want it
 */
const TLD_CHECK = /@.+\..+$/

export function validateEmail(
  control: AbstractControl
): ValidationErrors | undefined {
  return control.value !== '' &&
    control.value !== null &&
    control.value.length >= 6 &&
    (!TLD_CHECK.test(control.value) || Validators.email(control))
    ? { email_format: true }
    : undefined
}
