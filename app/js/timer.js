'use strict';

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

function Timer() {
  this._interval = null;
  this._timeout = null;

  this.emitter = new EventEmitter();

  this.startTime = null;
  this.amount = null;
}

Timer.prototype.start = function (amount) {
  this._clearTimeouts();

  this.startTime = new Date();
  this.amount = amount;

  this._interval = setInterval(this._tick.bind(this), 1000);
  this._timeout = setTimeout(this._timerDone.bind(this), amount);

  this.emitter.emit('start', {
    startTime: this.startTime,
    amount: amount
  });
};

Timer.prototype._clearTimeouts = function () {
  if (this._timeout) { clearTimeout(this._timeout); }
  if (this._interval) { clearInterval(this._interval); }

  this._timeout = this._interval = null;
};

Timer.prototype._tick = function () {
  var now = new Date();
  var diff =  now - this.startTime;

  this.emitter.emit('tick', {
    startTime: this.startTime,
    elapsed: diff,
    remaining: this.amount - diff,
    amount: this.amount
  });
};

Timer.prototype._timerDone = function () {
  this._clearTimeouts();
  this.emitter.emit('end', { amount: this.amount });
};

module.exports = Timer;
