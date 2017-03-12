'use strict'

require('./lib/test-setup')
const URL = `${__API_URL__}/api`
const token = 'testToken'
const angular = require('angular')

describe('auth service tests', function () {
  beforeEach(() => {
    angular.mock.module('angularPhotoGallery')
    angular.mock.inject(($rootScope, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope
      this.$window = $window
      this.$httpBackend = $httpBackend
      this.authService = authService
    })
  })

  describe('signup()', () => {
    it('should send a POST of a new user', () => {
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }

      let newUser = {
        username: 'testUser',
        password: 'testPassword',
        email: 'test@test.com'
      }

      this.$httpBackend
        .expectPOST(`${URL}/signup`, newUser, headers)
        .respond(200, token)

      this.authService.signup(newUser)
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })

  describe('login()', () => {
    it('should send a GET request to login', () => {
      let user = {
        username: 'test',
        password: 'test1234'
      }

      let base64 = this.$window.btoa(`${user.username}:${user.password}`)

      let headers = {
        Authorization: `Basic ${base64}`,
        Accept: 'application/json'
      }

      this.$httpBackend
        .expectGET(`${URL}/login`, headers)
        .respond(200, token)

      this.authService.login(user)
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })

  describe('getToken()', () => {
    it('should get token from localStorage', () => {
      this.authService.token = null
      this.$window.localStorage.setItem('token', token)
      this.authService
        .getToken()
        .then( res => {
          expect(res).toEqual(token)
        })
    })
  })
})
