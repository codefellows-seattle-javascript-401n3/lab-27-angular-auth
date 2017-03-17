'use strict'

describe('delete gallery component', function () {
  beforeEach(() => {
    angular.mock.module('angularPhotoGallery')
    angular.mock.inject(($rootScope, $q, $componentController, galleryService) => {
      this.$rootScope = $rootScope
      this.$scope = this.$rootScope.$new()
      this.$q = $q
      this.$componentController = $componentController
      this.galleryService = galleryService
      this.sandbox = sinon.sandbox.create()
    })
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  describe('deleteGallery()', () => {
    beforeEach(() => {
      let Promise = this.$q
      
    })
  })
})
