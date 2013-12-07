(function() {
  'use strict';

  var TAB_IS_ACTIVE = 'tab--is-active';
  document.addEventListener('click', function(e) {
    if (e.target.matches('.tab-link')) {
      e.preventDefault();

      var target = e.target.href.split('#');
      if (target) target = document.getElementById(target[1]);
      if (target) {
        e.target.parentNode.querySelector('.' + TAB_IS_ACTIVE).classList.remove(TAB_IS_ACTIVE);
        target.classList.add(TAB_IS_ACTIVE);
      }
    }
  })

})();


