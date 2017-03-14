'use strict'

module.exports = [
  '$log',
  '$location',
  signupService
]

function signupService ($log, $location) {
  let service = {}
  let url = $location.url()
  service.showSignup = url === '/join#signup' || url === '/join'

  service.changeStatus = function () {
    return service.showSignup = !service.showSignup
  }

  return service
}
