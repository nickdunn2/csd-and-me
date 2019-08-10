import { Component } from '@angular/core'
import { AuthService, IUser } from '../shared/services/auth.service'
import { UserService, IUserSearch } from '../shared/services/user.service'
import { take } from 'rxjs/operators';

@Component({
  selector: 'csd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public user$ = this.auth.user$
  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  public logout() {
    this.auth.logout()
  }

  public searchByEmail(email: string) {
    this.userService.searchByEmail(email)
      .pipe(take(1))
      .subscribe((user: IUser) => {
        console.log('user --', user)
      })
  }

  // public search(searchData: IUserSearch) {
  //   this.userService.search(searchData)
  //     .pipe(
  //       take(1)
  //     ).subscribe((user: IUser) => {
  //       console.log('user --', user)
  //     })
  // }
}
