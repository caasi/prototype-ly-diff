this.BillsCtrl = ($scope, model) ->
  $scope.bills =
    \989L16035
    \970L19045
    \1619L16058
    \1539L16073
    \1619L16077
    ...
  $scope.get = (bill) ->
    model.get "bills/#{bill}/data" .success (data) ->
      #console.log JSON.stringify data
      contents = data.content.0.content
      h = data.content.0.header
      switch h.0
      | \條文     =>
        for content in contents
          console.log model.parse content
      | \修正條文 =>
        for content in contents
          [original, proposed] = content.map model.parse, model
          console.log original, proposed
