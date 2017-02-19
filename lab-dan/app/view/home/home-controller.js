'use strict'

require('./home.scss')

module.exports = ['$log', 'HomeController']

function HomeController ($log) {
  $log.debug('this is the home controller')
  let self = this
  self.title = 'Welcome to the home page!'
}
