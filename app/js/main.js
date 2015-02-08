'use strict';

var Countdown = require('./countdown.js');

var countdown = new Countdown(
  document.getElementById('timer'),
  document.getElementById('sfx-end')
);

var form = document.querySelector('.config');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var minutes = evt.target.elements.time.value;

  countdown.start(minutes * 60 * 1000);
}, false);
