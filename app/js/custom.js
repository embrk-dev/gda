'use strict';

document.addEventListener("DOMContentLoaded", function () {
  new SmoothScroll('.scrollto', { updateURL: false, offset: 110 });
});

var nav = document.querySelector('.nav');
if (nav) {
  nav.querySelector('.opener').onclick = function () {
    nav.classList.add('js-opened');
  };
  nav.querySelector('.close').onclick = function () {
    nav.classList.remove('js-opened');
  };
}

document.addEventListener('scrollStop', function () {
  if (nav) {
    if (nav.classList.contains('js-opened')) {
      nav.classList.remove('js-opened');
    }
  }
}, false);