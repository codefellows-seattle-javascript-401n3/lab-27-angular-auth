// // 'use strict';
//
// // require('angular-mocks');
//
// describe('Auth Service', function() {
//   beforeEach(() => {
//     angular.mock.module('cfgram');
//     angular.mock.inject(($rootScope, authService, $window, $httpBackend) => {
//       this.$window = $window;
//       this.$rootScope = $rootScope;
//       this.authService = authService;
//       this.$httpBackend = $httpBackend;
//     });
//   });
//
//   describe('authService.getToken()', () => {
//     it('should return a token', () => {
//       this.$window.localStorage.setItem('token', 'test token');
//
//       this.authService.getToken()
//       .then(token => {
//         expect(token).toEqual('test token');
//       });
//
//       this.$window.localStorage.removeItem('token');
//       this.$rootScope.$apply();
//     });
//
//     it('should return "Error token not found"', () => {
//       this.authService.getToken()
//       .catch(err => {
//         expect(err).toEqual(new Error('token not found'));
//       });
//
//       this.$rootScope.$apply();
//     });
//   });
// });
