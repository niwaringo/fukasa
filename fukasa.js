(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fukasa = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var throttle = require("./throttle");
var ukakko = require("ukakko");

var Fukasa = function () {
    function Fukasa() {
        _classCallCheck(this, Fukasa);

        this._allEvents = [];
        this._scrollFunc = this._createScrollFunc();
    }

    _createClass(Fukasa, [{
        key: "on",
        value: function on(target, callback) {
            var _this = this;

            ukakko(function () {
                var event = {};
                event.target = target;
                event.targetY = _this._getTargetHeight(target);
                event.callback = callback;
                _this._allEvents.push(event);
                if (_this._allEvents.length === 1) _this._bindScroll();
            });
        }
    }, {
        key: "_getTargetHeight",
        value: function _getTargetHeight(target) {
            if (Object.prototype.toString.call(target) === "[object Number]") {
                var pageHeight = document.body.scrollHeight;
                var targetHeight = pageHeight * target;
                return target !== 1 ? targetHeight : targetHeight - 5;
            }

            if (target instanceof HTMLElement) {
                return target.offsetTop;
            }

            return 0;
        }
    }, {
        key: "_bindScroll",
        value: function _bindScroll() {
            window.addEventListener("scroll", this._scrollFunc);
        }
    }, {
        key: "_createScrollFunc",
        value: function _createScrollFunc() {
            var _this2 = this;

            return throttle(function () {
                _this2._allEvents = _this2._allEvents.filter(function (event) {
                    var distance = window.pageYOffset + window.innerHeight;
                    if (distance >= event.targetY) {
                        event.callback();
                        return false;
                    }
                    return true;
                });

                if (_this2._allEvents.length === 0) {
                    window.removeEventListener("scroll", _this2._scrollFunc);
                }
            }, 500);
        }
    }]);

    return Fukasa;
}();

var fukasa = new Fukasa();
module.exports = fukasa;
},{"./throttle":2,"ukakko":3}],2:[function(require,module,exports){
"use strict";

// via underscore.js(http://underscorejs.org/);
function throttle(callback, wait) {
    var _this = this;

    var result = void 0;
    var timeout = null;
    var previous = 0;

    var later = function later() {
        previous = new Date();
        timeout = null;
        result = callback.apply(_this);
    };

    return function () {
        var now = new Date();
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = callback.apply(_this);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

module.exports = throttle;
},{}],3:[function(require,module,exports){
var callbacks = [];

function readyFunc() {
    document.removeEventListener("DOMContentLoaded", readyFunc);
    window.removeEventListener("load", readyFunc);
    callbacks = callbacks.filter(function(callback) {
        callback();
        return false;
    });
}

function ukakko(callback) {
    if (document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll )) {
        callback();
    } else {
        callbacks.push(callback);
        document.addEventListener("DOMContentLoaded", readyFunc);
        window.addEventListener( "load", readyFunc);
    }
}

module.exports = ukakko;
},{}]},{},[1])(1)
});