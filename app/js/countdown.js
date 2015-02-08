'use strict';

var Timer = require('./timer.js');

function Countdown(el) {
  this.el = el;
  this.timer = new Timer();

  this.timer.emitter.on('tick', this._refreshTime.bind(this));

  this.timer.emitter.on('start', function (data) {
    this._refreshTime({ remaining: data.amount });
  }.bind(this));

  this.timer.emitter.on('end', function () {
    this._refreshTime({ remaining: 0 });
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

Countdown.prototype._refreshTime = function (data) {
  var remaining = Math.round(data.remaining / 1000);
  var minutes = Math.floor(remaining / 60);
  var seconds = remaining % 60;

  this.el.innerHTML = pad(minutes) + ':' + pad(seconds);
};

module.exports = Countdown;
