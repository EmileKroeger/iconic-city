'use strict';

describe('Controller: IconsCtrl', function () {

  // load the controller's module
  beforeEach(module('iconicApp'));

  var IconsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IconsCtrl = $controller('IconsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
