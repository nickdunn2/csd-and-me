import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  search(searchData: IUserSearch) {
    console.log('in the service', searchData)
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
