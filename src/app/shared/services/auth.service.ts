import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { shareReplay, tap, map, catchError } from 'rxjs/operators'
import { throwError, BehaviorSubject, Observable } from 'rxjs'
import * as moment from 'moment'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken)
  public isLoggedIn$ = this.isLoggedInSubject.asObservable()

  private userSubject = new BehaviorSubject<IUser | undefined>(this.getUserFromToken())
  public user$ = this.userSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(credentials: ILoginCredentials) {
    return this.http.post<ITokenResponse>(`${STAGING_BASE_URL}/api/tokens`, credentials)
      .pipe(
        catchError(handleLoginError),
        map(mapITokenResponseToIToken),
        tap(token => ensureRoleAdmin(token)),
        tap(token => this.updateUser(token.user)),
        tap(setSession),
        shareReplay(1)
      )
  }

  public logout() {
    localStorage.clear()
    this.updateLoggedIn(false)
    this.router.navigate(['login'])
  }

  public updateLoggedIn(loggedIn: boolean) {
    this.isLoggedInSubject.next(loggedIn)
  }

  public updateUser(user: IUser | undefined) {
    this.userSubject.next(user)
  }

  /**
   * If there is an 'id_token' that is not expired, then the user is logged in.
   */
  private get hasValidToken() {
    return !!localStorage.getItem('id_token') && moment().isBefore(this.jwtExpiration)
  }

  private get jwtExpiration() {
    return moment(JSON.parse(localStorage.getItem('expires_at')))
  }

  private getUserFromToken() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

// TODO: need env variables somehow
export const STAGING_BASE_URL = 'https://staging-api.flosports.tv'

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IUser {
  birthday?: string
  country?: string
  created_at?: string
  email?: string
  enabled?: boolean
  facebook_id?: string
  first_name?: string
  gender?: string
  id: number
  last_name?: string
  mile_split_user_id?: number
  modified_at?: string
  new_facebook_user?: boolean
  phone?: string
  profile_picture_url_large?: string
  profile_picture_url_medium?: string
  profile_picture_url_small?: string
  roles?: ReadonlyArray<string>
  site_id?: number
  site_ids?: ReadonlyArray<number>
  spammer?: boolean
  universal?: boolean
  user_subscriptions?: ReadonlyArray<any> // TODO: UserSubscription interface
  username?: string
  zip?: string
}

export interface ITokenResponse {
  user: any // TODO if needed
  user_id: number
  refresh_token: string
  refresh_token_exp: number // TODO: timestamp type?
  token: string
  exp: number // TODO: timestamp type?
}

export interface IToken {
  id_token: string
  expires_at: number // TODO: timestamp type?
  user: IUser
}

export interface ILoginError {
  status: number
  message: string
}

export function mapITokenResponseToIToken(tokenResponse: ITokenResponse): IToken {
  return {
    id_token: tokenResponse.token,
    expires_at: tokenResponse.exp,
    user: tokenResponse.user
  }
}

/* Slightly modified from Angular docs on error handling -- https://angular.io/guide/http#!#fetch-data-with-_http-get-_ */
export function handleLoginError(errorResponse: HttpErrorResponse): Observable<never> {
  const msg = !errorResponse.error ? 'Whoops! An unknown error occurred.'
    : errorResponse.error instanceof ErrorEvent ? buildLoginErrorMessage(errorResponse.status, `Whoops! A network error occurred: ${errorResponse.error.message}. Please try again.`)
      : buildLoginErrorMessage(errorResponse.status, errorResponse.error.message)

  return throwError(msg)
}

export function ensureRoleAdmin(token: IToken) {
  const user = token.user
  const acceptedRoles = ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
  const found = acceptedRoles.some(role => user && user.roles.includes(role))

  if (!found || !user) {
    // TODO: What is the difference between this and...
    // return throwError('This account does not have admin access.')?
    // throwError did not work for some reason
    throw new Error('This account does not have admin access.')
  }

  return token
}

/**
 * Set localStorage based on token values received from a successful login attempt.
 */
export function setSession(token: IToken): void {
  localStorage.setItem('id_token', token.id_token)
  localStorage.setItem('expires_at', JSON.stringify(moment.unix(token.expires_at)))
  localStorage.setItem('user', JSON.stringify(token.user))
}

export function buildLoginErrorMessage(status: number, message: string): ILoginError {
  return {
    status,
    message
  }
}
