'use strict';

describe('Controller: ColorsCtrl', function () {

  // load the controller's module
  beforeEach(module('iconicApp'));

  var ColorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ColorsCtrl = $controller('ColorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
