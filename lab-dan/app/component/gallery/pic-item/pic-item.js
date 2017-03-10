'use strict'

require('./pic-item.scss')

module.exports = {
  template: require('./pic-item.html'),
  controller: ['$log', '$scope', 'picService', PicItemController],
  controllerAs: 'picItemCtrl',
  bindings: {
    pic: '<'
  }
}

function PicItemController ($log, $scope, picService) {
  let self = this
  self.displayUpdateForm = false
  self.displayDeleteForm = false
  self.displayPic = true


}
