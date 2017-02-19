module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('' , '/join#signup');
  $urlRouterProvider.when('/' , '/join#signup');
  $urlRouterProvider.when('/signup' , '/join#signup');
  $urlRouterProvider.when('/login' , '/join#login');

  let states =  [];

  states.forEach( state => {
    $stateProvider.state(state);
  });
};
