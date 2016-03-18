var appCtrls = angular.module('starter.controllers',[])
.controller('LoginCtrl',function(){
	// alert("loginCtrl");
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
.controller('CompostPortsCtrl',function(){
	// alert("loginCtrl");
})
.controller('RegCompostPortsCtrl',function(){
	// alert("loginCtrl");
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
			//var loginusrtype = "PRODUCER";//CONSUMER
			if(UserTypeReturn.toLowerCase()==UserProducerType.toLowerCase())
			{
				
				$state.go('CompostPorts');	
			}
			else if(UserTypeReturn.toLowerCase()==UserConsumerType.toLowerCase())
			{
				$state.go('FindNearBy');
			}
			WebServiceCall.StopSpin();
		},function(err){
			WebServiceCall.StopSpin();
		});
		
		
	}
})
.controller('RegisterPageCtrl',function($scope,$state){
	$scope.DoRegister = function(){
		console.log("register");

		var FName = $scope.User.FName;
		var LName = $scope.User.LName;
		var Email = $scope.User.Email;
		var pwd = $scope.User.Password;
		var phoneno = $scope.User.Phone;
		var typesel = $scope.User.TypeSelected;

		// alert(typesel);
		var UserProducerType = "PRODUCER"; 
		var UserConsumerType = "CONSUMER"; 
		if(typesel.toUpperCase()==UserProducerType)
		{
			$state.go('ProducerHome');	
		}
		else if(typesel.toUpperCase()==UserConsumerType)
		{
			$state.go('ConsumerHome');
		}
	}
})
.controller('CompostPortsPageCtrl',function($scope,$state){
	var ArrCompostPorts = [{"SensorName":"Sensor1","Status":"full"},
							{"SensorName":"Sensor2","Status":"full"},
							{"SensorName":"Sensor3","Status":"empty"}
							];
	$scope.CompostPortsList = ArrCompostPorts;
})
.controller('RegSrcPageCtrl',function(){

})
.controller('RegisterSourceCtrl',function(){
	
})
.controller('FindNearByCtrl',function($scope,$cordovaGeolocation){
	var options = {timeout: 10000, enableHighAccuracy: true};
	var latlons = [{lat:"12.9450362",lon:"77.6970354",title:"msg1"},{lat:"12.9550364",lon:"77.6890356",title:"msg2"},{lat:"12.9950366",lon:"77.6800358",title:"msg3"}];
	
	  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var latLng1 = new google.maps.LatLng(19.1759668, 72.79504659999998);
		console.log(""+position.coords.latitude+"---"+ position.coords.longitude);
		var mapOptions = {
		  center: latLng1,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var content="yes, click";
	 var markers = [
    {
        "title": 'Aksa Beach',
        "lat": '19.1759668',
        "lng": '72.79504659999998',
        "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
    },
    {
        "title": 'Juhu Beach',
        "lat": '19.0883595',
        "lng": '72.82652380000002',
        "description": 'Juhu Beach is one of favourite tourist attractions situated in Mumbai.'
    },
    {
        "title": 'Girgaum Beach',
        "lat": '18.9542149',
        "lng": '72.81203529999993',
        "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
    },
    {
        "title": 'Jijamata Udyan',
        "lat": '18.979006',
        "lng": '72.83388300000001',
        "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
    },
    {
        "title": 'Sanjay Gandhi National Park',
        "lat": '19.2147067',
        "lng": '72.91062020000004',
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    }
    ];
		$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var infoWindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();
		
		for (var i = 0; i < markers.length; i++) {
            var data = markers[i];
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.map,
                title: data.title
            });
			bounds.extend(myLatlng);
            //Attach click event to the marker.
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                    infoWindow.open($scope.map, marker);
                });
            })(marker, data);
			$scope.map.fitBounds(bounds);
		}
		
 
	  }, function(error){
		console.log("Could not get location");
	  });
});
