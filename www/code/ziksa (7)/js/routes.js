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

  .state('menu.myPrograms2', {
    url: '/programs_admin',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPrograms2.html',
        controller: 'myPrograms2Ctrl'
      }
    }
  })

  .state('menu.myPrograms3', {
    url: '/programs_employee',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPrograms3.html',
        controller: 'myPrograms3Ctrl'
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

  .state('menu.myCalendar2', {
    url: '/calendarweek',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myCalendar2.html',
        controller: 'myCalendar2Ctrl'
      }
    }
  })

  .state('menu.myProfileSettings', {
    url: '/settings',
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

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('signup', {
    url: '/singup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('programDetails', {
    url: '/program',
    templateUrl: 'templates/programDetails.html',
    controller: 'programDetailsCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('menu.courseOfCooking', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/courseOfCooking.html',
        controller: 'courseOfCookingCtrl'
      }
    }
  })

  .state('menu.courseOfCooking2', {
    url: '/cooking_employee',
    views: {
      'side-menu21': {
        templateUrl: 'templates/courseOfCooking2.html',
        controller: 'courseOfCooking2Ctrl'
      }
    }
  })

  .state('menu.courseOfCooking3', {
    url: '/cooking_admin',
    views: {
      'side-menu21': {
        templateUrl: 'templates/courseOfCooking3.html',
        controller: 'courseOfCooking3Ctrl'
      }
    }
  })

  .state('changePassword', {
    url: '/settings1',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })

  .state('settings', {
    url: '/page11',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('menu.message', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/message.html',
        controller: 'messageCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/my-programs')

  

});