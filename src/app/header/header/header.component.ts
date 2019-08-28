import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'csd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$ = this.auth.user$

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout()
  }
}
