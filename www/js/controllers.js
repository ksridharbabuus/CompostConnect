var appCtrls = angular.module('starter.controllers',[])
.controller('LoginCtrl',function($ionicNavBarDelegate){
	// alert("loginCtrl");
	$ionicNavBarDelegate.showBackButton(false);
})
.controller('ProdHomeCtrl',function(){
	// alert("loginCtrl");
})
.controller('ConsHomeCtrl',function(){
	// alert("loginCtrl");
})
.controller('RegisterCtrl',function(){
	// alert("loginCtrl");
})
.controller('CompostPortsCtrl',function($scope,WebServiceCall,$state,$ionicNavBarDelegate){
	// alert("loginCtrl");
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		$ionicNavBarDelegate.showBackButton(false);
    });
	
})
.controller('RegCompostPortsCtrl',function($ionicNavBarDelegate,$state){
	// alert("loginCtrl");
	$ionicNavBarDelegate.showBackButton(true);
	
})
.controller('CompostPortsPageViewCtrl',function($ionicNavBarDelegate,$state,$scope){
	// alert("loginCtrl");
	$ionicNavBarDelegate.showBackButton(true);
	$scope.doLogout =function(){
			// alert("came");
			window.localStorage.clear();
			$state.go('login');
	}
	$scope.AddSource = function(){
		$state.go('RegisterSource');
	}
})
.controller('FindNearByViewCtrl',function($ionicNavBarDelegate,$state,$scope){
	// alert("loginCtrl");
	$ionicNavBarDelegate.showBackButton(true);
	$scope.doLogout =function(){
			// alert("came");
			window.localStorage.clear();
			$state.go('login');
		}	
})
.controller('LoginPageCtrl',function($scope,$state,WebServiceCall){
	$scope.DoLogin = function(){
		var username = $scope.userId;
		var pwd = $scope.password;
		var LoginGetURL = LoginURL;
		var LoginGetURLUser = LoginGetURL+"/"+username;
		
		var UserProducerType = "PRODUCER"; 
		var UserConsumerType = "CONSUMER"; 
		WebServiceCall.StartSpin();
		WebServiceCall.WSCallGet(LoginGetURLUser).then(function(resp){
			var UserDetails = resp;
			var UserTypeReturn = UserDetails.UserType;
			console.log(JSON.stringify(UserDetails));
			window.localStorage["UserName"] = username;
			//var loginusrtype = "PRODUCER";//CONSUMER
//			debugger
			if(UserTypeReturn.toLowerCase()==UserProducerType.toLowerCase())
			{
				
				window.localStorage["Username"]=username;
				$state.go('CompostPorts');	
				
			}
			else if(UserTypeReturn.toLowerCase()==UserConsumerType.toLowerCase())
			{
				window.localStorage["Username"]=username;
				$state.go('FindNearBy');
			}
			WebServiceCall.StopSpin();
		},function(err){
			WebServiceCall.StopSpin();
		});
		
		
	}
})
.controller('RegisterPageCtrl',function($scope,$state,WebServiceCall){
	$scope.DoRegister = function(){
		console.log("register");
		var UName = $scope.UName;
		var FName = $scope.FName;
		var LName = $scope.LName;
		var Email = $scope.Email;
		var pwd = $scope.Password;
		var phoneno = $scope.Phone;
		var typesel = $scope.TypeSelected;
		var UserRegInput = {
			  "userid": UName,
			  "FirstName": FName,
			  "LastName": LName,
			  "Email": Email,
			  "UserType": typesel,
			  "Password": pwd
		};
		var UserRegURL = UserRegistrationURL; 
		// alert(typesel);
		var UserProducerType = "PRODUCER"; 
		var UserConsumerType = "CONSUMER"; 
		WebServiceCall.StartSpin();
		WebServiceCall.WSCall(UserRegistrationURL,UserRegInput).then(function(RegReturn){
			console.log("RegReturn:"+JSON.stringify(RegReturn));
			if(typesel.toUpperCase()==UserProducerType)
			{
				//$state.go('CompostPorts');	
			}
			else if(typesel.toUpperCase()==UserConsumerType)
			{
				//$state.go('FindNearBy');
			}
			
		},function(err){
			alert("registration failed:"+JSON.stringify(err));
		});
		
	}
})
.controller('CompostPortsPageCtrl',function($scope,$state,WebServiceCall,$interval){
	// var ArrCompostPorts = [{"SensorName":"Sensor1","Status":"full"},
							// {"SensorName":"Sensor2","Status":"full"},
							// {"SensorName":"Sensor3","Status":"empty"}
							// ];
	// $scope.CompostPortsList = ArrCompostPorts;
	
	
	var CompostPortsGetURL = GetCompostPortsURL;
	var CompostPortsStatusURL = GetCompostPortsStausURL;
	var LoggedinUsername = window.localStorage["UserName"];
	$interval(function(){
	if(LoggedinUsername!=null&&LoggedinUsername!=undefined)
	{
		var CompostPortsGetURLUser = CompostPortsGetURL+"?user="+LoggedinUsername;
		WebServiceCall.StartSpin();
		WebServiceCall.WSCallGet(CompostPortsGetURLUser).then(function(CompostPortsReturn){
			var UserCompostPorts = CompostPortsReturn;
			// console.log(JSON.stringify(UserCompostPorts));
			var AllSensorsArr = [];
			for(var i=0;i<UserCompostPorts.length;i++)
			{
				
				var UserPort = UserCompostPorts[i];
				console.log("up:"+UserPort.SensorName);
				// console.log(JSON.stringify(UserPort));
				AllSensorsArr.push(UserPort.DisplayName);
			}
			var CompostPortsStatusWithIDs = CompostPortsStatusURL+"/"+AllSensorsArr.join('|');
			console.log(AllSensorsArr.join('|'));
			WebServiceCall.WSCallGet(CompostPortsStatusWithIDs).then(function(StatusReturn){
				console.log(JSON.stringify(StatusReturn));
				$scope.CompostPortsList = StatusReturn;
				WebServiceCall.StopSpin();
			},function(err){
				console.log("err"+JSON.stringify(err));
			});
		},function(err){
			console.log("err comports:"+JSON.stringify(err));
		});
	}
	else
	{
		$state.go('login');
	}
},5000)
})

