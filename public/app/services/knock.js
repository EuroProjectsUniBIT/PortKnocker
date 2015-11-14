'use strict';

angular.module('myApp')
  .service('KnockRequester', ['$http', function($http) {
    this.sendKnock = function(input) {

      var ip = input.ip;
      var port = input.port | null;

      if (input.protocol === "icmp") {
        $http.get('http://localhost:3000/ping?ip=' + ip).then(function(result) {
          console.log('ICMP request IP: ' + ip + 'PORT:' + port);
        });
      }

      if (input.protocol === "tcp") {
        // console.log('http://localhost:3000/tcp?ip=' + ip + '&port=' + port);
        $http.get('http://localhost:3000/tcp?ip=' + ip + '&port=' + port).then(function(result) {
          console.log('TCP request IP: ' + ip + 'PORT:' + port);
        });
      }


    };
  }]);
