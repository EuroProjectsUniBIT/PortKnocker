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

      function saveToLocal() {
        localStorage.setItem('list', JSON.stringify($scope.list));
      }

      document.getElementById('port-table').addEventListener('keyup', saveToLocal);
      document.getElementById('port-table').addEventListener('click', saveToLocal);

      $scope.protocols = ElementFactory.protocols();
      $scope.actions = ElementFactory.actions();
      $scope.chains = ElementFactory.chains();


      if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (localStorage.getItem('list')) {
          $scope.list = JSON.parse(localStorage.getItem('list'));
          // saveToLocal();
        } else {
          $scope.list = ElementFactory.generateRandomList(5);
          saveToLocal();
        }
      } else {
        // Sorry! No Web Storage support..
      }
      $scope.generate = function(amount) {
        var generateTheList = confirm("Generate " + amount + " filters ?");
        if (generateTheList) {
          $scope.list = ElementFactory.generateRandomList(amount);
          saveToLocal();
        }

      };
      $scope.qti = 5;
      $scope.export = function() {
        $scope.exportData = FileExporter.export($scope.list);
        $scope.data = "data: text/plain;charset=utf-8," + encodeURIComponent($scope.exportData);
      };
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
        saveToLocal();
      };
      $scope.copyAndAdd = function(array, index) {
        var original = array[index];
        var copy = {
          ip: original.ip,
          port: original.port,
          protocol: original.protocol
        };
        array.splice(index + 1, 0, copy);
        saveToLocal();
      };
      $scope.moveArray = function(array, from, to) {
        if (!(to < 0)) {
          array.splice(to, 0, array.splice(from, 1)[0]);
        }
        saveToLocal();
      };
      $scope.addAction = function() {
        $scope.list.push({
          ip: '192.168.137.7',
          port: '23',
          protocol: 'tcp'
        });
        saveToLocal();
      };
      $scope.knock = function(data) {

        KnockRequester.sendKnock(data);
      };
    }
  ]);
}());
