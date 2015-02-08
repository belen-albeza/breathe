'use strict';

var Timer = require('./timer.js');

var timerEl = document.getElementById('timer');
var form = document.querySelector('.config');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var timer = new Timer(timerEl);
  timer.start(4000);
}, false);
