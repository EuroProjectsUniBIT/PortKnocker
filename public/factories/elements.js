angular.module('myApp')
  .factory('ElementFactory', function() {
    var factory = {};

    factory.actions = function() {
      return [
        'accept',
        'add-dst-to-address-list',
        'add-src-to-address-list',
        'drop',
        'fasttrack-connection',
        'jump',
        'log',
        'passthrough',
        'reject',
        'return',
        'tarpit'
      ];
    };

    factory.chains = function() {
      return ['forward', 'input', 'output'];
    };

    //Sample elements for the home page
    factory.list = function() {
      var ip = '192.168.137.184';
      return [{
        ip: ip,
        port: '123',
        chain: chains()[1],
        action: 'add-src-to-address-list',
        address_list: 'test',
        address_list_timeout: '5m',
        src_address_list: 'Knocker1',
        comment: 'test comment',
        protocol: factory.protocols()[0]
      }, {
        ip: ip,
        port: '123',
        chain: chains()[1],
        action: 'add-src-to-address-list',
        address_list: 'test',
        address_list_timeout: '5m',
        src_address_list: 'Knocker1',
        comment: 'test comment',
        protocol: factory.protocols()[0]
      }];
    };

    factory.protocols = function() {
      return ['tcp', 'udp'];
    };

    factory.generateRandomList = function(items) {
      var result = [];
      for (var i = 0; i < items; i++) {
        var protocol = Math.floor((Math.random() * 2));
        var port = Math.floor((Math.random() * 65535) + 1);
        result.push({
          protocol: factory.protocols()[protocol],
          port: port,
          chain: factory.chains()[1],
          action: factory.actions()[2],
          address_list_timeout: '5m',
          comment: ''
        });
      }
      return result;
    };

    return factory;
  });
