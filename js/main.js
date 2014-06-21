(function(){
  var base, mod, slice$ = [].slice, replace$ = ''.replace;
  base = "http://api.ly.g0v.tw/v0/collections/";
  angular.module('caasi.services', []).factory('model', ['$q', '$http'].concat(function($q, $http){
    return {
      get: function(it){
        return $http({
          method: 'GET',
          cache: true,
          url: base + it
        });
      },
      parseHeading: function(heading){
        var ref$, _, _items, zhutil;
        if ((ref$ = heading.match(/第(.+)條(?:之(.+))?/)) != null) {
          _ = ref$[0], _items = slice$.call(ref$, 1);
        }
        if (!_items) {
          return heading;
        }
        zhutil = require('zhutil');
        return _items.filter(function(it){
          return it;
        }).map(zhutil.parseZHNumber).join('-');
      },
      parse: function(article){
        return {
          text: replace$.call(article, /^第(.*?)(條(之.*?)?|章|篇|節)\s+/, ''),
          heading: this.parseHeading(replace$.call(RegExp.lastMatch, /\s+$/, ''))
        };
      }
    };
  }));
  mod = angular.module('caasi', ['caasi.services']).directive('lyDiff', function(model){
    return {
      restrict: 'A',
      scope: true,
      templateUrl: './template/tpl.html'
    };
  });
  this.BillsCtrl = function($scope, model){
    $scope.bills = ['989L16035', '970L19045', '1619L16058'];
    return $scope.get = function(bill){
      return model.get("bills/" + bill + "/data").success(function(data){
        var contents, i$, len$, content, results$ = [];
        console.log(data);
        contents = data.content[0].content;
        for (i$ = 0, len$ = contents.length; i$ < len$; ++i$) {
          content = contents[i$];
          results$.push(console.log(model.parse(content[0])));
        }
        return results$;
      });
    };
  };
}).call(this);
