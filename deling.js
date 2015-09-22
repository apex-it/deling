/**
 * deling.js is a simple share plugin with minimal fuzz.
 */

(function (window, document) {
  'use strict';

  var supportedNetworks = {
    'facebook': {
      url: 'https://www.facebook.com/share.php?u=',
      title: 'Facebook',
    },
    'twitter': {
      url: 'https://twitter.com/intent/tweet?url=',
      title: 'Twitter',
    },
    'pinterest': {
      url: 'https://pinterest.com/pin/create/button/?url=',
      title: 'Pinterest',
      icon: 'pinterest-p',
    },
    'linkedin': {
      url: 'https://www.linkedin.com/shareArticle?url=',
      title: 'LinkedIn',
    },
    'google': {
      url: 'https://plus.google.com/share?url=',
      title: 'Google Plus',
      icon: 'google-plus',
    },
    'reddit': {
      url: 'https://www.reddit.com/submit?url=',
      title: 'reddit',
    },
    'tumblr':   {
      url: 'https://www.tumblr.com/share?v=3&u=',
      title: 'tumblr',
    },
    'mail': {
      url: 'mailto:?subject=&body=',
      title: 'Mail',
      icon: 'envelope',
    },
  };

  function trim (str) {
    return str.trim();
  }

  function getSettingsForElement (element) {
    // Defaults.
    var settings = {
      url: window.location.href,
      networks: [],
      icons: true,
      names: false,
      popup: true,
    };

    for (var i = 0, j = element.attributes.length; i < j; i++) {
      var name = element.attributes[i].name;

      switch (name) {
        case 'data-networks':
          var attributeNetworks = element.attributes[i].value.split(',').map(trim);

          // Add only supported networks.
          for (var k = 0, l = attributeNetworks.length; k < l; k++) {
            if (supportedNetworks[attributeNetworks[k]]) {
              settings.networks.push(attributeNetworks[k]);
            }
          }

          break;
        case 'data-url':
          settings.url = element.attributes[i].value;
          break;

        case 'data-icons':
          settings.icons = element.attributes[i].value === 'true';
          break;

        case 'data-names':
          settings.names = element.attributes[i].value === 'true';
          break;

        case 'data-popup':
          settings.popup = element.attributes[i].value === 'true';
          break;
      }
    }

    if (!settings.networks.length) {
      Object.keys(supportedNetworks).forEach(function (n) {
        settings.networks.push(n);
      });
    }

    return settings;
  }

  function insertShareInElement (element, settings) {
    settings.networks.forEach(function (n) {
      var anchor = document.createElement('a'),
          network = supportedNetworks[n];

      anchor.setAttribute('class', 'deling-button network-' + n);
      anchor.setAttribute('href', network.url + settings.url);
      anchor.setAttribute('title', network.title);

      if (settings.popup) {
        anchor.setAttribute('target', '_blank');
      }

      if (settings.icons) {
        var icon = document.createElement('i');

        icon.setAttribute('class', 'deling-icon deling-icon-' + (network.icon || n));

        anchor.appendChild(icon);
      }

      if (settings.names) {
        var name = document.createTextNode(network.title);

        anchor.appendChild(name);
      }

      element.appendChild(anchor);
    });
  }

  function addShareToElement (element) {
    insertShareInElement(element, getSettingsForElement(element));
  }

  function findAndPrepareElements (element, className) {
    var elements = element.getElementsByClassName(className);

    for (var i = 0, j = elements.length; i < j; i++) {
      addShareToElement(elements[i]);
    }
  }

  function deling (element, className) {
    className = className || 'deling';

    if (!element) {
      throw new Error('simpleShare requires an element.');
    }

    findAndPrepareElements(element, className);
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      deling(document);
    });
  } else {
    throw new Error('deling.js requires a newish browser.');
  }

  // Assign a global for updates.
  window.deling = deling;

})(window, document);
