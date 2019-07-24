import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

describe(LoginComponent.name, () => {
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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// TODO: Move this to its own file (in a /test or /mocks directory)
export class MockAuthService {

}
