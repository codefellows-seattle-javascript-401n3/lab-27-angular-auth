'use strict'

module.exports = [
  '$log',
  '$q',
  '$http',
  '$window',
  'Upload',
  'authService',
  picService
]

function picService ($log, $q, $http, $window, Upload, authService) {
  const localStorageKey = 'pics'
  let service = {}
  service.pics = []
  $log.debug('inside picService')

  service.uploadPic = function (gallery, pic) {
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`
        let headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: pic.name,
            desc: pic.desc,
            file: pic.data
          }
        })
      })
      .then( res => {
        // service.pics.unshift(gallery)
        // _setLocalGalleries(service.pics)
        return $q.resolve(res.data)
      })
      .catch( err => $q.reject(err))
  }

  // service.updatePic = function (gallery, pic) {
  //   return authService
  //     .getToken()
  //     .then( token => {
  //       let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`
  //       let config = {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //       return $http.put(url, gallery, config)
  //     })
  //     .then( res => {
  //       let gallery = res.data
  //       let index = service.pics.findIndex(_findGallery, gallery)
  //       if (index < 0) {
  //         $log.debug('couldn\'t find gallery to update!!!')
  //         return $q.reject(new Error('couldn\'t find gallery to update!!!'))
  //       }
  //       service.pics[index] = gallery
  //       // _setLocalGalleries(service.pics)
  //       return $q.resolve(gallery)
  //     })
  //     .catch( err => $q.reject(err))
  // }
  //
  // service.getPics = function (gallery) {
  //   // service.pics = _getLocalGalleries()
  //   // if (service.pics) {
  //   //   $log.debug('pulling from localStorage')
  //   //   return $q.resolve(service.pics)
  //   // }
  //   $log.debug('inside getPics function')
  //   $log.debug(gallery._id)
  //   return authService
  //     .getToken()
  //     .then( token => {
  //       let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`
  //       let config = {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //       return $http.get(url, config)
  //     })
  //     .then( res => {
  //       $log.debug('received this data:', res)
  //       // service.pics = res.data
  //       // _setLocalGalleries(service.pics)
  //       return $q.resolve(service.pics)
  //     })
  //     .catch( err => $q.reject(err))
  // }
  //
  // service.deletePic = function (gallery, pic) {
  //   return authService
  //     .getToken()
  //     .then( token => {
  //       let url = `${__API_URL__}/api/gallery/${gallery._id}/${pic._id}`
  //       let config = {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //       return $http.delete(url, config)
  //     })
  //     .then( () => {
  //       let index = service.pics.findIndex(_findGallery, gallery)
  //       if (index < 0) {
  //         $log.debug('couldn\'t find gallery to update!!!')
  //         return $q.reject(new Error('couldn\'t find gallery to update!!!'))
  //       }
  //       service.pics.splice(index, 1)
  //       // _setLocalGalleries(service.pics)
  //       return $q.resolve(service.pics)
  //     })
  //     .catch( err => $q.reject(err))
  // }

  // service.clearLocalGalleries = function () {
  //   $window.localStorage.removeItem(localStorageKey)
  // }

  function _findPic(pic) {
    return pics._id === this._id
  }

  function _setLocalPics(pics, galleryID) {
    $window.localStorage.setItem(`${localStorageKey}_${galleryID}`, angular.toJson(pics))
  }

  function _getLocalPics(galleryID) {
    return angular.fromJson($window.localStorage.getItem(`${localStorageKey}_${galleryID}`))
  }

  return service
}
