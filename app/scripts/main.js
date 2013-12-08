(function(document, FastClick) {

  'use strict';

  FastClick.attach(document.body);


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

  // jQueryLite yo.

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

})(document, window.FastClick);
