# CSD Revamp
## Goals
1. Contribute to the business.
  * Make life easier for Customer Service.
  * Improve retention.
2. Become a more valuable, more complete developer by learning how to "own" a project.
3. Have fun with it!
4. More to come...

## Roadmap
### Login Page
- [x] Understand JWT with Angular (set "session" via localStorage upon successful login)
- [x] `isLoggedIn$` stream in `AuthService`
- [x] set a `user$` stream upon successful login
- [x] add some type of `getUserFromToken()` method for refreshes when logged in
- [x] LoginForm error handling
- [x] Disallow users without `ADMIN` status from logging in?
- [x] Correctly route to `/users` after successful login
- [x] LoginGuard (direct to `/users` if user is already logged in)

### Break for Unit Tests
- [ ] `AuthService`
- [ ] `LoginComponent`
- [ ] `LoginGuard`
- [ ] `UsersGuard`

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

### Miscellaneous (Project "Ownership")
- [ ] Organization of SCSS (e.g., variables file, global classes, mixins, etc)
- [ ] Environment variables (e.g., different API base urls based on local/staging/prod)
- [ ] e2e testing with Cypress (Matt E's FE Guild presentation on 7/18/19)
- [ ] The build process (`npm run start.staging`, for example. fusebox? Angular CLI?)
- [ ] Error handling + logging (where to send the errors that occur, where to monitor)
- [ ] How/where to deploy
- [ ] Best practices on keeping projects up-to-date (e.g., Angular updates)
- [ ] Move this project to Flo repo and allow others to contribute
- [ ] From "Build New Services" presentation on project health (Logging, Monitoring, Alerting, CI, Time to Deploy, Automated Tests, Unit Tests)
- [ ] Look at "dockerizing"

### Future Improvement Ideas
- [ ] Finish off any LoginForm styling improvements
- [ ] Some type of user "churn predictor score" on the profile page, based on recent metrics (Note: Data Team has a Q3 goal to come up with a "User Health Model" that sounds like it could be highly related to this)
- [ ] Show "possible matches" (possible typos, etc) when searching for an email that doesn't exist in our system


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
