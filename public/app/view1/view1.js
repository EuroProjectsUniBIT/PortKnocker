'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$q', 'KnockRequester', function($scope, $q, KnockRequester) {


  $scope.protocols = ['icmp', 'tcp'];

  $scope.list = [{
    ip: '192.168.137.7',
    port: '23',
    protocol: $scope.protocols[1]
  }, {
    ip: '192.168.137.7',
    port: '8768',
    protocol: $scope.protocols[1]
  }, {
    ip: '192.168.137.7',
    port: '',
    protocol: $scope.protocols[0]
  }];
  // console.log($scope.list);
  $scope.data = "data: text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.list));

  $scope.knockAll = function() {
    function timeoutRequest(i) {
      setTimeout(function() {
        KnockRequester.sendKnock($scope.list[i]);
      }, 60 * i);
    };
    for (var i = 0; i < $scope.list.length; i++) {
      timeoutRequest(i);
    }

  };

  $scope.import = function() {

    //
  };
  $scope.removeArrayElement = function(array, index) {
    array.splice(index, 1);
  };

  $scope.copyAndAdd = function(array, index) {
    var original = array[index];
    var copy = {
      ip: original.ip,
      port: original.port,
      protocol: original.protocol
    };
    array.splice(index + 1, 0, copy);
  };

  $scope.moveArray = function(array, from, to) {
    if (!(to < 0)) {
      array.splice(to, 0, array.splice(from, 1)[0]);
    }

    console.log(array);
  };

  $scope.addAction = function() {
    $scope.list.push({
      ip: '192.168.137.7',
      port: '23',
      protocol: 'tcp'
    });
  };

  $scope.knock = function(data) {
    // console.log(data);
    KnockRequester.sendKnock(data);
    // console.log($scope.data);
  };
}]);
