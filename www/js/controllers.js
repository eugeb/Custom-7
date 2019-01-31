angular.module('starter.controllers', [])
.constant('webservice', {
	principal: 'http://localhost/ziksa_2php/',
	/*principal: 'http://www.ziksa.biz/api/',*/
	urls: {
		programs:'programs.php'
		,usersByID:'usersByID.php'
		,roles: 'getRoles.php'
		,updateUserByID: 'updateUserByID.php'
		,login: 'login.php'
		,signup: 'signup.php'
		,programByID: 'programByID.php'
		,saveImage: 'saveImage.php'
		,getEventsByUser: 'getEventsByUser.php'
		,saveUpdateNoteByCourse: 'saveUpdateNoteByCourse.php'
		,getNoteByNoteid:'getNoteByNoteid.php'
		,getNotesByCourseByUserid:'getNotesByCourseByUserid.php'
		,deletenotebyid: 'DeleteNoteByID.php'
		}
	})
.controller('DashCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {})

.controller('myProgramsCtrl', function($window,$rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams, webservice) {
	
    $scope.selection = {
        togglecomplete:false,
        time: "4"
    };
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.refreshdata = function(){
        var link = webservice.principal + webservice.urls.programs;
        var start_date ='0000-00-00';
        var end_date ='0000-00-00';
        var today = new Date();
        switch($scope.selection.time){
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
    $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid,is_completed : $scope.selection.togglecomplete,starttime:start_date,endtime:end_date}).then(function (res){
        $scope.response = res.data;
        $scope.selection.list = res.data;
		$scope.hide_loading();
    });
    };
    $scope.pushNotificationChange = function() {
        $scope.refreshdata();
    };
    $scope.initialize = function(){
    $scope.show_loading();
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               
               $scope.refreshdata();
			   
           }
        }, null);
     });
    };
    $scope.initialize();
})

.controller('myPrograms2Ctrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {

})

.controller('controller_programs_employee', function($rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	$scope.selection = {
        togglecomplete:false,
        time: "4",
		list:[]
    };
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.pushNotificationChange = function() {
        $scope.refreshdata();
    };
	$scope.refreshdata = function(){
        var link = webservice.principal + webservice.urls.programs;
        var start_date ='0000-00-00';
        var end_date ='0000-00-00';
        var today = new Date();
        switch($scope.selection.time){
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
    $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid,is_completed : $scope.selection.togglecomplete,starttime:start_date,endtime:end_date}).then(function (res){
        $scope.response = res.data;
		console.log($scope.response);
		var list =[];
		for(var i=0;i< res.data.length;i++){
			var item = [];
				item.course_description =res.data[i].course_description;
				item.courseid =res.data[i].courseid;
				item.preview_image =res.data[i].preview_image;
				item.course_description =res.data[i].course_description;
				var timestamp = Date.now();
				var endcourse = new Date(res.data[i].course_end_date +" 00:00:00");
				if(timestamp > endcourse){
					item.completed = true;
					item.cssclass = "item item-thumbnail-left dark active";
				}else{
					item.completed = false;
					item.cssclass = "item item-thumbnail-left item-icon-right positive";
				}
				/*item.hasexams = false;
				if(res.data[i].exams.length > 0){
					for(var fi=0;fi<res.data[i].exams.length;fi++){
						var enddate = new Date(res.data[i].exams[fi].enddate);
						var today = new Date(Date.now());
						if(enddate > today){
							//console.log("enddate: "+enddate + " - " + today);
							if(res.data[i].exams[fi].iscompleted == 0){
								//console.log("completed by user: " + res.data[i].exams[fi].iscompleted  );
								item.hasexams = true;
							}
						}
					}
				}*/
			list.push(item);
			
		}
			$scope.selection.list = list;
			
		$scope.hide_loading();
    });
    };
	$scope.openExamsView = function(courseid){
		$state.go("menu.view_exams",{userid:$scope.userInfo.userid,programID:courseid});
		event.stopPropagation();
	};
	$scope.openCourse = function(courseid){
		
		$state.go("menu.view_course_employee",{programId: courseid});
	};
	
	$scope.initialize = function(){
    $scope.show_loading();
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               
               $scope.refreshdata();
			   
           }
        }, null);
     });
    };
    $scope.initialize();
})

