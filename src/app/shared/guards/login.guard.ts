import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { map, take } from 'rxjs/operators'

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(ars: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$
      .pipe(
        take(1),
        map(isLoggedIn => {
          if (!isLoggedIn) {
            return true
          }

          return this.router.createUrlTree(['users'])
        }))
  }
}