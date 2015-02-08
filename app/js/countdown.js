'use strict';

var Timer = require('./timer.js');

function Countdown(el, audio) {
  this.el = el;
  this.audio = audio;
  this.timer = new Timer();

  this.timer.emitter.on('tick', function (data) {
    this.refreshTime(data.remaining);
  }.bind(this));

  this.timer.emitter.on('start', function (data) {
    this.refreshTime(data.amount);
  }.bind(this));

  this.timer.emitter.on('end', function () {
    this.refreshTime(0);
    // chrome hack - reload audio to be played more than one
    if (/Chrome/.test(navigator.userAgent)) {
      this.audio.load();
    }
    this.audio.play();
  }.bind(this));
}

function pad(x) {
  return x < 10
    ? '0' + x
    : x;
}

Countdown.prototype.start = function (amount) {
  this.timer.start(amount);
};

Countdown.prototype.refreshTime = function (remaining) {
  var remaining = Math.round(remaining / 1000);
  var minutes = Math.floor(remaining / 60);
  var seconds = remaining % 60;

  this.el.innerHTML = pad(minutes) + ':' + pad(seconds);
};

module.exports = Countdown;
