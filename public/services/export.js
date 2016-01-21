angular.module('myApp')
  .service('FileExporter', [function() {
    this.export = function(list, settings) {
      var exportData = "/ip firewall filter \r\n";
      var temp = '';
      var port = '';
      var protocol = '';
      console.log(settings);

      angular.forEach(list, function(value, key) {
        var chain = value.chain;
        // var address_list = value.address_list;
        var address_list_timeout = value.address_list_timeout;
        var action = value.action;
        var comment = value.comment;
        // var src_address_list = value.src_address_list;
        var protocol = value.protocol;
        var port = value.port;
        //Auto increment the src_address_list
        var srcAddrList = key > 0 ? 'src-address-list=' + settings.addressListName + (key - 1) : ' ';

        temp =
          'add ' +
          'chain=' + chain +
          ' action=' + action +
          ' protocol=' + value.protocol +
          ' address-list=' + settings.addressListName + key + ' ' +
          srcAddrList +
          ' address-list-timeout=' + address_list_timeout +
          ' dst-port=' + value.port +
          ' log=no log-prefix="" ' +
          '\\ comment="' + comment + '" \r\n';
        exportData += temp;
      });
      //chain=input action=drop src-address-list=!Knock99 in-interface=ether1 log=yes log-prefix=""

      var establishedRelated = function() {
        if (settings.isEstablished === true && settings.isRelated === true) {
          return 'established,related';
        }
        if (settings.isEstablished === true && settings.isRelated === false) {
          return 'established';
        }
        if (settings.isEstablished === false && settings.isRelated === true) {
          return 'related';
        }
        if (settings.isEstablished === false && settings.isRelated === false) {
          return '';
        }
      };

      exportData += 'add chain=input connection-state=' + establishedRelated() + '\r\n';
      console.log('downlaod ?!?!?');
      if (settings.isDroppable === true) {
        exportData += 'add action=drop chain=input disabled=yes dst-port=' + settings.dropPorts + ' protocol=tcp src-address-list=!' + settings.addressListName + (list.length - 1);
      }

      return exportData;
    };

  }]);
