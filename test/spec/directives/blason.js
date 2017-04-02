'use strict';

describe('Directive: blason', function () {

  // load the directive's module
  beforeEach(module('iconicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<blason></blason>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the blason directive');
  }));
});
