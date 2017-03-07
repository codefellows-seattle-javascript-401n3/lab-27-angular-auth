'use strict';

let __API_URL__ = 'http:localhost://8000'
require('../app/service/pic-service.js')

describe('Auth Service', function(){

  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });
//in the below code, create a user and a token(like we did with theHillsHaveAPIs).
  // describe('authService.logout()', () => {
  //   it('should remove token from localStorage', () => {
  //     this.authService.token = null;
  //     this.$window.localStorage.setItem('token', 'test token');
  //
  //     this.authService.logout();
  //
  //     this.authService.getToken()
  //     .then( token => {
  //       expect(token).toEqual(null);
  //     })
  //
  //   });
  // });

  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'test token');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test token');
      })
      .catch( err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
    });
  });


});
