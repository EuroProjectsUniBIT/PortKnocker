(function() {
  'use strict';

  angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$q', 'KnockRequester', function($scope, $q, KnockRequester) {

    var ip = '192.168.137.184';
    $scope.protocols = ['tcp', 'udp'];

    $scope.generateRandomList = function(items) {
      var result = [];
      for (var i = 0; i < items; i++) {
        var protocol = Math.floor((Math.random() * 2));
        var port = Math.floor((Math.random() * 65535) + 1);
        result.push({
          ip: ip,
          protocol: $scope.protocols[protocol],
          port: port
        });
      }
      $scope.list = result;
      return result;
    };
    // $scope.list = $scope.generateRandomList(10);
    console.log($scope.generateRandomList(10));

    $scope.list = [{
      ip: ip,
      port: '123',
      protocol: $scope.protocols[0]
    }, {
      ip: ip,
      port: '456',
      protocol: $scope.protocols[0]
    }, {
      ip: ip,
      port: '789',
      protocol: $scope.protocols[1]
    }];
    // console.log($scope.list);

    $scope.exportItemsInList = function() {
      $scope.exportData = "/ip firewall filter \r\n";
      var temp = '';
      var port = '';
      var protocol = '';
      angular.forEach($scope.list, function(value, key) {
        // var chain,
        //   action,
        //   protocol,
        //   address_list,
        //   address_list_timeout,
        //   dst_port,
        //   log,
        //   comment;
        var protocol = value.protocol;
        var port = value.port;
        var srcAddrList = key > 0 ? 'src-address-list=Knocker' + (key - 1) : '';
        temp = 'add chain=input action=add-src-to-address-list protocol=' + value.protocol +
          ' address-list=Knocker' + key + ' ' +
          srcAddrList +
          ' address-list-timeout=5m dst-port=' + value.port + ' log=no log-prefix="" \\ comment="test1" \r\n';
        $scope.exportData += temp;
      });
      //chain=input action=drop src-address-list=!Knock99 in-interface=ether1 log=yes log-prefix=""

      $scope.exportData += 'add chain=input action=drop src-address-list=!Knocker' + ($scope.list.length - 1) + ' in-interface=ether1 log=yes log-prefix="_INPUT"';
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
}());
