"use stritc";

var myapp = angular.module('myapp',['ngMaterial']);
myapp.service('svcSocket', ['$rootScope', function($rootScope){
	var socket = io.connect(location.host)
	this.on = function(eventName,callback){
		 socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
   					});
   })
	};
	this.emit = function(eventName,data,callback){
   socket.emit(eventName, data, function () {
     var args = arguments;
     $rootScope.$apply(function () {
       if (callback) {
         callback.apply(socket, args);
       }
     });
   })
	};
}]);

myapp.controller('ctrlListTwitts', ['svcSocket','$scope', function(svcSocket,$scope){
			$scope.lists = {};
			svcSocket.on('connect', function(){
					$scope.find = function(query,$event,list){
						console.log(list)
						//console.log($event.keyCode)
						if($event.keyCode==13&&query){
							console.log("searching >")
										svcSocket.emit('search',{query:query,list:list})
										//$scope.$emit('add_segment',{query:query,val:0})
										$scope.lists[list] = new Array()
						}
					}
			})
	svcSocket.on('new_tweet',function(opt){
		//console.log(opt)
		//console.log($scope)
		$scope.lists[opt.list].push(opt.text)
				$scope.$emit('update_chart',$scope.lists)
	})

}]);

myapp.directive('drvChart', [function(){
	return {
		template:'<canvas id="myChart" width="400" height="400"></canvas>',
		controller: function($scope, $element, $attrs) {

		},
		restrict: 'E', 
		replace:true,
		link: function($scope, iElm, iAttrs) {
			//console.log(iElm)
				var ctx = iElm[0].getContext("2d");
				var data = [{value:50,color:"#fb7f50"},{value:50,color:"#ff4771"}]
				var myNewChart = new Chart(ctx).Pie(data);
				var colors = ['#cbcbcb','#fb7f50','#ff4771','#549af6']
				$scope.$on('add_segment',function(e,data){
							myNewChart.addData({
								value:data.val,
								color:colors.pop(),
								//highlight: "#C69CBE",
								label: data.query
							})
						//myNewChart.update()
						console.log(myNewChart)
				})
				$scope.$on('update_chart',function(e,data){
					//console.log(data)
						//myNewChart.segments[0].value = data.twitts1.length;
						//myNewChart.segments[1].value = data.twitts2.length;
					Object.keys(data).forEach(function(val, index){
						
						myNewChart.segments[0].value = data[val].length;
						myNewChart.update()
					})
					/*
					data.forEach(function(val,index){

					})
						console.log(data)
					*/
				})

		}
	};
}]);
