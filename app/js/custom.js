'use strict';

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

new SmoothScroll('.scrollto', { updateURL: false, offset: 110 });

var lightbox = document.getElementById('lightbox-container');

if (lightbox) {
  var openLighboxLinks = document.querySelectorAll('.open-lightbox');
  var closeLighboxLink = lightbox.querySelector('.close');
  var body = document.querySelector('body');

  openLighboxLinks.forEach(function (element) {
    element.onclick = function (e) {
      e.preventDefault();
      body.classList.add('lightbox-opened');
    };
  });
  closeLighboxLink.onclick = function () {
    body.classList.remove('lightbox-opened');
  };
}