angular.module('myApp')
  .service('FileExporter', [function() {
    this.export = function(list) {
      var exportData = "/ip firewall filter \r\n";
      var temp = '';
      var port = '';
      var protocol = '';
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
        var srcAddrList = key > 0 ? 'src-address-list=Knocker' + (key - 1) : ' ';

        temp =
          'add ' +
          'chain=' + chain +
          ' action=' + action +
          ' protocol=' + value.protocol +
          ' address-list=Knocker' + key + ' ' +
          srcAddrList +
          ' address-list-timeout=' + address_list_timeout +
          ' dst-port=' + value.port +
          ' log=no log-prefix="" ' +
          '\\ comment="' + comment + '" \r\n';
        exportData += temp;
      });
      //chain=input action=drop src-address-list=!Knock99 in-interface=ether1 log=yes log-prefix=""

      exportData += 'add chain=input action=drop src-address-list=!Knocker' + (list.length - 1) + ' in-interface=ether1 log=yes log-prefix="_INPUT"';

      return exportData;
    };

  }]);
