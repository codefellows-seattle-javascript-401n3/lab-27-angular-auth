'use strict'

require('./delete-pic.scss')

module.exports = {
  template: require('./delete-pic.html'),
  controller: ['$log', '$scope', 'picService', DeletePicController],
  controllerAs: 'deletePicCtrl',
  bindings: {
    pic: '<'
  }
}

function DeletePicController ($log, $scope, picService) {
  let self = this

  self.hideForm = function () {
    $scope.$emit('hide delete form')
    // this isn't the best way to do this. Not great user experience. But for now, it is a workable solution
    $scope.$emit('fetchGalleries')
  }

  self.delete = function () {
    picService
      .deletePic(self.pic)
      .then(() => {
        self.hideForm()
      })
      .catch(err => $log.debug(err))
  }
}
