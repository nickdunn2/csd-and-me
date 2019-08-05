import { Component } from '@angular/core'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'csd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public user$ = this.auth.user$
  constructor(private auth: AuthService) { }

  public logout() {
    this.auth.logout()
  }
}
