'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window){
  $log.debug('authService');

  let service = {};
  let token = null;

  function setToken(_token){
    $log.debug('authService.setToken()');

    if (! _token) {
      return $q.reject(new Error('no token'));
    };

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }


//GETTING TOKEN ON PAGE LOAD IF EXISTS
  service.getToken = function(){
    $log.debug('authService.getToken');
    if (token) {
      return $q.resolve(token);
    };

    token = $window.localStorage.getItem('token');
    console.log('in get token, about to hit the if');
    if (token) return $q.resolve(token);
    console.log('token is', token);
    return $q.reject(new Error('token not found'));
  };


//LOGOUT LOGIC
  service.logout = function(){
    $log.debug('authService.logout()');

    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
  };


//SIGNUP LOGIC
  service.signup = function(user) {
    $log.debug('authService.signup()');
    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
    $log.log('data', user);
    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch(err => {
      console.error(err);
      $log.error('failure', err.message);
      return $q.reject(err);

    });
  };



//LOGIN LOGIC
  service.login = function(user){
    $log.debug('authService.login()');

    let url = `${__API_URL__}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
