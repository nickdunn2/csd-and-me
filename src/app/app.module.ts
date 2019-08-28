import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { SharedModule } from './shared/shared.module'
import { UsersComponent } from './users/users.component'
import { LoginGuard } from './shared/guards/login.guard'
import { UsersGuard } from './shared/guards/users.guard'
import { UserSearchFormComponent } from './users/user-search-form/user-search-form.component'
import { HeaderComponent } from './header/header/header.component'

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'users', component: UsersComponent, canActivate: [UsersGuard] },
  // TODO { path: 'users/:id', component: UserDetailComponent, canActivate: [UsersGuard] },
  // TODO { path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UsersComponent,
    UserSearchFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
