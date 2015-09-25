'use strict';
/* global chai:true */
/* global describe:true, it:true */

var expect = chai.expect;

describe('deling.js', function() {

  var deling = window.deling,
      networks = deling.networks;

  // Trick the title. Because we need it for the defaults.
  document.title = 'deling.js mock tests';

  function replacer (str, pairs) {
    str = str.toString();

    if (!pairs) {
      return str;
    }

    Object.keys(pairs).forEach(function (key) {
      var value = pairs[key];

      str = str.replace(new RegExp(key, 'g'), value);
    });

    return encodeURI(str);
  }

  var expected = {};
  Object.keys(networks).forEach(function (n) {
    expected[n] = {
      defaultHref: replacer(networks[n].url, {
        '{{url}}': window.location.href,
        '{{title}}': document.title,
        '{{media}}': '',
        '{{summary}}': '',
      }),
      titleChange: replacer(networks[n].url, {
        '{{url}}': window.location.href,
        '{{title}}': 'deling.js tests running',
        '{{media}}': '',
        '{{summary}}': '',
      }),
      mediaChange: replacer(networks[n].url, {
        '{{url}}': window.location.href,
        '{{title}}': 'deling.js tests running',
        '{{media}}': 'https://www.heimdalit.no/deling.png',
        '{{summary}}': '',
      }),
      summaryChange: replacer(networks[n].url, {
        '{{url}}': window.location.href,
        '{{title}}': 'deling.js tests running',
        '{{media}}': 'https://www.heimdalit.no/deling.png',
        '{{summary}}': 'deling.js can also provide a summary',
      }),
    };
  });

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

  it('should expose deling', function () {
    expect(typeof(window.deling)).to.be.equal('function');
  });

  it('should create all networks as default', function () {
    var dd = createContainer();

    expect(dd.children.length).to.be.equal(Object.keys(networks).length);
  });

  describe('network', function () {
    Object.keys(networks).forEach(function (n) {
      describe('should be able to use ' + n, function () {

        var iconName = networks[n].icon || n;

        it('Should set correct classes', function () {
          var dd = createContainer({
            'data-networks': n,
          });

          expect(dd.children.length).to.be.equal(1);
          expect(dd.firstChild.className).to.be.equal('deling-button deling-color network-' + n);
        });

        it('should insert correct icon', function () {
          var dd = createContainer({
            'data-networks': n,
          });

          expect(dd.firstChild.firstChild.tagName).to.be.equal('I');
          expect(dd.firstChild.firstChild.className).to.be.equal('deling-icon deling-icon-' + iconName);
        });

        it('should use correct default URL', function () {
          var dd = createContainer({
            'data-networks': n,
          });

          expect(dd.firstChild.href).to.be.equal(expected[n].defaultHref);
        });

        it('should respect new title', function () {
          var dd = createContainer({
            'data-networks': n,
            'data-title': 'deling.js tests running',
          });

          expect(dd.firstChild.href).to.be.equal(expected[n].titleChange);
        });

        it('should respect media', function () {
          var dd = createContainer({
            'data-networks': n,
            'data-title': 'deling.js tests running',
            'data-media': 'https://www.heimdalit.no/deling.png',
          });

          expect(dd.firstChild.href).to.be.equal(expected[n].mediaChange);
        });

        it('should respect summary', function () {
          var dd = createContainer({
            'data-networks': n,
            'data-title': 'deling.js tests running',
            'data-media': 'https://www.heimdalit.no/deling.png',
            'data-summary': 'deling.js can also provide a summary',
          });

          expect(dd.firstChild.href).to.be.equal(expected[n].summaryChange);
        });

        it('should contain color', function () {
          var dd = createContainer({
            'data-networks': n,
          });

          expect(dd.firstChild.className).to.be.equal('deling-button deling-color network-' + n);
        });

        it('should disable color', function () {
          var dd = createContainer({
            'data-networks': n,
            'data-color': false,
          });

          expect(dd.firstChild.className).to.be.equal('deling-button network-' + n);
        });

        it('should respect icon class', function () {
          var dd = createContainer({
            'data-networks': n,
            'data-icon-class': 'custom-icon-class-'
          });

          expect(dd.firstChild.firstChild.className).to.be.equal('deling-icon custom-icon-class-' + iconName);
        });
      });
    });

  });

  it('should disable icons', function () {
    var dd = createContainer({
      'data-icons': false,
      'data-names': true,
    });

    for (var i = 0, j = dd.children.length; i < j; i++) {
      expect(dd.children[i].children.length).to.be.equal(0);
    }
  });

  it('should insert names', function () {
    var dd = createContainer({
      'data-icons': false,
      'data-names': true,
    });

    var names = Object.keys(networks).map(function (n) {
      return networks[n].title;
    });
    for (var i = 0, j = dd.children.length; i < j; i++) {
      expect(dd.children[i].innerHTML).to.be.equal(names[i]);
    }
  });

  it('should respect popup', function () {
    var dd = createContainer({
      'data-popup': false,
    });

    for (var i = 0, j = dd.children.length; i < j; i++) {
      expect(typeof(dd.children[i].attributes.target)).to.be.equal('undefined');
    }
  });

});
