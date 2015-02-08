'use strict';

function Timer(el) {
  this._interval = null;
  this._timeout = null;
  this.element = el;

  this.startTime = null;
  this.amount = null;
}

Timer.prototype.start = function (amount) {
  this._timeout = setTimeout(this._timerDone.bind(this), amount);
  this._interval = setInterval(this._updateUI.bind(this), 1000);
  this.startTime = new Date();
  this.amount = amount;
  console.log('START');
};

Timer.prototype._updateUI = function () {
  var now = new Date();
  var diff =  now - this.startTime;
  console.log('DIFF', diff / 1000);
};

Timer.prototype._timerDone = function () {
  console.log('DONE');

  if (this._interval) { clearInterval(this._interval); }
  if (this._timeout) { clearInterval(this._timeout); }

  this._interval = this._timeout = null;
};

module.exports = Timer;
