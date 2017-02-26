'use strict'

module.exports = [
  '$log',
  '$q',
  '$http',
  '$window',
  'authService',
  galleryService
]

function galleryService ($log, $q, $http, $window, authService) {
  const localStorageKey = 'galleries'
  let service = {}
  service.showUpdateForm = false
  service.showDeleteForm = false
  service.galleries = []

  service.createGallery = function (gallery) {
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery`
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.post(url, gallery, config)
      })
      .then( res => {
        let gallery = res.data
        service.galleries.unshift(gallery)
        _setLocalGalleries(service.galleries)
        return $q.resolve(gallery)
      })
      .catch( err => $q.reject(err))
  }

  service.updateGallery = function (gallery) {
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}`
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.put(url, gallery, config)
      })
      .then( res => {
        let gallery = res.data
        let index = service.galleries.findIndex(_findGallery, gallery)
        if (index < 0) {
          $log.debug('couldn\'t find gallery to update!!!')
          return $q.reject(new Error('couldn\'t find gallery to update!!!'))
        }
        service.galleries[index] = gallery
        _setLocalGalleries(service.galleries)
        return $q.resolve(gallery)
      })
      .catch( err => $q.reject(err))
  }

  service.getGalleries = function () {
    if (service.galleries.length) {
      $log.debug('pulling from service.galleries')
      return $q.resolve(service.galleries)
    }
    service.galleries = _getLocalGalleries()
    if (service.galleries) {
      $log.debug('pulling from localStorage')
      return $q.resolve(service.galleries)
    }
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery`
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
        service.galleries = res.data
        _setLocalGalleries(service.galleries)
        return $q.resolve(service.galleries)
      })
      .catch( err => $q.reject(err))
  }

  service.deleteGallery = function (gallery) {
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.delete(url, config)
      })
      .then( () => {
        let index = service.galleries.findIndex(_findGallery, gallery)
        if (index < 0) {
          $log.debug('couldn\'t find gallery to update!!!')
          return $q.reject(new Error('couldn\'t find gallery to update!!!'))
        }
        service.galleries.splice(index, 1)
        _setLocalGalleries(service.galleries)
        return $q.resolve(service.galleries)
      })
      .catch( err => $q.reject(err))
  }

  service.clearLocalGalleries = function () {
    $window.localStorage.removeItem(localStorageKey)
  }

  function _findGallery(gallery) {
    return gallery._id === this._id
  }

  function _setLocalGalleries(galleries) {
    $window.localStorage.setItem(localStorageKey, angular.toJson(galleries))
  }

  function _getLocalGalleries() {
    return angular.fromJson($window.localStorage.getItem(localStorageKey))
  }

  return service
}
