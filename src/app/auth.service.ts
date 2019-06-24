import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(email: string, password: string) {
    console.log('will attempt login, ', email, password)

    // return this.http.post<User>('/api/login', {email, password})
    // // this is just the HTTP call, 
    // // we still need to handle the reception of the token
    // .shareReplay();
  }
}
