var app = angular.module('myApp', [
  'ngRoute'
  ]);

var myDataRef = new Firebase('https://truckdat1.firebaseio.com');
//var myDataRef = new Firebase('https://freightload1.firebaseio.com/');
//var myQuotesRef = new Firebase('https://qoutes.firebaseio.com/');

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/edit', {
      templateUrl: 'partial/partial_edit.html',
      controller: "ContactEditCtrl"
    });

    $routeProvider.when('/edit/:contactId', {
      templateUrl: 'partial/partial_edit.html',
      controller: "ContactEditCtrl"
    });

    $routeProvider.when('/list', {
      templateUrl: 'partial/partial_list.html',
      controller: "ContactListCtrl"
    });

    $routeProvider.when('/detaile/:contactId', {
      templateUrl: 'partial/partial_detaile.html',
      controller: "ContactDetailsCtrl"
    });
  
    /*$routeProvider.when('/order/:orderId', {
      templateUrl: 'partial/partial_order.html',
      controller: "OrderEditCtrl"
    });*/

    $routeProvider.when('/order/:contactId', {
      templateUrl: 'partial/partial_order.html',
      controller: "OrderEditCtrl"
    });

    $routeProvider.when('/quotes', {
      templateUrl: 'partial/partial_quotes.html',
      controller: "ViewQuotesCtrl"
    });

    $routeProvider.otherwise({
      redirectTo: '/list'
    });
  }
]);

app.directive('contactWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'template_contact.html',
    scope: {
      contact: '='
    }
  };
});

app.directive('orderWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'template_order.html',
    scope: {
      order: '='
    }
  };
});


app.factory("bidFactory", function() {
  var factory = {};

  factory.orders = [];

  factory.getOrders = function() {
    return factory.orders;
  };

  factory.getOrder = function(orderId) {
    for (var i = 0; i < factory.orders.length; i++) {
      if (factory.order[i].id === orderId) {
        return factory.order[i];
      }
    }
  };

  factory.addOrder = function(order) {
    factory.orders.push(order);
  }

  return factory;
});

/*$scope.bidQuote = function(contactId) {

          console.log("contact Id : "+contactId);
}*/
