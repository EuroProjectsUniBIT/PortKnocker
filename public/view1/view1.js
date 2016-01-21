(function() {
  'use strict';

  angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/generator', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$q', '$timeout', 'KnockRequester', 'FileExporter', 'ElementFactory', 'RangeService',
    function($scope, $q, $timeout, KnockRequester, FileExporter, ElementFactory, RangeService) {


      function saveToLocal() {
        localStorage.setItem('list', JSON.stringify($scope.list));
        localStorage.setItem('settings', JSON.stringify($scope.settings));
      }
      
      $scope.applyTimeout = function() {
        for (var i = 0; i < $scope.list.length; i++) {
          $scope.list[i].address_list_timeout = $scope.settings.defaultTimeout;
        }
        saveToLocal();
      };

      document.getElementById('port-table').addEventListener('keyup', saveToLocal);
      document.getElementById('port-table').addEventListener('click', saveToLocal);

      document.getElementById('myModal').addEventListener('keyup', saveToLocal);
      document.getElementById('myModal').addEventListener('click', saveToLocal);

      if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (localStorage.getItem('list')) {
          $scope.list = JSON.parse(localStorage.getItem('list'));
          // saveToLocal();
        } else {
          $scope.list = ElementFactory.generateRandomList(5, $scope.settings);
          saveToLocal();
        }
        if (localStorage.getItem('settings') !== "undefined") {
          $scope.settings = JSON.parse(localStorage.getItem('settings'));
          // saveToLocal();
        } else {
          $scope.settings = {
            isEstablished: true,
            isRelated: true,
            dropPorts: [21, 22, 8291, 8080],
            generateErrors: [],
            isDroppable: false,
            addressListName: 'Knocker',
            defaultTimeout: '5m'
          };
          saveToLocal();
        }

      } else {
        // Sorry! No Web Storage support..
      }

      $scope.protocols = ElementFactory.protocols();
      $scope.actions = ElementFactory.actions();
      $scope.chains = ElementFactory.chains();
      $scope.qti = $scope.list.length || 5;

      $scope.generate = function(amount) {

        // validate the dropPorts
        if (typeof $scope.settings.dropPorts === "string") {
          $scope.settings.dropPorts = $scope.settings.dropPorts.split(',');
        }
        $scope.settings.generateErrors = [];
        var counter = 200;

        $scope.settings.dropPorts.forEach(function(value) {
          if (!(+value >= 1 && +value <= 65535)) {
            console.log('bad ?');
            $scope.settings.generateErrors.push(value);
            console.log($scope.settings.generateErrors);
            $timeout(function() {
              // $scope.generateErrors.pop();
            }, counter += 200);
          }
        });

        $scope.list = ElementFactory.generateRandomList(amount, $scope.settings);
        saveToLocal();
      };

      $scope.export = function() {
        $scope.exportData = FileExporter.export($scope.list, $scope.settings);
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
