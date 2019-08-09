import { Component } from '@angular/core'
import { AuthService } from '../shared/services/auth.service'
import { UserService, IUserSearch } from '../shared/services/user.service'

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

  public search(searchData: IUserSearch) {
    this.userService.search(searchData)
  }
}
