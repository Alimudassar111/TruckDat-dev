app.controller("ContactCtrl", function ContactCtrl($scope) {

  $scope.contacts = [];

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    console.log(message);

    var respStr = JSON.stringify(message);
    var respJSONobj = JSON.parse(respStr);
    var res = JSON.stringify(respJSONobj.object);
    
    console.log("Carriage Details: " + res);
    var obj = JSON.parse(res);
    
    //console.log(obj.name);
    
    $scope.contacts.push({"name": obj.name,
      "description": obj.description,
      "pickuplocation": obj.pickuplocation,
      "dropofflocation": obj.dropofflocation,
      "time":obj.time,
      "date":obj.date});

  });

});

app.controller("ContactEditCtrl", function ContactEditCtrl($scope, $routeParams, $location) {
  var newContact = false;
  if ($routeParams.contactId) {
    console.log("inside existing contact if loop : "+$routeParams.contactId);
    $scope.contact = $scope.contacts[$routeParams.contactId];
  }

  else {
    $scope.contact = {};
    newContact = true;
  }
  
  $scope.saveContact = function() {
    if (newContact) {

      myDataRef.push({
        object: $scope.contact
      });

      console.log("inside save contact");
    }
    console.log("rendering path : list/detaile");
    $location.path("/list/detaile");
  };
});


app.controller("ContactListCtrl", function ContactListCtrl($scope) {
  $scope.mode = 'vignette';
});


app.controller("ContactDetailsCtrl", function ContactDetailsCtrl($scope,  $routeParams){

if ($routeParams.contactId) {
    console.log("ContactDetailsCtrl---inside existing contact if loop : "+$routeParams.contactId);
    $scope.contact = $scope.contacts[$routeParams.contactId];
  }

});
/*app.controller("OrderCtrl", function OrderListCtrl($scope) {
  $scope.mode = 'vignette';
});*/

app.controller("OrderEditCtrl", function OrderEditCtrl($scope, $routeParams, $location, bidFactory) {
  var newOrder = false;

  function init() {
    console.log("contact id : "+$routeParams.contactId);
    if ($routeParams.orderId) {
      $scope.order = bidFactory.getOrder($routeParams.orderId);
    } else {
      $scope.order = {};
      newOrder = true;
    }
  }

  init();


  $scope.saveOrder = function(contactId) {
    console.log("saving order : "+contactId);
    if (newOrder) {
      
      bidFactory.addOrder($scope.order);
      console.log("pushing"+$scope.order+" to quotes firebase")
      
      myQuotesRef.push({
        object: $scope.order
      });
      
      console.log("data pushed to quotes");
    }
    //$location.path("/qoutes");
    $location.path("/list");
  };
  
});

app.controller("ViewQuotesCtrl", function ViewQuotesCtrl($scope, $routeParams){

console.log("rendering view quotes page");

});