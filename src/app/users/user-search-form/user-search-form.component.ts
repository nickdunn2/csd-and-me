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

  @Output() readonly genericSearchSubmitted = new EventEmitter<IUserSearch>()
  @Output() readonly emailSearchSubmitted = new EventEmitter<string>()

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
    if (!this.userSearchForm.value) return

    if (isEmailOnly(this.userSearchForm.value)) {
      this.emailSearchSubmitted.next(this.userSearchForm.get('email').value)
    } else {
      this.genericSearchSubmitted.emit(this.userSearchForm.value)
    }
  }
}

export const isEmailOnly = (data: IUserSearch) => {
  return !!data.email &&
    !data.username &&
    !data.creditCard &&
    !data.phoneNumber &&
    !data.firstName &&
    !data.lastName &&
    !data.stripeCustomerId
}
