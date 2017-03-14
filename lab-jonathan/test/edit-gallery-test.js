'use strict';

describe('Edit Gallery Component', function(){
  beforeEach(() => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    })
  });

  describe('editGalleryCtrl.updateGallery()', () => {
    it('should call updateGallery', () => {
      this.$window.localStorage.setItem('token', 'test token');
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: [],
        },
        updateGallery: function(data){
          expect(data.galleryData._id).toEqual('12345');
        }
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.updateGallery({galleryData: editGalleryCtrl.gallery});

      // this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
