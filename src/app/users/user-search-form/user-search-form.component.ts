import { Component } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'csd-user-search-form',
  templateUrl: './user-search-form.component.html',
  styleUrls: ['./user-search-form.component.scss']
})
export class UserSearchFormComponent {
  public userSearchForm: FormGroup

  // @Output() searchEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userSearchForm = this.fb.group({
      email: []
    })
  }

  // ngOnInit() {
  //   this.form = this.fb.group({
  //     last_4_cc: ['', CreditCardValidator.validateLast4],
  //     email: [],
  //     username: [],
  //     phone_number: [],
  //     first_name: [],
  //     last_name: [],
  //     customer_id: []
  //   });
  // }
}
