import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { STAGING_BASE_URL } from './auth.service'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  search(searchData: IUserSearch) {
    if (isEmailOnly(searchData)) {
      console.log('email only')
      // return email API call here
      return this.http.get(`${STAGING_BASE_URL}/api/users/email/${searchData.email}`)
        .pipe(take(1))
        .subscribe(res => console.log('res --', res))
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
    }

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

export const isEmailOnly = (data: IUserSearch) => {
  return !!data.email &&
    !data.username &&
    !data.creditCard &&
    !data.phoneNumber &&
    !data.firstName &&
    !data.lastName &&
    !data.stripeCustomerId
}
