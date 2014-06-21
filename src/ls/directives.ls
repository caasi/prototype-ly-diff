mod = angular.module 'caasi' <[caasi.services]>
.directive \lyDiff (model) ->
  restrict: \A
  scope: true
  templateUrl: './template/tpl.html'
