import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService, ILoginCredentials, IUser } from './auth.service'

describe(AuthService.name, () => {
  // let service: AuthService
  // let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [AuthService]
    })

    // httpMock = TestBed.get(HttpTestingController)
    // service = TestBed.get(AuthService)
  })

  // afterEach(() => {
  //   httpMock.verify()
  // })

  describe(':', () => {
    function setup() {
      const authService = TestBed.get(AuthService)
      const httpTestingController = TestBed.get(HttpTestingController)
      return { authService, httpTestingController }
    }

    it('should be created', () => {
      const { authService } = setup()
      expect(authService).toBeTruthy()
    })

    // TODO: This test is not hitting the .subscribe block yet
    it('should POST', () => {
      const { authService, httpTestingController } = setup()
      authService.login().subscribe(res => {
        console.log('in here')
        expect(false).toBeTruthy()
        expect(res).toEqual('foobar')
      })

      const req = httpTestingController.expectOne('https://staging-api.flosports.tv/api/tokens')

      expect(req.request.method).toBe('POST')

      req.flush(mockLoginCreds)
    })

    afterEach(() => {
      const { httpTestingController } = setup()
      httpTestingController.verify()
    })

  })

  // it('should be ccreated', () => {
  //   expect(service).toBeTruthy();
  // })

  // it('should return POST blah blah ', () => {

  // })
})

const mockLoginCreds: ILoginCredentials = { email: 'foo@bar.com', password: 'foobar' }
const mockAdminUser: IUser = {
  email: 'foo@bar.com',
  id: 23,
  roles: ['ROLE_USER', 'ROLE_ADMIN'],
  universal: true
}
