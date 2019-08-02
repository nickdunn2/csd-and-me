import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'
import { MockAuthService, validCredentials } from 'src/testing/mock-auth.service'

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

    expect(form).toBeTruthy()
    expect(form.get('email').value).toBe('')
    expect(form.get('password').value).toBe('')
    expect(form.valid).toBeFalsy()
    expect(component.canSubmitForm).toBeFalsy()
  })

  it('should be a valid form when email and password are filled in', () => {
    component.loginForm.setValue(validCredentials)

    expect(component.loginForm.valid).toBeTruthy()
    expect(component.canSubmitForm).toBeTruthy()
  })

  it('should call appropriate AuthService methods when valid form is submitted', () => {
    const authLoginSpy = spyOn(TestBed.get(AuthService), 'login').and.callThrough()
    const authUpdateLoggedInSpy = spyOn(TestBed.get(AuthService), 'updateLoggedIn')

    component.loginForm.setValue(validCredentials)

    component.login()

    expect(authLoginSpy).toHaveBeenCalledWith(validCredentials)
    expect(authUpdateLoggedInSpy).toHaveBeenCalledWith(true)
  })
})
