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
      this.sandbox.stub(this.galleryService, 'deleteGallery').resolves()
    })

    it('should call the galleryService delete method', () => {
      let deleteComponent = this.$componentController('deleteGallery')
      deleteComponent.deleteGallery()
      this.$scope.$apply()
      expect(this.galleryService.deleteGallery.calledOnce).toBeTruthy()
    })

  })

  describe('cancel delete event', () => {

    it('should emit the cancel event', () => {
      let cancel = this.sandbox.spy(this.$scope, '$emit')
      let deleteComponent = this.$componentController('deleteGallery', {$scope: this.$scope})
      deleteComponent.cancel()
      expect(cancel.calledOnce).toBeTruthy()
      expect(cancel.calledWith('hideDelete')).toBeTruthy()
    })

  })
})