.controller('RegSrcPageCtrl',function(){

})
.controller('RegisterSourceCtrl',function(){
	
})

.controller('FindNearByCtrl',function($scope,$cordovaGeolocation,WebServiceCall,$compile,$ionicNavBarDelegate){
	
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		$ionicNavBarDelegate.showBackButton(false);
    });
	
	var options = {timeout: 10000, enableHighAccuracy: true};
	var latlons = [{lat:"12.9450362",lon:"77.6970354",title:"msg1"},{lat:"12.9550364",lon:"77.6890356",title:"msg2"},{lat:"12.9950366",lon:"77.6800358",title:"msg3"}];
	var GlobalMarkersData;
	var GlobalMap;
	
	var GreenPinColor = "69fe75";//"FE7569";
	var YellowPinColor = "FFFF00";
	var RedPinColor = "FE7569";
	var RedPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + RedPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var YellowPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + YellowPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var GreenPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + GreenPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		new google.maps.Size(40, 37),
		new google.maps.Point(0, 0),
		new google.maps.Point(12, 35));
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var latLng1 = new google.maps.LatLng(19.1759668, 72.79504659999998);
		console.log(""+position.coords.latitude+"---"+ position.coords.longitude);
		var mapOptions = {
		  center: latLng1,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var MarkersURL = GetCompostPortsURL;
		var MarkersURLAll = MarkersURL+"?user=All"; 
		var content="yes, click";
		WebServiceCall.WSCallGet(MarkersURLAll).then(function(resp){
			var markers = resp;
			GlobalMarkersData = markers;
			$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			GlobalMap =$scope.map;
			var infoWindow = new google.maps.InfoWindow();
			var bounds = new google.maps.LatLngBounds();
			
				
			for (var i = 0; i < markers.length; i++) {
				var data = markers[i];
				var myLatlng = new google.maps.LatLng(data.lat, data.long);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: $scope.map,
					title: data.title,
					icon:RedPinImage,
					shadow:pinShadow
				});
				bounds.extend(myLatlng);
				//Attach click event to the marker.
				(function (marker, data) {
					var infoWindowContent = "<div style = 'width:200px;min-height:40px'>"+"<p>" + data.DisplayName + "</p>"
											+ "<button ng-click="+"\""+"MarkerClick('"+data.SensorName+"')"+"\""+">"+"Schedule Pick"+"</button>"+"</div>";
						console.log(infoWindowContent);
					var compiled = $compile(infoWindowContent)($scope);
					// console.log(compiled["body"]);
					google.maps.event.addListener(marker, "click", function (e) {
						//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
						infoWindow.setContent(compiled[0]);
						infoWindow.open($scope.map, marker);
					});
				})(marker, data);
				$scope.map.fitBounds(bounds);
			}
		});
		
		
	  }, function(error){
		console.log("Could not get location");
	  });
	  
	  $scope.MarkerClick = function(sid){
		  
		  var ScheduleURL = SchedulePickupURL;
		  var ConstSID = "QaaS-Pi1";
		  // sid = "QaaS-Pi1";//comment this line if u can insert any
		  var input={
			  "Id":ConstSID,
			  "Value":1
		  };
		  var infoWindowComplete = new google.maps.InfoWindow();
		  console.log("input"+JSON.stringify(input));
		  WebServiceCall.WSCall(ScheduleURL,input).then(function(resp){
			  console.log("resp:"+JSON.stringify(resp));
			  //find lat long of sid
			  for(var n=0;n<GlobalMarkersData.length;n++)
			  {
				  if(sid==GlobalMarkersData[n].SensorName)
				  {
					  var ScheduledSensorData = GlobalMarkersData[n];
					  var pickLatLong = new google.maps.LatLng(ScheduledSensorData.lat,ScheduledSensorData.long);
					  // alert(GlobalMarkersData[n].lat);
					var marker = new google.maps.Marker({
						position: pickLatLong,
						map: GlobalMap,
						title: "some",
						icon:YellowPinImage,
						shadow:pinShadow
					});
					(function (marker) {
						var infoWindowContent = "<div style = 'width:200px;min-height:40px'>"+"<p>" + ScheduledSensorData.DisplayName + "</p>"
												+ "<button ng-click="+"\""+"MarkerClickComplete('"+ScheduledSensorData.SensorName+"')"+"\""+">"+"Picked"+"</button>"+"</div>";
							console.log(infoWindowContent);
						var compiled = $compile(infoWindowContent)($scope);
						// console.log(compiled["body"]);
						google.maps.event.addListener(marker, "click", function (e) {
							//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
							infoWindowComplete.setContent(compiled[0]);
							infoWindowComplete.open($scope.map, marker);
						});
					})(marker);
				  }
			  }
			  $scope.MarkerClickComplete =function(SensorId){
				  var ScheduleURL = SchedulePickupURL;
				  var ConstSID = "QaaS-Pi1";
				  // sid = "QaaS-Pi1";//comment this line if u can insert any
				  var input={
					  "Id":ConstSID,
					  "Value":0
				  };
				  var infoWindowComplete = new google.maps.InfoWindow();
				  console.log("input"+JSON.stringify(input));
				  WebServiceCall.WSCall(ScheduleURL,input).then(function(resp){
				  console.log("si:"+JSON.stringify(SensorId));
				  // console.log(SensorInfo.lat);
				  var sid = SensorId;
				  for(var n=0;n<GlobalMarkersData.length;n++)
				  {
					  if(sid==GlobalMarkersData[n].SensorName)
					  {
						  var PickedSensorInfo = GlobalMarkersData[n];
						  var pickedLatLong = new google.maps.LatLng(PickedSensorInfo.lat,PickedSensorInfo.long);
							var marker = new google.maps.Marker({
									position: pickedLatLong,
									map: GlobalMap,
									title: "some",
									icon:GreenPinImage,
									shadow:pinShadow
								});
					  }
				  }
				});
				  
			  }
			  
			  
		  },function(err){
			  console.log("err"+JSON.stringify(err));
		  });
	}
	
	$scope.doRefresh = function(){
		var options = {timeout: 10000, enableHighAccuracy: true};
	var latlons = [{lat:"12.9450362",lon:"77.6970354",title:"msg1"},{lat:"12.9550364",lon:"77.6890356",title:"msg2"},{lat:"12.9950366",lon:"77.6800358",title:"msg3"}];
	var GlobalMarkersData;
	var GlobalMap;
	
	var GreenPinColor = "69fe75";//"FE7569";
	var YellowPinColor = "FFFF00";
	var RedPinColor = "FE7569";
	var RedPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + RedPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var YellowPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + YellowPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var GreenPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + GreenPinColor,
		new google.maps.Size(21, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(10, 34));
	var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		new google.maps.Size(40, 37),
		new google.maps.Point(0, 0),
		new google.maps.Point(12, 35));
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var latLng1 = new google.maps.LatLng(19.1759668, 72.79504659999998);
		console.log(""+position.coords.latitude+"---"+ position.coords.longitude);
		var mapOptions = {
		  center: latLng1,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var MarkersURL = GetCompostPortsURL;
		var MarkersURLAll = MarkersURL+"?user=All"; 
		var content="yes, click";
		WebServiceCall.WSCallGet(MarkersURLAll).then(function(resp){
			var markers = resp;
			GlobalMarkersData = markers;
			$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			GlobalMap =$scope.map;
			var infoWindow = new google.maps.InfoWindow();
			var bounds = new google.maps.LatLngBounds();
			
				
			for (var i = 0; i < markers.length; i++) {
				var data = markers[i];
				var myLatlng = new google.maps.LatLng(data.lat, data.long);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: $scope.map,
					title: data.title,
					icon:RedPinImage,
					shadow:pinShadow
				});
				bounds.extend(myLatlng);
				//Attach click event to the marker.
				(function (marker, data) {
					var infoWindowContent = "<div style = 'width:200px;min-height:40px'>"+"<p>" + data.DisplayName + "</p>"
											+ "<button ng-click="+"\""+"MarkerClick('"+data.SensorName+"')"+"\""+">"+"Schedule Pick"+"</button>"+"</div>";
						console.log(infoWindowContent);
					var compiled = $compile(infoWindowContent)($scope);
					// console.log(compiled["body"]);
					google.maps.event.addListener(marker, "click", function (e) {
						//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
						infoWindow.setContent(compiled[0]);
						infoWindow.open($scope.map, marker);
					});
				})(marker, data);
				$scope.map.fitBounds(bounds);
			}
		});
		
		
	  }, function(error){
		console.log("Could not get location");
	  });
	}
	
	function refresh(){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		
		var options = {timeout: 10000, enableHighAccuracy: true};
		var latlons = [{lat:"12.9450362",lon:"77.6970354",title:"msg1"},{lat:"12.9550364",lon:"77.6890356",title:"msg2"},{lat:"12.9950366",lon:"77.6800358",title:"msg3"}];
		var GlobalMarkersData;
		var GlobalMap;
		
		var GreenPinColor = "69fe75";//"FE7569";
		var YellowPinColor = "FFFF00";
		var RedPinColor = "FE7569";
		var RedPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + RedPinColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34));
		var YellowPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + YellowPinColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34));
		var GreenPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + GreenPinColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34));
		var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
			new google.maps.Size(40, 37),
			new google.maps.Point(0, 0),
			new google.maps.Point(12, 35));
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var latLng1 = new google.maps.LatLng(19.1759668, 72.79504659999998);
			console.log(""+position.coords.latitude+"---"+ position.coords.longitude);
			var mapOptions = {
			  center: latLng1,
			  zoom: 15,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var MarkersURL = GetCompostPortsURL;
			var MarkersURLAll = MarkersURL+"?user=All"; 
			var content="yes, click";
			WebServiceCall.WSCallGet(MarkersURLAll).then(function(resp){
				var markers = resp;
				GlobalMarkersData = markers;
				$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
				GlobalMap =$scope.map;
				var infoWindow = new google.maps.InfoWindow();
				var bounds = new google.maps.LatLngBounds();
				
					
				for (var i = 0; i < markers.length; i++) {
					var data = markers[i];
					var myLatlng = new google.maps.LatLng(data.lat, data.long);
					var marker = new google.maps.Marker({
						position: myLatlng,
						map: $scope.map,
						title: data.title,
						icon:RedPinImage,
						shadow:pinShadow
					});
					bounds.extend(myLatlng);
					//Attach click event to the marker.
					(function (marker, data) {
						var infoWindowContent = "<div style = 'width:200px;min-height:40px'>"+"<p>" + data.DisplayName + "</p>"
												+ "<button ng-click="+"\""+"MarkerClick('"+data.SensorName+"')"+"\""+">"+"Schedule Pick"+"</button>"+"</div>";
							console.log(infoWindowContent);
						var compiled = $compile(infoWindowContent)($scope);
						// console.log(compiled["body"]);
						google.maps.event.addListener(marker, "click", function (e) {
							//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
							infoWindow.setContent(compiled[0]);
							infoWindow.open($scope.map, marker);
						});
					})(marker, data);
					$scope.map.fitBounds(bounds);
				}
		});
		
		
	  }, function(error){
		console.log("Could not get location");
	  });
	}

})

.controller('RegSourceViewCtrl',function($scope,$state,WebServiceCall){
	// alert("came");
	// $ionicNavBarDelegate.showBackButton(true);
	$scope.goBack = function(){
		$state.go('CompostPorts');
	}
	
	$scope.DoRegSrc = function(){
		var address = $scope.Address;
		var contactname = $scope.ContactName;
		var contactnumber = $scope.ContactNumber;
		var alt1 = $scope.AltContact1;
		var alt2 = $scope.AltContact2;
		var stype = $scope.SourceType;
		var lattitude = $scope.Lattitude;
		var longitude = $scope.Longitude;
		$state.go("FindNearBy");
	}
});

