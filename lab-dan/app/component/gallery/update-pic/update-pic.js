'use strict'

require('./update-pic.scss')

module.exports = {
  template: require('./update-pic.html'),
  controller: ['$log', '$scope', 'picService', UpdatePicController],
  controllerAs: 'updatePicCtrl',
  bindings: {
    pic: '<'
  }
}

function UpdatePicController ($log, $scope, picService) {
  let self = this
  self.picUpdate = {}

  self.$onInit = function () {
    self.picUpdate = {
      _id: self.pic._id,
      name: self.pic.name,
      desc: self.pic.desc
    }
  }

  self.update = function () {
    
  }

  self.cancel = function () {
    $scope.$emit('hide update form')
  }

}
