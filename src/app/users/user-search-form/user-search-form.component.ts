import { Component, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { IUserSearch } from 'src/app/shared/services/user.service'

@Component({
  selector: 'csd-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent {
  public userSearchForm: FormGroup

  @Output() readonly searchSubmitted = new EventEmitter<IUserSearch>()

  constructor(private fb: FormBuilder) {
    this.userSearchForm = this.fb.group({
      email: [],
      username: [],
      creditCard: [],
      phoneNumber: [],
      firstName: [],
      lastName: [],
      stripeCustomerId: []
    })
  }

  search() {
    this.searchSubmitted.emit(this.userSearchForm.value)
  }
}
