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
  // I originally added an update feature before I realized slugram doesn't have that route :(
  // service.updatePic = function (pic) {
  //   return authService
  //     .getToken()
  //     .then( token => {
  //       let url = `${__API_URL__}/api/gallery/${pic.galleryId}/pic`
  //       let config = {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //       return $http.put(url, pic, config)
  //     })
  //     .then( res => $q.resolve(res.data))
  //     .catch( err => $q.reject(err))
  // }

  service.getPics = function (gallery) {
    // service.pics = _getLocalGalleries()
    // if (service.pics) {
    //   $log.debug('pulling from localStorage')
    //   return $q.resolve(service.pics)
    // }
    $log.debug('inside getPics function')
    $log.debug(gallery._id)
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.get(url, config)
      })
      .then( res => {
        $log.debug('received this data:', res)
        // service.pics = res.data
        // _setLocalGalleries(service.pics)
        return $q.resolve(service.pics)
      })
      .catch( err => $q.reject(err))
  }

  service.deletePic = function (pic) {
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${pic.galleryId}/pic/${pic._id}`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.delete(url, config)
      })
      .then( () => $q.resolve())
      .catch( err => $q.reject(err))
  }

  return service
}
