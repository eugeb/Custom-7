angular.module('app.controllers', [])
  
.controller('myProgramsCtrl', ['$scope','$http','$rootScope','$stateParams','$state','$timeout','$ionicPopup','$ionicNavBarDelegate','$ionicSideMenuDelegate','$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$http,$rootScope,$stateParams,$state, $timeout, $ionicPopup,$ionicNavBarDelegate,$ionicSideMenuDelegate,$ionicPlatform) {
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    var login = 0;
    db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
       var len = results.rows.length, i;
       if(len > 0){
           login = 1;
           $rootScope.userInfo = results.rows.item(i);
       }
    },null);
    $timeout(function() {
        try{
            var t = $scope.userInfo.id;
            $scope.initialize();
        }catch(e){
            $state.go("login");
        }
    }, 200);

    });
    
    
    $scope.formData = {
        is_completed : false,
        dates:0
    };

    $scope.initialize = function() {
        var link = 'http://localhost/ziksa_2php/programs.php';
        var today = new Date();
        $scope.items = [];
        var start_date ='0000-00-00';
        var end_date ='0000-00-00';
        
        switch($scope.formData.dates){
            case "1":
                end_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                today.setMonth(today.getMonth()-1);
                start_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                break;
            case "2":
                end_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                today.setMonth(today.getMonth()-5);
                start_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                break;
            case "3":
                end_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                today.setFullYear(today.getFullYear()-1);
                start_date = (today.getFullYear() +"-"+(today.getMonth()+1)+"-"+today.getDate()).toString();
                break;
            case "4":
                start_date ='0000-00-00';
                end_date ='0000-00-00';     
                break;
            default:
                break;
        }
        
       /* console.log("roleID " +$scope.userInfo.role_id);
        console.log("userid " +$scope.userInfo.id);
        console.log("is_completed " +$scope.formData.is_completed);
        console.log("$scope.formData.dates "+ $scope.formData.dates);
        console.log("start_date " +start_date);
        console.log("endtime " +end_date);*/
        
    $http.post(link, {role_id : $scope.userInfo.role_id ,userid: $scope.userInfo.id,is_completed : $scope.formData.is_completed,starttime:start_date,endtime:end_date}).then(function (res){
        $scope.response = res.data;
        //console.log(res.data);
        $scope.formData.list = res.data;
        for (i = 0; i < res.data.length; i++){
            $scope.items.push({ courseid: res.data[i].courseid,course_description: res.data[i].course_description,course_end_date: res.data[i].course_end_date,venue: res.data[i].venue });
        }
    });
    };
    $scope.pushNotificationChange = function() {
        $scope.initialize();
        //console.log('Push Notification Change', $scope.formData.is_completed);
    };
    $scope.pushNotificationChangeSel = function() {
        $scope.initialize();
    };
    
}])
   
.controller('myCalendarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myProfileSettingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope','$http','$rootScope','$stateParams','$state','$timeout','$ionicPopup','$ionicNavBarDelegate','$ionicSideMenuDelegate','$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$http,$rootScope,$stateParams,$state, $timeout, $ionicPopup,$ionicNavBarDelegate,$ionicSideMenuDelegate,$ionicPlatform) {
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS LOGININFO (id,address,name,phone,city,state,country,profile_img,active,role_id)');
    });
    $scope.loginData = {};
    $scope.closeLogin = function() {
    //$scope.modal.hide();
    };
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $state.go("menu.myPrograms");
               $rootScope.userInfo = results.rows.item(i);
           }
        }, null);
     });
  $scope.login = function() {
    $scope.modal.show();
  };
  
  $scope.doLogin = function() {
    var link = 'http://localhost/ziksa_2php/login.php';
    $http.post(link, {username : $scope.loginData.username,password : $scope.loginData.password}).then(function (res){
        $scope.response = res.data;
        $rootScope.userInfo = res.data;
        if($scope.userInfo.id === undefined){
           var alertPopup = $ionicPopup.alert({
             title: 'Login Failed',
             template: 'The username or password in incorrect!'
           });
           alertPopup.then(function(res) {
             
           });
        }else{   
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO LOGININFO(id,address,name,phone,city,state,country,profile_img,active,role_id) VALUES(?,?,?,?,?,?,?,?,?,?)',[$scope.userInfo.id,$scope.userInfo.address,$scope.userInfo.name,$scope.userInfo.phone,$scope.userInfo.city,$scope.userInfo.state,$scope.userInfo.country,$scope.userInfo.profile_img,$scope.userInfo.active,$scope.userInfo.role_id]);
        });
        $state.go("menu.myPrograms");
        }
    });
  };

}])
   
.controller('signupCtrl', ['$scope','$http','$rootScope','$stateParams','$state','$timeout','$ionicPopup','$ionicNavBarDelegate','$ionicSideMenuDelegate','$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$http,$rootScope,$stateParams,$state, $timeout, $ionicPopup,$ionicNavBarDelegate,$ionicSideMenuDelegate,$ionicPlatform) {
    $scope.registerdata = {};
    var link = 'http://localhost/ziksa_2php/signup.php';
     $scope.doRegister = function() {
        $http.post(link, {name : $scope.registerdata.name,username : $scope.registerdata.username,password : $scope.registerdata.password}).then(function (res){
            $scope.response = res.data;
            $rootScope.userInfo = res.data;
            if($scope.userInfo.done === undefined){
               var alertPopup = $ionicPopup.alert({
                 title: 'Registration Failed',
                 template: 'Something went wrong, please try again after some minutes'
               });
               alertPopup.then(function(res) {
                 
               });
            }else{   
              var alertPopup = $ionicPopup.alert({
                 title: 'Registration Successfully',
                 template: 'Congratulations! Your user has been registered successfully'
               });
               alertPopup.then(function(res) {
                 $state.go("login");
               });
            }
        });
     };
}])
   
.controller('programDetailsCtrl', ['$scope','$http','$rootScope','$stateParams','$state','$timeout','$ionicPopup','$ionicNavBarDelegate','$ionicSideMenuDelegate','$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$http,$rootScope,$stateParams,$state, $timeout, $ionicPopup,$ionicNavBarDelegate,$ionicSideMenuDelegate,$ionicPlatform) {
 var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    var login = 0;
    db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
       var len = results.rows.length, i;
       if(len > 0){
           login = 1;
           $rootScope.userInfo = results.rows.item(i);
       }
    },null);
    $timeout(function() {
        try{
            var t = $scope.userInfo.id;
            $scope.initialize();
        }catch(e){
            $state.go("login");
        }
    }, 200);

    });
    
    
    $scope.formData = {};

    $scope.initialize = function() {
        var link = 'http://localhost/ziksa_2php/programByID.php';
        var today = new Date();
        $scope.items = [];                
    $http.post(link, {role_id : $scope.userInfo.role_id ,userid: $scope.userInfo.id, courseid: $stateParams.programId}).then(function (res){
        $scope.response = res.data;
        console.log(res.data);
        $scope.formData.list = res.data;
        /*for (i = 0; i < res.data.length; i++){
            $scope.items.push({ courseid: res.data[i].courseid,course_description: res.data[i].course_description,course_end_date: res.data[i].course_end_date,venue: res.data[i].venue });
        }*/
    });
    };

}])
