import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

fdescribe(LoginComponent.name, () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: new MockAuthService() },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a login form (invalid by default) with blank values after instantiation', () => {
    const form = component.loginForm
    const email = form.get('email')
    const password = form.get('password')

    expect(form).toBeTruthy()
    expect(email.value).toBe('')
    expect(password.value).toBe('')
    expect(form.valid).toBeFalsy()
  })
});

// TODO: Move this to its own file (in a /test or /mocks directory)
export class MockAuthService {

}
