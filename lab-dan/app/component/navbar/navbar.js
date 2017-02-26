'use strict'

require('./navbar.scss')

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'galleryService', NavbarController],
  controllerAs: 'navbarCtrl'
}

function NavbarController ($log, $location, $rootScope, authService, galleryService) {
  let self = this
  self.hideButtons = true

  // why I am assigning rootScope event listener to variable:
  // https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/on-watch.md
  let urlEventListener = $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath()
  })

  this.checkPath = function () {
    let path = $location.path()
    if (path === '/join') {
      this.hideButtons = true
    }

    if (path !== '/join') {
      this.hideButtons = false
      authService
        .getToken()
        .catch( () => {
          $location.url('/join#login')
        })
    }
  }

  this.checkPath()

  this.logout = function () {
    this.hideButtons = true
    galleryService.clearLocalGalleries()
    authService
      .logout()
      .then(() => {
        $location.url('/')
      })
  }
}
