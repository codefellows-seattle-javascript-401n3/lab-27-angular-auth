'use strict'

require('./home.scss')

module.exports = [
  '$log',
  '$location',
  '$rootScope',
  '$scope',
  'authService',
  'galleryService',
  HomeController
]

function HomeController ($log, $location, $rootScope, $scope, authService, galleryService) {
  let self = this
  self.title = 'Welcome to the home page!'
  self.galleries = []
  let urlChangeEvent = $rootScope.$on('$locationChangeSuccess', () => {
    self.fetchGalleries()
  })
  let fetchGalleriesEvent = $scope.$on('fetchGalleries', () => {
    $log.debug('fetch galleries called')
    self.fetchGalleries()
  })

  authService
    .getToken()
    .then(() => {
      $location.url('/home')
    })
    .catch( err => {
      $location.url('/')
    })

  self.fetchGalleries = function () {
    galleryService
      .getGalleries()
      .then( galleries => {
        self.galleries = galleries
      })
  }

  self.fetchGalleries()
}
