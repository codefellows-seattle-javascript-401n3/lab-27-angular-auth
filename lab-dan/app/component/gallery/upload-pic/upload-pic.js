'use strict'

require('./upload-pic.scss')

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', '$scope', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<'
  }
}

function UploadPicController ($log, $scope, picService) {
  let self = this
  $log.debug('inside uploadPicCtrl')
  self.newPic = {}
  self.newPic.name = null
  self.newPic.data = null
  self.newPic.desc = null

  self.uploadPic = function() {
    $log.debug(self.newPic)
    picService
      .uploadPic(self.gallery, self.newPic)
      .then( () => {
        $log.debug('file successfully uploaded')
        self.newPic.name = null
        self.newPic.desc = null
        self.newPic.file = null
        $scope.$emit('hide file upload')
      })
      .catch( err => $log.debug(err))
  }

  self.cancelUpload = function () {
    self.newPic.name = null
    self.newPic.desc = null
    self.newPic.file = null
    $scope.$emit('hide file upload')
  }

}
