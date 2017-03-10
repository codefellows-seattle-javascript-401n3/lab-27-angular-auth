'use strict'

require('./delete-pic.scss')

module.exports = {
  template: require('./delete-pic.html'),
  controller: ['$log', '$scope', 'picService', DeletePicController],
  controllerAs: 'deletePicCtrl',
  bindings: {
    gallery: '<'
  }
}

function DeletePicController ($log, $scope, picService) {

}
