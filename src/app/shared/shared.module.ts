import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoginGuard } from './guards/login.guard'
import { UsersGuard } from './guards/users.guard'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    LoginGuard,
    UsersGuard
  ]
})
export class SharedModule { }
