angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('menu.myPrograms', {
    url: '/my-programs',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPrograms.html',
        controller: 'myProgramsCtrl'
      }
    }
  })

  .state('menu.myCalendar', {
    url: '/calendar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myCalendar.html',
        controller: 'myCalendarCtrl'
      }
    }
  })

  .state('menu.myProfileSettings', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfileSettings.html',
        controller: 'myProfileSettingsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/singup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('programDetails', {
    url: '/program/:programId',
    templateUrl: 'templates/programDetails.html',
    controller: 'programDetailsCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});