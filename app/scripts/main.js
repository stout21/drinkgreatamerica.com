(function(exports, document, FastClick) {

  'use strict';

  var MAP_HEIGHT = 0.65;

  FastClick.attach(document.body);

  // set up age verification management
  if (+sessionStorage.oldEnough === 1)
    removeAgeVerification();
  else
    document.body.addEventListener('click', function ageVerification(e) {
      if (e.target.matches('.btn-confirm')) {
        document.body.removeEventListener('click', ageVerification);
        removeAgeVerification();
      }
      if (e.target.matches('.btn-nope')) {
        var parent = $('#how-old-you-be');
        var child = parent.querySelector('p');
        var element = document.createElement('p');
        element.className = 'msg msg-error';
        element.textContent = 'Sorry, you must be at least 21 years of age to view this site.';
        parent.insertBefore(element, child.nextSibling);
      }
    }, false);

  function removeAgeVerification() {
    var LENGTH = 300;
    var node = $('#how-old-you-be');
    sessionStorage.oldEnough = 1;
    node.style.opacity = 0;
    node.style.transition = LENGTH + 'ms opacity ease-in';
    setTimeout(function() {
      node.parentNode.removeChild(node);
    }, LENGTH);

    document.body.className = '';
  }

  // resize  all the things

  var MENU_HEIGHT = 50;
  var h = window.innerHeight - MENU_HEIGHT;
  function resize(element) {
    element.style.minHeight = h + 'px';
  }

  document.body.addEventListener('resize', function() {
    h = window.innerHeight - MENU_HEIGHT;
    resizeSections();
  });

  function resizeSections() {
    $$('section:not(#responsibility)').forEach(resize);
    var g = $('#greatness');
    var c = $('#map-canvas');
    var l = $('#map-locations-list');
    g.style.minHeight =
    g.style.height =
    c.style.minHeight =
    c.style.height =
      h * MAP_HEIGHT + 'px';

    l.style.minHeight =
    l.style.height =
      (h * MAP_HEIGHT) - 38 + 'px'; // subtract the input height
  }

  resizeSections();

  document.body.addEventListener('ready', function ready(e) {
    resizeSections();
    document.body.removeEventListener('ready', ready);
  }, false);

  // Hook up the flavors section

  var TAB_IS_ACTIVE = 'tab--is-active';
  var TAB_IS_INACTIVE = 'tab--is-inactive';

  $('#flavors').addEventListener('click', function(e) {
    if (!e.target.matches('.tab-link')) return;
    e.preventDefault();

    var target = $(e.target.getAttribute('href')),
        parent;

    if (target) {
      parent = e.target.parentNode;

      // reset all the tabs
      $$('.' + TAB_IS_ACTIVE, e.target.parentNode).forEach(function(el) {
        el.classList.remove(TAB_IS_ACTIVE);
      });

      // set the new tabs to active
      e.target.className = 'tab-link ' + TAB_IS_ACTIVE;
      target.classList.add(TAB_IS_ACTIVE);
      target.classList.remove(TAB_IS_INACTIVE);

      // set everything else to inactive
      $$('.tab', e.target.parentNode).forEach(function(el) {
        if (el.matches('.' + TAB_IS_ACTIVE)) return;
        el.classList.add(TAB_IS_INACTIVE);
      });
    }
  });

  function $(selector, ctx) {
    if (selector[0] === '#') return document.getElementById(selector.substr(1));
    return (ctx || document).querySelector(selector);
  }

  function $$(selector, ctx) {
    return toArray((ctx || document).querySelectorAll(selector));
  }

  function toArray(like) {
    return Array.prototype.slice.call(like, 0);
  }

  exports.$ = $;
  exports.$$ = $$;

})(window, document, window.FastClick);
