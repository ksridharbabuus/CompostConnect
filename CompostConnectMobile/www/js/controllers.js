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
.controller('LoginPageCtrl',function($scope,$state){
	$scope.DoLogin = function(){
		var username = $scope.userId;
		var pwd = $scope.password;

		var UserProducerType = "PRODUCER"; 
		var UserConsumerType = "CONSUMER"; 

		var loginusrtype = "PRODUCER";//CONSUMER
		if(loginusrtype==UserProducerType)
		{
			$state.go('ProducerHome');	
		}
		else if(loginusrtype=="CONSUMER")
		{
			$state.go('ConsumerHome');
		}
		
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
.controller('FindNearByCtrl',function(){
	
})