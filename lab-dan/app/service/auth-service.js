'use strict'

module.exports = ['$q', '$log', '$http', '$window', authService]

function authService ($q, $log, $http, $window) {
  let service = {}
  let token = null

  function setToken (_token) {
    if (! _token) {
      return $q.reject(new Error('no token'))
    }

    $window.localStorage.setItem('token', _token)
    token = _token
    return $q.resolve(token)
  }

  service.getToken = function () {
    if (token) return $q.resolve(token)

    token = $window.localStorage.getItem('token')

    if (token) return $q.resolve(token)

    return $q.reject(new Error('token not found'))
  }

  service.logout = function () {
    $window.localStorage.removeItem('token')
    token = null
    return $q.resolve()
  }

  service.signup = function (user) {
    let url = `${__API_URL__}/api/signup`
    let config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }
    }
    return $http
      .post(url, user, config)
      .then( res => {
        return setToken(res.data)
      })
      .catch( err => {
        $log.error('failure', err.message)
        return $q.reject(err)
      })
  }

  service.login = function (user) {
    let url = `${__API_URL__}/api/login`
    let base64 = $window.btoa(`${user.username}:${user.password}`)
    let config = {
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${base64}`
      }
    }

    return $http
      .get(url, config)
      .then( res => {
        return setToken(res.data)
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })
  }

  return service
}
