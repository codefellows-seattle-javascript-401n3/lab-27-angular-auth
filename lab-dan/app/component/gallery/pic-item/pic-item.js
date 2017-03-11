'use strict'

require('./pic-item.scss')

module.exports = {
  template: require('./pic-item.html'),
  controller: ['$log', '$scope', 'picService', PicItemController],
  controllerAs: 'picItemCtrl',
  bindings: {
    pic: '<',
    gallery: '<'
  }
}

function PicItemController ($log, $scope, picService) {
  let self = this
  self.displayUpdateForm = false
  self.displayDeleteForm = false
  self.displayPic = true

  self.$onInit = function () {
    self.pic.galleryId = self.gallery._id
  }

  let hideDeleteFormEvent = $scope.$on('hide delete form', function () {
    return self.changeDisplayDeleteStatus()
  })

  self.changeDisplayDeleteStatus = function () {
    return self.displayDeleteForm = !self.displayDeleteForm
  }

  // Slugram doesn't have an update route. Sad.
  // let hideUpdateFormEvent = $scope.$on('hide update form', function () {
  //   return self.changeDisplayUpdateStatus()
  // })
  // self.changeDisplayUpdateStatus = function () {
  //   return self.displayUpdateForm = !self.displayUpdateForm
  // }
}