.controller('controller_exams', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.data={
		courseid:$stateParams.programID,
		userid:$stateParams.userid
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
	$scope.list = [];
	/*var linkdata = webservice.principal + webservice.urls.examsbyprogramID;
	$http.post(linkdata, {userid: $scope.data.userid,courseid:$scope.data.courseid}).then(function (res){
        $scope.response = res.data;
        $scope.list = res.data;
		var items=[];
		for(var i = 0;i< res.data.length;i++){
			var datitem = res.data[i];
			var today = new Date(Date.now());
			var startdate = new Date(datitem.startdate);
			var enddate = new Date(datitem.enddate);
			datitem.isfinished = false;
			datitem.isstarted = false;
			datitem.classcompleted = '';
			if(today > enddate){
				datitem.isfinished = true;
				datitem.classcompleted = 'active';
			}
			if(today > startdate){
				datitem.isstarted = true;
			}
			
			items.push(datitem);
		}
		console.log($scope.list);
		$scope.hide_loading();
    });
	*/
})
.controller('myCalendarCtrl', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.eventssource = [];
	$scope.modeselected = {
		selector1class:'button button-stable button-block',
		selector2class:'button button-positive button-block',
		mode:'month'
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
	$scope.initialize = function(){
    $scope.show_loading();
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   $scope.hide_loading();
			   $scope.initializeCalendar();
           }
        }, null);
     });
    };
	$scope.initializeCalendar = function(){	
		//review the events
		var events = [];
		var date = new Date();

		
	    var link = webservice.principal+ webservice.urls.getEventsByUser;
			   
		$http.post(link, {userid: $scope.userInfo.userid}).then(function (res){
			$scope.response = res.data;
			if(res.data.length > 0){
				for(var i=0;$scope.response.length > i;i++){
					console.log($scope.response[i]);
					var startDay = new Date($scope.response[i].time_start);
					var endDay = new Date($scope.response[i].time_end);
					events.push({
						title: $scope.response[i].title,
						startTime: startDay,
						endTime: endDay,
						allDay: false
					});
					
				}
				$scope.eventssource = events;
			}
		});
		
	};
	
	$scope.openMonthlyCalendar = function(){
		$scope.modeselected.selector1class = 'button button-stable button-block';
		$scope.modeselected.selector2class = 'button button-positive button-block';
		$scope.modeselected.mode = 'month';
	};
	$scope.openWeeklyCalendar = function(){
		$scope.modeselected.selector2class = 'button button-stable button-block';
		$scope.modeselected.selector1class = 'button button-positive button-block';
		$scope.modeselected.mode = 'week';

	};
	$scope.initialize();
		$scope.onEventSelected = function (event) {
		console.log(event.title);
	};
	$scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
        };
	$scope.optionsGoogleCalendar = function(){
		$state.go("menu.optionsCalendar");
	};
})
.controller('myCalendar2Ctrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {

//openCalendar();
})
.controller('optionsCalendarCtrl', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };

