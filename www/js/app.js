// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ui.rCalendar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

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

  .state('menu.view_programs_employee', {
    url: '/programs_employee',
    views: {
      'side-menu21': {
        templateUrl: 'templates/view_programs_employee.html',
        controller: 'controller_programs_employee'
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
  .state('menu.view_exams', {
    url: '/exams/:userid/:programID',
    views: {
      'side-menu21': {
        templateUrl: 'templates/exams.html',
        controller: 'controller_exams'
      }
    }
  })

  .state('menu.myCalendar2', {
    url: '/calendarweek/:userid/:mode',
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
  .state('menu.logout', {
    url: '/logout',
    views: {
      'side-menu21': {
        controller: 'logoutCtrl'
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

  .state('menu.profile', {
    url: '/profile',
    views: {
        'side-menu21': {
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
        }
    }
  })

  .state('menu.view_course_trainer', {
    url: '/course_trainer/:programId',
    views: {
      'side-menu21': {
        templateUrl: 'templates/view_course_trainer.html',
        controller: 'controller_course_trainer'
      }
    }
  })

  .state('menu.view_course_employee', {
    url: '/course_employee/:programId',
    views: {
      'side-menu21': {
        templateUrl: 'templates/view_course_employee.html',
        controller: 'controller_course_employee'
      }
    }
  })

  .state('menu.addeditnote', {
    url: '/course_employee/addeditnote/:programId/:noteid',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addeditnote.html',
        controller: 'controller_course_notes'
      }
    }
  })
  .state('menu.courseOfCooking3', {
    url: '/cooking_admin/:programId',
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
  .state('menu.optionsCalendar', {
    url: '/page-options',
	views: {
		'side-menu21': {
			templateUrl: 'templates/optionsCalendar.html',
			controller: 'optionsCalendarCtrl'
      }
    }
  })

  .state('menu.message', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/message.html',
        controller: 'messageCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21/login');

});
