# CSD Revamp Roadmap
### Login Page
- [x] Understand JWT with Angular (set "session" via localStorage upon successful login)
- [x] `isLoggedIn$` stream in `AuthService`
- [ ] set a `user$` stream upon successful login
- [ ] LoginForm styling
- [ ] LoginForm error handling
- [ ] Disallow users without `ADMIN` status from logging in?
- [ ] Correctly route to `/users` after successful login
- [ ] LoginGuard (direct to `/users` if user is already logged in)
- [ ] Unit tests

### User Search Form
- [ ] Build out user search form functionality
- [ ] Style it (emphasis on improving mobile-friendliness)
- [ ] Error handling
- [ ] Conditionally show results (table?) based on successful search attempt
- [ ] Guard for `/users` route (go to `/login` if unauthorized)
- [ ] Unit tests

### User Profile Page
- [ ] Separate route for `/users/{id}` when clicking from table
- [ ] Build out user profile functionality
- [ ] Style it (emphasis on improving mobile-friendliness)
- [ ] Error handling (for things like the "Magic Button")
- [ ] Guard (go to `login` if unauthorized)
- [ ] Unit tests

### Miscellaneous
- [ ] Environment variables (e.g., different API base urls based on local/staging/prod)
- [ ] The build process (`npm run start.staging`, for example. fusebox? Angular CLI?)
- [ ] Error handling + logging (where to send the errors that occur, where to monitor)
- [ ] How/where to deploy
- [ ] Move this project to Flo repo and allow others to contribute

### Future Improvement Ideas
- [ ] Some type of user "churn predictor score" on the profile page, based on recent metrics 


# CsdAndMe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
