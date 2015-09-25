'use strict';
/* global chai:true */
/* global describe:true, it:true */

var expect = chai.expect;

describe('deling.js', function() {

  var deling = window.deling,
      networks = deling.networks;

  var createContainer = function (dataAttributes) {
    dataAttributes = dataAttributes || {};

    var container = document.createElement('div');
    var delingDiv = document.createElement('div');
    delingDiv.setAttribute('class', 'deling');
    Object.keys(dataAttributes).forEach(function (a) {
      delingDiv.setAttribute(a, dataAttributes[a]);
    });
    container.appendChild(delingDiv);

    deling(container);
    return container.firstChild;
  };

  it('Should expose deling on window', function () {
    expect(typeof(window.deling)).to.be.equal('function');
  });

  it('Should create all supported networks when no networks given', function () {
    var dd = createContainer();

    expect(dd.children.length).to.be.equal(Object.keys(networks).length);
  });

  describe('Networks', function () {
    Object.keys(networks).forEach(function (n) {
      describe('Should be able to use ' + n + ' as network', function () {

        it('Should set correct classes', function () {
          var dd = createContainer({
            'data-networks': n,
          });

          expect(dd.children.length).to.be.equal(1);
          expect(dd.firstChild.className).to.be.equal('deling-button deling-color network-' + n);
        });

        it('Should insert correct icon', function () {
          var dd = createContainer({
            'data-networks': n
          });

          var iconName = networks[n].icon || n;

          expect(dd.firstChild.firstChild.tagName).to.be.equal('I');
          expect(dd.firstChild.firstChild.className).to.be.equal('deling-icon deling-icon-' + iconName);
        });
      });
    });

  });


});
