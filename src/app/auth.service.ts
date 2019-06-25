import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { shareReplay, tap, map, catchError } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STAGING_BASE_URL = 'https://staging-api.flosports.tv'
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken)
  public isLoggedIn$ = this.isLoggedInSubject.asObservable()

  constructor(private http: HttpClient) { }

  public login(credentials: ILoginCredentials) {
    return this.http.post<ITokenResponse>(`${this.STAGING_BASE_URL}/api/tokens`, credentials)
      .pipe(
        catchError(this.handleError),
        map(mapITokenResponseToIToken),
        tap(this.setSession),
        shareReplay(1)
      )
  }

  public logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.isLoggedInSubject.next(false)
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

  private setSession(token: IToken): void {
    localStorage.setItem('id_token', token.id_token)
    localStorage.setItem('expires_at', JSON.stringify(moment.unix(token.expires_at)))
    this.isLoggedInSubject.next(true)
  }

  /* Taken directly from Angular docs on error handling -- https://angular.io/guide/http#!#fetch-data-with-_http-get-_ */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

export interface ILoginCredentials {
  email: string
  password: string
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
}

export function mapITokenResponseToIToken(tokenResponse: ITokenResponse): IToken {
  return {
    id_token: tokenResponse.token,
    expires_at: tokenResponse.exp
  }
}

