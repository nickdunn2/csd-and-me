import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { STAGING_BASE_URL, IUser } from './auth.service'
import { map, catchError, shareReplay } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  searchByEmail(email: string): Observable<IUser> {
    return this.http.get<IFloApiResponse>(`${STAGING_BASE_URL}/api/users/email/${email}`)
      .pipe(
        catchError(handleSearchError),
        map(res => res.data),
        shareReplay(1)
      )
    // return this.http
    //   .get(url + 'api/users/email/' + userSearch.email, requestOptions)
    //   .map(r => r.json().data)
    //   .map(user => {
    //     const userRow = this.transformUserToUserRow(user);
    //     const userTable = new UserTable(userRow ? [userRow] : [], userRow.name !== null, userRow.card_expiration_date !== null);

    //     return new Pagination<UserTable>(
    //       0,
    //       0,
    //       userTable
    //     );
    //   })
    // }

    // return multi-faceted API call here
  }


}

export interface IUserSearch {
  email?: string
  username?: string
  creditCard?: string,
  phoneNumber?: string,
  firstName?: string,
  lastName?: string,
  stripeCustomerId?: string
}

/* Slightly modified from Angular docs on error handling -- https://angular.io/guide/http#!#fetch-data-with-_http-get-_ */
/* TODO: Look into combining this with AuthService's handleLoginError for more generic error handling */
export const handleSearchError = (errorResponse: HttpErrorResponse): Observable<never> => {
  const msg = !errorResponse.error ? 'Whoops! An unknown error occurred.'
    : errorResponse.status === 404 ? buildSearchErrorMessage(errorResponse.status, 'Email not found.')
      : buildSearchErrorMessage(errorResponse.status, errorResponse.error.message)

  return throwError(msg)
}

export const buildSearchErrorMessage = (status: number, message: string): ISearchError => {
  return {
    status,
    message
  }
}

export interface ISearchError {
  status: number
  message: string
}

export interface IFloApiResponse {
  meta: any
  data: any
}
