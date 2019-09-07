"use strict";
var myJS = {};
var $$ = myJS;

//////////////////////////////////////////////////////////////////////
//  Code to Dom Extension Methods                                   //
//////////////////////////////////////////////////////////////////////

(function() {
  let node = document.createElement("input");
  node.__proto__.__proto__.val = function(value) {
    if (value) {
      this.value = value;
      return this;
    } else {
      return this.value ? this.value : "";
    }
  };
  node.__proto__.__proto__.text = function() {
    return this.innerText ? this.innerText : this.value ? this.value : "";
  };
  node.__proto__.__proto__.html = function(html) {
    if (html) {
      this.innerHTML = html;
      return this;
    } else {
      return this.innerHTML ? this.innerHTML : "";
    }
  };

  node.__proto__.__proto__.fadeIn = function(duration, callBack) {
    let obj = this;
    let animationDuration = 300;
    let afterAnimationFunction;
    if (duration) {
      if (Number(duration)) {
        animationDuration = duration;
      } else if (typeof duration === "function") {
        afterAnimationFunction = duration;
      }
    }
    if (callBack) {
      if (Number(callBack)) {
        animationDuration = callBack;
      } else if (typeof callBack === "function") {
        afterAnimationFunction = callBack;
      }
    }
    let opacity = parseFloat(getComputedStyle(obj).opacity);
    let IncrementValue = 1.0 / (animationDuration / 50);
    let interval = animationDuration / (animationDuration / 50);
    let windowInterval = window.setInterval(function() {
      opacity -= IncrementValue;
      if (opacity <= 0) {
        obj.style.opacity = 0;
        if (afterAnimationFunction) {
          afterAnimationFunction();
        }
        window.clearInterval(windowInterval);
        return obj;
      }
      obj.style.opacity = opacity;
    }, interval);
  };
  node.__proto__.__proto__.fadeOut = function(duration, callBack) {
    let obj = this;
    let animationDuration = 300;
    let afterAnimationFunction;
    if (duration) {
      if (Number(duration)) {
        animationDuration = duration;
      } else if (typeof duration === "function") {
        afterAnimationFunction = duration;
      }
    }
    if (callBack) {
      if (Number(callBack)) {
        animationDuration = callBack;
      } else if (typeof callBack === "function") {
        afterAnimationFunction = callBack;
      }
    }
    let opacity = parseFloat(getComputedStyle(obj).opacity);
    let IncrementValue = 1.0 / (animationDuration / 50);
    let interval = animationDuration / (animationDuration / 50);
    let windowInterval = window.setInterval(function() {
      opacity += IncrementValue;
      if (opacity >= 1) {
        obj.style.opacity = "";
        if (getComputedStyle(obj).opacity != 1) {
          obj.style.opacity = 1;
        }

        if (afterAnimationFunction) {
          afterAnimationFunction();
        }
        window.clearInterval(windowInterval);
        return obj;
      }
      obj.style.opacity = opacity;
    }, interval);
  };
})();
$$.fadeIn = function(duration, callBack) {};
