import { Injectable } from "@angular/core"
import { ILoginCredentials } from 'src/app/shared/services/auth.service'
import { of, BehaviorSubject } from 'rxjs';

@Injectable()
export class MockAuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false)
    public isLoggedIn$ = this.isLoggedInSubject.asObservable()

    public login(credentials: ILoginCredentials) {
        if (credentials.email === validEmail) { // TODO: For some reason credentials == validCredentials returns false
            return of({
                id_token: 'validtoken',
                expires_at: 'somefuturedate',
                user: 'good user' // TODO: needs typing
            })
        }


        // return this.http.post<ITokenResponse>(`${this.STAGING_BASE_URL}/api/tokens`, credentials)
        //   .pipe(
        //     catchError(handleLoginError),
        //     // TODO: Add a step in here that checks for Admin? Also could set some type of user$ stream in here as well.
        //     map(mapITokenResponseToIToken),
        //     tap(token => ensureRoleAdmin(token)),
        //     tap(token => this.updateUser(token.user)),
        //     tap(setSession),
        //     shareReplay(1)
        //   )
    }

    public updateLoggedIn(loggedIn: boolean) {
        this.isLoggedInSubject.next(loggedIn)
    }
}



export const validEmail = 'valid@email.com'
export const validPassword = 'validpassword'
export const validCredentials: ILoginCredentials = {
    email: validEmail,
    password: validPassword
}
export const invalidEmail = 'invalid@email.com'
export const invalidPassword = 'invalidpassword'
export const invalidCredentials: ILoginCredentials = {
    email: invalidEmail,
    password: invalidPassword
}