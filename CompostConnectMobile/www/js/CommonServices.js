var appSrvcs = angular.module('starter.services',[]);
appSrvcs
.service('WebServiceCall',function($http,$q,$ionicLoading){
	return{
		WSCall:function(url,inputdata){
			var deferred = $q.defer();
			// var inputData={};
			// alert(url);
			$http({
				method: "POST",
					url:url,//"https://symposium.honeywell.com/hmpsecurity/services/v1/oauth2",//url,//
					headers: {
					},
					data: inputdata,
			})
			.success(function(successResp){
				console.log("success:"+JSON.stringify(successResp));
				deferred.resolve(successResp);
			})
			.error(function(errResp){
				console.log("error:"+JSON.stringify(errResp));
				deferred.reject(errResp);
			});
			
			return deferred.promise;
		},
		WSCallGet:function(url){
			var deferred = $q.defer();
			// var inputData={};
			// alert(url);
			$http({
				method: "GET",
					url:url,//"https://symposium.honeywell.com/hmpsecurity/services/v1/oauth2",//url,//
					headers: {
					},
					data: "",
			})
			.success(function(successResp){
				console.log("success:"+JSON.stringify(successResp));
				deferred.resolve(successResp);
			})
			.error(function(errResp){
				console.log("error:"+JSON.stringify(errResp));
				deferred.reject(errResp);
			});
			
			return deferred.promise;
		},
		StartSpin: function ()
		{
          $ionicLoading.show({
			  template: '<ion-spinner class="spinner-calm"></ion-spinner>',
			  animation: 'fade-in',
                showBackdrop: true,
			});
		},
		//StopSpin
		StopSpin:function ()
		{
			  $ionicLoading.hide();
		}
	}
});