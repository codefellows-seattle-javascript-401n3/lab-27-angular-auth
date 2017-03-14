'use strict';

describe('Gallery Up Component', function(){
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

  describe('galleryUpCtrl.deleteGallery()', () => {
    it('should call deleteGallery', () => {
      this.$window.localStorage.setItem('token', 'test token');
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: [],
        },
        deleteGallery: function(data){
          expect(data.galleryData._id).toEqual('12345');
        }
      };

      let galleryUpCtrl = this.$componentController('galleryUp', null, mockBindings);
      galleryUpCtrl.deleteGallery({galleryData: galleryUpCtrl.gallery});

      // this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
