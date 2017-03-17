'use strict'

describe('update gallery component test', function () {
  beforeEach(() => {
    angular.mock.module('angularPhotoGallery')
    angular.mock.inject(($rootScope, $q, $componentController, galleryService) => {
      this.$rootScope = $rootScope
      this.$scope = $rootScope.$new()
      this.$q = $q
      this.$componentController = $componentController
      this.galleryService = galleryService
      this.sandbox = sinon.sandbox.create()
    })
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  describe('test bindings', () => {
    it('should have the correct bindings on load', () => {
      let testBindings = {
        gallery: {
          _id: 1234,
          name: 'TestBinding',
          desc: 'This is to test the bindings'
        }
      }

      let updateComponent = this.$componentController('updateGallery', null, testBindings)
      updateComponent.$onInit()
      expect(updateComponent.galleryUpdate._id).toEqual(testBindings.gallery._id)
      expect(updateComponent.galleryUpdate.name).toEqual(testBindings.gallery.name)
      expect(updateComponent.galleryUpdate.desc).toEqual(testBindings.gallery.desc)
    })
  })

  describe('updateGallery()', () => {

    beforeEach(() => {
      let Promise = this.$q
      this.sandbox.stub(this.galleryService, 'updateGallery').resolves()
    })

    it('should call the galleryService', () => {
      let updateComponent = this.$componentController('updateGallery')
      updateComponent.updateGallery()
      this.$scope.$apply()
      expect(this.galleryService.updateGallery.calledOnce).toBeTruthy()
    })
  })
})
