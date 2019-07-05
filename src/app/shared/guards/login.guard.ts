import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { map } from 'rxjs/operators'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(ars: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('in the login guard')
    return this.auth.isLoggedIn$
      .pipe(
        map(isLoggedIn => {
          if (!isLoggedIn) {
            return true
          }

          return this.router.createUrlTree(['users'])
        }))
  }
}