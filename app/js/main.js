'use strict';

var Countdown = require('./countdown.js');

var timerEl = document.getElementById('timer');
var form = document.querySelector('.config');

var countdown = new Countdown(timerEl);

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  countdown.start(4000);
}, false);
