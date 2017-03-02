'use strict'

require('./scss/main.scss')

const path = require('path')
const angular = require('angular')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const uiRouter = require('angular-ui-router')
const ngTouch = require('angular-touch')
const ngAnimate = require('angular-animate')
const ngFileUpload = require('ng-file-upload')

angular.module('angularAuth', [ngTouch, ngAnimate, uiRouter, ngFileUpload])

angular.module('angularAuth').config(['$httpProvider', corsSettings])

function corsSettings ($httpProvider) {
  $httpProvider.defaults.useXDomain = true
}

let context = require.context('./config/', true, /\.js$/)
context.keys().forEach( path => {
  angular.module('angularAuth').config(context(path))
})

context = require.context('./view/', true, /\.js$/)
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('angularAuth').controller(name, module)
})

context = require.context('./service/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('angularAuth').service(name, module)
})

context = require.context('./component/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('angularAuth').component(name, module)
})