$scope.addEventsToGoogle = function(){
	$scope.show_loading();
		var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   $scope.hide_loading();
				var link = webservice.principal+ webservice.urls.getEventsByUser;
			   
			   $http.post(link, {userid: $scope.userInfo.userid}).then(function (res){
					$scope.response = res.data;
					if(res.data.length > 0){
							
						var promises = $scope.response.map(function (item) {
								var found=0;
								var startDateFilter = new Date(item.time_start);
								var endDateFilter = new Date(item.time_end);
								startDateFilter.setMinutes(0);
								startDateFilter.setHours(0);
								startDateFilter.setSeconds(0);
								endDateFilter.setDate(endDateFilter.getDate()+1);
								endDateFilter.setMinutes(0);
								endDateFilter.setHours(0);
								endDateFilter.setSeconds(0);
								var startDate = new Date(item.time_start);
								var endDate = new Date(item.time_end);
								window.plugins.calendar.createEvent(item.title, item.address_details, item.details, startDate, endDate,function(){},function(){});
								return item;
						});

						$q.all(promises).then(function () {
							alert("All the events has been added to the calendar");
						});
								
					}
			   });
           }
        }, null);
		});		
};
$scope.openGoogleCalendar = function(){
	window.plugins.calendar.openCalendar(new Date(), function(){
		
	}, function(){
		
	});
};
//openCalendar();
})
.controller('myProfileSettingsCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
$scope.settings = {
    active:true,
    rating:0,
    corporate:true,
    password: "",
    confirm_password: ""
};
  var link_data = webservice.principal + webservice.urls.usersByID;
  var link_roles = webservice.principal + webservice.urls.roles;
  var link_save = webservice.principal + webservice.urls.updateUserByID;
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
    $scope.getdata = function(){
		$scope.show_loading();
        $http.post(link_roles, {}).then(function (res){
            $scope.response = res.data;
            $scope.settings.roles = res.data;
        });
        $http.post(link_data, {userid: $scope.userInfo.userid}).then(function (res){
            $scope.response = res.data;
			$scope.settings.user = res.data[0];
            if($scope.settings.user.active == "1"){
                $scope.settings.active =true;
            }else{
                $scope.settings.active =false;
            }
            //$scope.settings.corporate
            $scope.settings.rating = $scope.settings.user.rating;
            
        });
		$scope.hide_loading();
    };
    $scope.save = function(){
        var vactive ="0";
        if($scope.settings.active == true){
            vactive ="1";
        }else{
            vactive ="0";
        }
        $http.post(link_save, {userid: $scope.userInfo.userid,rating: $scope.settings.rating,active: vactive}).then(function (res){
            $scope.response = res.data;
             var alertPopup = $ionicPopup.alert({
                 title: 'Changes Saved',
                 template: 'The changes have been saved successfully!'
               });
               alertPopup.then(function(res) { });
        });
    };
    $scope.changepassword = function(){
        if($scope.settings.password !="" && $scope.settings.confirm_password !="" && $scope.settings.password == $scope.settings.confirm_password){
        $http.post(link_save, { userid: $scope.userInfo.userid,password: $scope.settings.password }).then(function (res){
            $scope.response = res.data;
             var alertPopup = $ionicPopup.alert({
                 title: 'Password Saved',
                 template: 'The password has been changed successfully!'
               });
               alertPopup.then(function(res) { });
		});
        }else{
            if($scope.settings.password =="" || $scope.settings.confirm_password ==""){
             var alertPopup = $ionicPopup.alert({
                 title: 'Change Failed',
                 template: 'Please fill both fields'
               });
               alertPopup.then(function(res) {});
            }else if($scope.settings.password != $scope.settings.confirm_password){
             var alertPopup = $ionicPopup.alert({
                 title: "Change Failed",
                 template: "The passwords don't match!"
               });
            alertPopup.then(function(res) {});
            }
        }
    };
})
.controller('menuCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
  $scope.gotoPrograms = function(){
	var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               if($rootScope.userInfo.role == 1){
                    $state.transitionTo("menu.myPrograms", null, {'reload':true});
               }else if($rootScope.userInfo.role == 2) {
                    $state.transitionTo("menu.view_programs_employee", null, {'reload':true});
               }else if($rootScope.userInfo.role == 3) {
                    $state.transitionTo("menu.myPrograms2", null, {'reload':true});
               }
           }
        }, null);
     });
  };
  
})
.controller('loginCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $ionicPopup, $stateParams,webservice) {
    $scope.loginData = {};
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    $scope.closeLogin = function() {};
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               if($rootScope.userInfo.role == 1){
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.myPrograms", null, {'reload':true});
               }else if($rootScope.userInfo.role == 2) {
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.view_programs_employee", null, {'reload':true});
               }else if($rootScope.userInfo.role == 3) {
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.myPrograms2", null, {'reload':true});
               }
           }
        }, null);
     });
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.doLogin = function() {
        $scope.show_loading();
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS LOGININFO;');
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGININFO(userid,name,role);');
        });
        var link = webservice.principal + webservice.urls.login;
        $http.post(link, {username : $scope.loginData.username,password : $scope.loginData.password}).then(function (res){
            $scope.hide_loading();
            $scope.response = res.data;
            $rootScope.userInfo = res.data;
			
            if($scope.userInfo.id === undefined){
               var alertPopup = $ionicPopup.alert({
                 title: 'Login Failed',
                 template: 'The username or password is incorrect!'
               });
               alertPopup.then(function(res) {
                 
               });
            }else{
				$scope.hide_loading();
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO LOGININFO(userid,name,role) VALUES(?,?,?)',[$scope.userInfo.id +"", $scope.userInfo.name, $scope.userInfo.role_id]);
					if($scope.userInfo.role_id == 1){
						$state.transitionTo("menu.myPrograms", null, {'reload':false});
				   }else if($scope.userInfo.role_id == 2) {
						$state.transitionTo("menu.view_programs_employee", null, {'reload':false});
				   }else if($scope.userInfo.role_id == 3) {
						$state.transitionTo("menu.myPrograms2", null, {'reload':false});
				   }
                });
            }
        });  
    };
})
.controller('signupCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.registerdata = {};
    $scope.registerdata.roles = 0;
    var link = webservice.principal + webservice.urls.signup;
     $scope.doRegister = function() {
        if($scope.registerdata.roles != 0 
        && $scope.registerdata.name != "" 
        && $scope.registerdata.username != "" 
        && $scope.registerdata.password != ""
        && $scope.registerdata.roles != undefined 
        && $scope.registerdata.name != undefined 
        && $scope.registerdata.username != undefined 
        && $scope.registerdata.password != undefined
        ){
        $scope.show_loading();
        $http.post(link, {name : $scope.registerdata.name,username : $scope.registerdata.username,password : $scope.registerdata.password,role:$scope.registerdata.roles}).then(function (res){
            $scope.response = res.data;
            $rootScope.userInfo = res.data;
            $scope.hide_loading();
            if($scope.userInfo.done === undefined){
               var alertPopup = $ionicPopup.alert({
                 title: 'Registration Failed',
                 template: 'Something went wrong, please try again after some minutes'
               });
               alertPopup.then(function(res) {});
            }else{   
              var alertPopup = $ionicPopup.alert({
                 title: 'Registration Successfully',
                 template: 'Congratulations! Your user has been registered successfully'
               });
               alertPopup.then(function(res) {
                 $state.go("menu.login");
               });
            }
        });
     }else{
         
        var alertPopup = $ionicPopup.alert({
         title: 'Registration',
         template: 'Please fill all the fields'
        });
        alertPopup.then(function(res) {});
     }
     };
})
.controller('logoutCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS LOGININFO;');
    });
    $timeout(function() {
        $scope.hide_loading();
        $state.go("menu.login");
    }, 500);  
})
.controller('programDetailsCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('profileCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice, $cordovaCamera) {
  $scope.settings = {};
  $scope.settings.form = {};
  $scope.images = [];
  $scope.is_image_loaded = false;
  $scope.new_image = false;

  var link_data = webservice.principal + webservice.urls.usersByID;
  var link_roles = webservice.principal + webservice.urls.roles;
  var link_save = webservice.principal + webservice.urls.updateUserByID;
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
    $scope.getdata = function(){
        $http.post(link_roles, {}).then(function (res){
            $scope.response = res.data;
            $scope.settings.roles = res.data;
        });
        $http.post(link_data, {userid: $scope.userInfo.userid}).then(function (res){
            $scope.response = res.data;
            $scope.settings.user = res.data[0];
			$scope.settings.details = res.data[1];
			$scope.settings.documents = res.data[2];
			$scope.settings.form.name = $scope.settings.user.name;
			$scope.settings.form.phone = $scope.settings.user.phone;
			$scope.settings.form.email = $scope.settings.user.email;
			$scope.settings.form.address = $scope.settings.user.address;
			$scope.settings.form.pincode = $scope.settings.details.pincode;
            $scope.settings.form.documentID = $scope.settings.documents.documentid;
			$scope.settings.form.documentType = $scope.settings.documents.documenttype;
			$scope.settings.form.documentImage64 = $scope.settings.documents.documentimage;
            $scope.settings.form.reference_name = $scope.settings.details.reference_name;
			$scope.settings.form.reference_relationship = $scope.settings.details.reference_relationship;
			$scope.settings.form.reference_phone = $scope.settings.details.reference_phone;
			$scope.settings.form.bank_userfullname = $scope.settings.details.bank_userfullname;
			$scope.settings.form.bank_name = $scope.settings.details.bank_name;
			$scope.settings.form.bank_accountnumber = $scope.settings.details.bank_accountnumber;
			$scope.settings.form.bank_ifsccode = $scope.settings.details.bank_ifsccode;
			
			if($scope.settings.form.documentImage64.length > 0){
				$scope.is_image_loaded = true;
				$scope.settings.form.documentImage = "data:image/jpeg;base64," + $scope.settings.form.documentImage64;
			}
			
			if($scope.settings.user.active == "1"){
                $scope.settings.active =true;
            }else{
                $scope.settings.active =false;
            }
            $scope.settings.rating = $scope.settings.user.rating;
        });
    };
	$scope.saveprofile = function(){
		if($scope.settings.form.name !="" 
		&& $scope.settings.form.phone != "" 
		&& $scope.settings.form.address != "" 
		&& $scope.settings.form.email != ""
		&& $scope.settings.form.pincode != ""
		&& $scope.settings.form.reference_name != ""
		&& $scope.settings.form.reference_relationship != ""
		&& $scope.settings.form.reference_phone != ""
		&& $scope.settings.form.bank_userfullname != ""
		&& $scope.settings.form.bank_name != ""
		&& $scope.settings.form.bank_accountnumber != ""
		&& $scope.settings.form.bank_ifsccode != ""){
			$scope.information = {};
			//REQUIRED
			angular.extend($scope.information,{userid: $scope.settings.user.userid});
			angular.extend($scope.information,{name: $scope.settings.form.name});
			angular.extend($scope.information,{phone: $scope.settings.form.phone});
			angular.extend($scope.information,{email: $scope.settings.form.email});
			angular.extend($scope.information,{address: $scope.settings.form.address});
			angular.extend($scope.information,{pincode: $scope.settings.form.pincode});
			angular.extend($scope.information,{reference_name: $scope.settings.form.reference_name});
			angular.extend($scope.information,{reference_relationship: $scope.settings.form.reference_relationship});
			angular.extend($scope.information,{reference_phone: $scope.settings.form.reference_phone});
			angular.extend($scope.information,{bank_userfullname: $scope.settings.form.bank_userfullname});
			angular.extend($scope.information,{bank_name: $scope.settings.form.bank_name});
			angular.extend($scope.information,{bank_accountnumber: $scope.settings.form.bank_accountnumber});
			angular.extend($scope.information,{bank_ifsccode: $scope.settings.form.bank_ifsccode});
			
			if($scope.settings.details.detailid !=""){
				angular.extend($scope.information,{detailid: $scope.settings.details.detailid});
			}else{
				angular.extend($scope.information,{detailid: 0 });
			}
			
			$http.post(link_save, $scope.information).then(function (res){
				$scope.response = res.data;
				
				 var alertPopup = $ionicPopup.alert({
					 title: 'Information Saved',
					 template: 'Thank you, the information has been saved'
				   });
				   alertPopup.then(function(res) { });
			});
			//$scope.settings.form.documentImage = "data:image/jpeg;base64," + "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";
			//$scope.settings.form.documentImage64 = "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";
			if($scope.settings.form.documentImage != ""){
					var imgsaveurl=webservice.principal + webservice.urls.saveImage;
					var docid = 0;
					if($scope.settings.documents.documentid !=""){
						docid = $scope.settings.documents.documentid;
					}
					
					
				$http.post(imgsaveurl, {userid: $scope.userInfo.userid,documentid: docid,newupload:$scope.new_image, documenttype: $scope.settings.form.documentType,image: $scope.settings.form.documentImage64 }).then(function (res){
					$scope.settings.form.documentID = res.data.documentid;
					$scope.settings.form.documentType = res.data.documenttype;
					$scope.settings.form.documentImage64 = res.data.documentimage;
					$scope.settings.form.documentImage = "data:image/jpeg;base64," + res.data.documentimage;
				});
			}
		}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Required',
					template: 'Please fill all the required fields!'
               });
               alertPopup.then(function(res) { });

		}
		
	};
	
 
    $scope.addImage = function() {
		var options = {
			destinationType : Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
		};
		$cordovaCamera.getPicture(options).then(function(imageData) { 
		
			$scope.settings.form.documentImage = "data:image/jpeg;base64," + imageData;
			$scope.settings.form.documentImage64 = imageData;
			$scope.is_image_loaded = true;
			$scope.new_image = true;
			//$scope.imgUrl = imageData;
		//$scope.images = [];
		
		/*onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 */
	}, function(err) {
		//console.log(err);
	});
    }
	
    $scope.urlForImage = function(imageName) {
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
    }
})
.controller('controller_course_trainer', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
    var courseid = $stateParams.programId;
    var link = webservice.principal + webservice.urls.programByID;
    $scope.data = [];
    $scope.forms = {
        studentsdropdown: true,
        icon: 'icon ion-android-arrow-dropright-circle',
        informationdropdown: true,
        icon2: 'icon ion-android-arrow-dropright-circle',
        contentdropdown: true,
        icon3: 'icon ion-android-arrow-dropright-circle'
    };
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
    $scope.getdata = function(){
        $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.id, courseid: $stateParams.programId}).then(function (res){
            $scope.response = res.data;
            $scope.data.list = res.data;
        });
    };
    $scope.hide_students = function(){
        if($scope.forms.studentsdropdown){
            $scope.forms.studentsdropdown = false;
            $scope.forms.icon = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.studentsdropdown = true;
            $scope.forms.icon = 'icon ion-android-arrow-dropright-circle';
        }
    };
    $scope.hide_info = function(){
        if($scope.forms.informationdropdown){
            $scope.forms.informationdropdown = false;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.informationdropdown = true;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropright-circle';
        }
    };
    $scope.gotocalendar = function(){
        $state.go("menu.myCalendar");
    };
    $scope.hide_content = function(){
        if($scope.forms.contentdropdown){
            $scope.forms.contentdropdown = false;
            $scope.forms.icon3 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.contentdropdown = true;
            $scope.forms.icon3 = 'icon ion-android-arrow-dropright-circle';
        }
    };
})
.controller('controller_course_employee', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
  var courseid = $stateParams.programId;
    var link = webservice.principal + webservice.urls.programByID;
    $scope.data = [];
    $scope.forms = {
        studentsdropdown: true,
        icon: 'icon ion-android-arrow-dropright-circle',
        informationdropdown: true,
        icon2: 'icon ion-android-arrow-dropright-circle',
        contentdropdown: true,
        icon3: 'icon ion-android-arrow-dropright-circle',
		trainerinfodropdown: true,
        icon4: 'icon ion-android-arrow-dropright-circle',
		notescontent: true,
        icon5: 'icon ion-android-arrow-dropright-circle'
    };
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
			   $scope.getnotesdata();
           }
        }, null);
     });
    $scope.getdata = function(){
		console.log($scope.userInfo.userid);
        $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid, courseid: $stateParams.programId}).then(function (res){
            $scope.response = res.data;
            $scope.data.list = res.data;
			console.log($scope.data.list);
        });
    };
	var getnotesbycoursebyuserid = webservice.principal + webservice.urls.getNotesByCourseByUserid;
	$scope.noteslist = {};
	$scope.getnotesdata = function(){
        $http.post(getnotesbycoursebyuserid, {userid: $scope.userInfo.userid, courseid: $stateParams.programId}).then(function (res){
			console.log(res.data);
			$scope.noteslist =res.data;
        });
    };
	var popup = null;
	$scope.openoptions = function(noteid){
		var optionsmenu = '<div class="list" style="text-align: left;">';
			optionsmenu +='<a ng-click="gotoeditoption({{'+noteid+'}})" class="item item-icon-right" href="#">Edit Note</a>';
			optionsmenu +='<a ng-click="deleteoption({{'+noteid+'}})" class="item item-icon-right" href="#">Remove Note</a>';
			optionsmenu +='</div>';
		popup=$ionicPopup.show({
			template: optionsmenu,
			title: 'Menu',
			subTitle: 'Please select one option',
			scope: $scope,
			buttons: [
			  { text: 'Cancel' }
			]
		  });
    };
	$scope.gotoeditoption = function(noteid){
		popup.close();
		$state.go("menu.addeditnote",{programId: courseid ,noteid:noteid});
	};
	$scope.deleteoption = function(noteid){
		var deletenotebyidlink = webservice.principal + webservice.urls.deletenotebyid;
		popup.close();
		$http.post(deletenotebyidlink, {userid: $scope.userInfo.userid, courseid: courseid, noteid: noteid}).then(function (res){
			$scope.getnotesdata();
			alert("The note has been successfully removed!");
		});
	};
    $scope.hide_students = function(){
        if($scope.forms.studentsdropdown){
            $scope.forms.studentsdropdown = false;
            $scope.forms.icon = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.studentsdropdown = true;
            $scope.forms.icon = 'icon ion-android-arrow-dropright-circle';
        }
    };
    $scope.hide_info = function(){
        if($scope.forms.informationdropdown){
            $scope.forms.informationdropdown = false;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.informationdropdown = true;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropright-circle';
        }
    };
    $scope.gotocalendar = function(){
        $state.go("menu.myCalendar");
    };
    $scope.hide_content = function(){
        if($scope.forms.contentdropdown){
            $scope.forms.contentdropdown = false;
            $scope.forms.icon3 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.contentdropdown = true;
            $scope.forms.icon3 = 'icon ion-android-arrow-dropright-circle';
        }
    };
	$scope.toggleNotesContent = function(){
		if($scope.forms.notescontent){
            $scope.forms.notescontent = false;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.notescontent = true;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropright-circle';
        }
		
	};
	$scope.hide_trainerinfo = function(){
		if($scope.forms.trainerinfodropdown){
            $scope.forms.trainerinfodropdown = false;
            $scope.forms.icon4 = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.trainerinfodropdown = true;
            $scope.forms.icon4 = 'icon ion-android-arrow-dropright-circle';
        }
	};
	$scope.addnewnote = function(){
		$state.go("menu.addeditnote",{programId: courseid ,noteid:0});
	};
})
.controller('courseOfCooking3Ctrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('controller_course_notes', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	$scope.notes = {
		courseid: $stateParams.programId,
		noteid: $stateParams.noteid,
		title:'',
		text:''
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
	$scope.initialize = function(){
		var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
			   var len = results.rows.length, i;
			   if(len > 0){
				   $rootScope.userInfo = results.rows.item(0);
				   $scope.hide_loading();
				   $scope.getdata();
			   }
			}, null);
		 });
	};
	$scope.initialize();
	var savedatawebservice = webservice.principal + webservice.urls.saveUpdateNoteByCourse;
	var getnotesbynoteid= webservice.principal + webservice.urls.getNoteByNoteid;
	
	$scope.getdata = function(){
		if($scope.notes.noteid != 0){
		$http.post(getnotesbynoteid, {userid: $scope.userInfo.userid, courseid: $stateParams.programId, noteid: $scope.notes.noteid}).then(function (res){
			$scope.response = res.data;
			console.log($scope.response);
			$scope.notes.noteid = res.data[0].noteid;
			$scope.notes.title = res.data[0].title;
			$scope.notes.text = res.data[0].text;
			console.log($scope.notes);
			//console.log($scope.response);
		});
		}
	};
	$scope.goback = function(){
		$state.go("menu.view_course_employee",{programId: $scope.notes.courseid});
	};
	$scope.savechanges = function(){
		$http.post(savedatawebservice, {userid: $scope.userInfo.userid, courseid: $stateParams.programId, noteid: $scope.notes.noteid, title: $scope.notes.title,text: $scope.notes.text}).then(function (res){
			$scope.response = res.data;
			$scope.notes.noteid = res.data[0].noteid;
			alert("The note has been successfully saved!");
		});
		
	};
})

.controller('changePasswordCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {
  
})
.controller('settingsCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {

})
.controller('messageCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {
  $scope.settings = {
    enableFriends: true
  };
});
