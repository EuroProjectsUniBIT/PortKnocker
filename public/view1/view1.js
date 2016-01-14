(function() {
  'use strict';

  angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$q', 'KnockRequester', 'FileExporter', 'ElementFactory', 'RangeService',
    function($scope, $q, KnockRequester, FileExporter, ElementFactory, RangeService) {
      $scope.protocols = ElementFactory.protocols();
      $scope.actions = ElementFactory.actions();
      $scope.list = ElementFactory.list();
      // $scope.list = ElementFactory.generateRandomList(3);
      $scope.generate = function(amount) {
        $scope.list = ElementFactory.generateRandomList(amount);
      };
      $scope.qti = 5;
      console.log($scope.list);
      $scope.exportData = FileExporter.export($scope.list);
      $scope.data = "data: text/plain;charset=utf-8," + encodeURIComponent($scope.exportData);


      $scope.knockAll = function() {
        function timeoutRequest(i) {
          setTimeout(function() {
            KnockRequester.sendKnock($scope.list[i]);
          }, 60 * i);
        }
        for (var i = 0; i < $scope.list.length; i++) {
          timeoutRequest(i);
        }
      };
      $scope.import = function() {
        // TODO
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
    }
  ]);
}());
