'use strict'

require('./upload-pic.scss')

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<'
  }
}

function UploadPicController ($log, picService) {
  let self = this
  $log.debug('inside uploadPicCtrl')
}
