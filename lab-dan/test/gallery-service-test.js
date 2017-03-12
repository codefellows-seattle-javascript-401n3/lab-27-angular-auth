'use strict'

require('./lib/test-setup')
// this is to correct a phantomJS known bug
// https://github.com/ariya/phantomjs/issues/14211
require('babel-polyfill')

const URL = `${__API_URL__}/api/gallery`
const token = 'testToken'

const angular = require('angular')

describe('gallery service tests', function () {
  beforeEach(() => {
    angular.mock.module('angularPhotoGallery')
    angular.mock.inject(($rootScope, $window, $httpBackend, authService, galleryService) => {
      this.$rootScope = $rootScope
      this.$window = $window
      this.$httpBackend = $httpBackend
      this.authService = authService
      this.galleryService = galleryService
    })
    this.$window.localStorage.setItem('token', token)
  })
  describe('createGallery()', () => {
    it('should post the correct data', () => {
      let newGallery = {
        name: 'test name',
        desc: 'test description'
      }

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }

      this.$httpBackend
        .expectPOST(URL, newGallery, headers)
        .respond(200, {
          _id: 1234,
          username: 'testuser',
          name: newGallery.name,
          desc: newGallery.desc,
          pics: []
        })

      this.galleryService.createGallery(newGallery)
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })

  })

  describe('getGalleries()', () => {
    it('should send a get request', () => {
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }

      this.$httpBackend
        .expectGET(URL, headers)
        .respond(200, {
          _id: 1234,
          username: 'testuser',
          data: []
        })

      this.galleryService.getGalleries()
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })

  describe('updateGallery()', () => {
    it('should send a PUT request', () => {
      let galleryId = 1234
      let updatedGallery = {
        _id: galleryId,
        name: 'test name',
        desc: 'test description'
      }
      this.galleryService.galleries.push(updatedGallery)

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }

      this.$httpBackend
        .expectPUT(`${URL}/${galleryId}`, updatedGallery, headers)
        .respond(200, {
          _id: 1234,
          username: 'testuser',
          name: updatedGallery.name,
          desc: updatedGallery.desc,
          pics: []
        })

      this.galleryService.updateGallery(updatedGallery)
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })

  describe('deleteGallery()', () => {
    it('should send a DELETE request', () => {
      let galleryId = 1234
      let galleryToDelete = {
        _id: galleryId,
        name: 'test name',
        desc: 'test description'
      }
      this.galleryService.galleries.push(galleryToDelete)

      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }

      this.$httpBackend
        .expectDELETE(`${URL}/${galleryId}`, headers)
        .respond(204)

      this.galleryService.deleteGallery(galleryToDelete)
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })
})
