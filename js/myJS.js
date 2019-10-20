(function() {
  document.ready = function(fn) {
    if (typeof fn === "function") {
      document.addEventListener("readystatechange", function() {
        if (document.readyState === "complete") {
          fn();
        }
      });
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                        //
  // getElementById, getElementByTagName, querySelector  Extension Methods                  //
  //                                                                                        //
  ////////////////////////////////////////////////////////////////////////////////////////////
  let node = document.createElement("input");
  /*
    ======================================================================================
    It load passed page url content in target DOM element asynchronously. 
    It follows Promise structure.
    ======================================================================================
    */
  node.__proto__.__proto__.load = function(url) {
    let container = this;
    let p = new Promise(function(resolve, reject) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText;
            container.resolve = resolve;
            container.resolve(container);
          } else if (xhr.readyState === 4) {
            reject(xhr);
          }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.send();
      } catch (ex) {
        reject(ex);
      }
    });
    return p;
  };
  /*val get/set the value of input element selected and targeted*/
  node.__proto__.__proto__.val = function(value) {
    if (value || value === "") {
      this.value = value;
      return this;
    } else {
      return this.value ? this.value : "";
    }
  };
  node.__proto__.__proto__.html = function(html) {
    if (html || html === "") {
      this.innerHTML = html;
      return this;
    } else {
      return this.innerHTML ? this.innerHTML : "";
    }
  };
  node.__proto__.__proto__.text = function() {
    return this.innerText ? this.innerText.trim() : "";
  };
  node.__proto__.__proto__.hide = function() {
    if (this.style.display && this.style.display != "none") {
      this.oldDisplay = this.style.display;
    }
    this.style.display = "none";
    this.style.opacity = "";
    return this;
  };
  node.__proto__.__proto__.show = function() {
    if (this.style.display && this.style.display == "none") {
      this.style.display = this.oldDisplay || "";
      if (window.getComputedStyle(this).display === "none") {
        this.style.display = "block";
      }
    } else if (this.style.display) {
      if (window.getComputedStyle(this).display === "none") {
        this.style.display = this.style.display + "!important";
      }
    } else {
      this.style.display = this.oldDisplay || "";
      if (window.getComputedStyle(this).display === "none") {
        this.style.display = "block";
      }
    }
    return this;
  };
  node.__proto__.__proto__.toggle = function() {
    if (this.offsetHeight > 0) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  };
  node.__proto__.__proto__.addClass = function(className) {
    this.classList.add(className);
    return this;
  };
  node.__proto__.__proto__.removeClass = function(className) {
    this.classList.remove(className);
    return this;
  };
  node.__proto__.__proto__.toggleClass = function(className) {
    this.classList.toggle(className);
    return this;
  };
  node.__proto__.__proto__.hasClass = function(className) {
    return this.classList.contains(className);
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
    animationDuration = animationDuration || 50;
    let opacity = parseFloat(getComputedStyle(obj).opacity);
    let IncrementValue = 1.0 / (animationDuration / 50);
    let interval = animationDuration / (animationDuration / 50);
    let windowInterval = window.setInterval(function() {
      opacity -= IncrementValue;
      if (opacity <= 0) {
        obj.style.opacity = 0;
        obj.hide();
        if (afterAnimationFunction) {
          obj.fnFadeIn = afterAnimationFunction;
          obj.fnFadeIn();
        }
        window.clearInterval(windowInterval);
        return obj;
      }

      obj.style.opacity = opacity;
    }, interval);
    return obj;
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
    animationDuration = animationDuration || 50;
    let opacity = parseFloat(getComputedStyle(obj).opacity);
    if (opacity === 1) {
      if (this.offsetHeight === 0) {
        opacity = 0;
      }
    }
    let IncrementValue = 1.0 / (animationDuration / 50);
    let interval = animationDuration / (animationDuration / 50);
    obj.show();
    let windowInterval = window.setInterval(function() {
      opacity += IncrementValue;
      if (opacity >= 1) {
        obj.style.opacity = "";
        if (getComputedStyle(obj).opacity != 1) {
          obj.style.opacity = 1;
        }
        if (afterAnimationFunction) {
          obj.fnFadeOut = afterAnimationFunction;
          obj.fnFadeOut();
        }
        window.clearInterval(windowInterval);
        return obj;
      }
      obj.style.opacity = opacity;
    }, interval);
    return obj;
  };
  node.__proto__.__proto__.each = function(fn) {
    if (typeof fn === "function") {
      this.eachFn = fn;
      this.eachFn();
      this.eachFn = null;
    }
    return this;
  };
  node.__proto__.__proto__.isVisible = function() {
    return this.offsetHeight > 0;
  };
  node.__proto__.__proto__.visible = function() {
    let rID = parseInt(Math.random() * 1000000);
    if (this.offsetHeight > 0) {
      this.setAttribute("MYJS_Visible_Control", rID);
    }
    let vNodesList = document.querySelectorAll('[MYJS_Visible_Control= "' + rID + '"]');
    for (let i = 0; i < vNodesList.length; i++) {
      vNodesList[i].removeAttribute("MYJS_Visible_Control");
    }
    return vNodesList;
  };
  node.__proto__.__proto__.is = function(selector) {
    if (selector) {
      if (typeof selector === "string") {
        if (selector === ":visible") {
          return this.isVisible();
        } else {
          return this.matches(selector);
        }
      } else {
        return this === selector;
      }
    } else {
      return false;
    }
  };
  node.__proto__.__proto__.closest = function(selector) {
    let p = this;
    while (p) {
      if (p.is(selector)) {
        return p;
      }
      p = p.parentNode;
    }
    return document.querySelectorAll("xxxxxxxxxxx");
  };
  node.__proto__.__proto__.find = function(selector) {
    selector = selector || "*";
    return this.querySelectorAll(selector);
  };
  node.__proto__.__proto__.filter = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    this.classList.add("Filter" + rID);
    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let _selector = selector.split(",");
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      __selector += "," + _selector[i].trim() + ".Filter" + rID;
    }
    if (__selector) {
      __selector = __selector.substring(1);
    }
    let filterList = this.parentNode.querySelectorAll(__selector);
    this.classList.remove("Filter" + rID);
    return filterList;
  };
  node.__proto__.__proto__.filterNot = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    this.classList.add("Filter" + rID);
    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let _selector = selector.split(",");
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      if (_selector[i].trim()) {
        __selector += ":not(" + _selector[i].trim() + ")";
      }
    }

    __selector = ".Filter" + rID + __selector;
    let filterList = this.parentNode.querySelectorAll(__selector);
    this.classList.remove("Filter" + rID);
    return filterList;
  };
  node.__proto__.__proto__.not = node.__proto__.__proto__.filterNot;
  node.__proto__.__proto__.next = function() {
    return this.nextElementSibling;
  };
  node.__proto__.__proto__.prev = function() {
    return this.previousElementSibling;
  };
  node.__proto__.__proto__.nextAll = function() {
    let rID = parseInt(Math.random() * 1000000);
    let el = this.nextElementSibling;
    while (el) {
      el.setAttribute("MYJS_next_Element", rID);
      el = el.nextElementSibling;
    }
    let nextAllElements = this.parentNode.querySelectorAll("[MYJS_next_Element='" + rID + "']");
    for (let i = 0; i < nextAllElements.length; i++) {
      nextAllElements[i].removeAttribute("MYJS_next_Element");
    }
    return nextAllElements;
  };
  node.__proto__.__proto__.prevAll = function() {
    let rID = parseInt(Math.random() * 1000000);
    let el = this.previousElementSibling;
    while (el) {
      el.setAttribute("MYJS_prev_Element", rID);
      el = el.previousElementSibling;
    }
    let prevAllElements = this.parentNode.querySelectorAll("[MYJS_prev_Element='" + rID + "']");
    for (let i = 0; i < prevAllElements.length; i++) {
      prevAllElements[i].removeAttribute("MYJS_prev_Element");
    }
    return prevAllElements;
  };
  node.__proto__.__proto__.on = function(eventName, fn) {
    let eventClass = "";
    if (eventName.indexOf(".") > 0) {
      eventClass = eventName.split(".")[1];
      eventName = eventName.split(".")[0];
    }

    if (typeof this["_on" + eventName + eventClass] === "function") {
      this.removeEventListener(eventName, this["_on" + eventName + eventClass]);
    }
    if (typeof fn === "function") {
      this["_on" + eventName + eventClass] = fn;
      this.addEventListener(eventName, this["_on" + eventName + eventClass]);
    } else {
      delete this["_on" + eventName + eventClass];
    }

    return this;
  };
  node.__proto__.__proto__.off = function(eventName) {
    let eventClass = "";
    if (eventName.indexOf(".") > 0) {
      eventClass = eventName.split(".")[1];
      eventName = eventName.split(".")[0];
    }

    if (typeof this["_on" + eventName + eventClass] === "function") {
      this.removeEventListener(eventName, this["_on" + eventName + eventClass]);
      delete this["_on" + eventName + eventClass];
    }

    return this;
  };
  node.__proto__.__proto__.one = function(eventName, fn) {
    if (typeof this["_one" + eventName] === "function") {
      this.removeEventListener(eventName, this["_one" + eventName]);
    }
    if (typeof fn === "function") {
      this["_one" + eventName] = fn;
      this["_one_" + eventName] = function(e) {
        this["_one" + eventName](e);
        this.removeEventListener(eventName, this["_one_" + eventName]);
        delete this["_one" + eventName];
        delete this["_one_" + eventName];
      };

      this.addEventListener(eventName, this["_one_" + eventName]);
    }

    return this;
  };
  node.__proto__.__proto__.attr = function(attributeName, attributeValue) {
    if (attributeName) {
      if (attributeValue) {
        this.setAttribute(attributeName, attributeValue);
        return this;
      } else if (attributeValue === "") {
        this.removeAttribute(attributeName);
        return this;
      } else {
        return this.getAttribute(attributeName);
      }
    }
    return "";
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  // querySelectorAll Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let nodeList = document.querySelectorAll("html");
  nodeList.__proto__.val = function(value) {
    if (value || value === "") {
      if (this.length > 0) {
        this[0].value = value;
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].value ? this[0].value : "";
      } else {
        return "";
      }
    }
  };
  nodeList.__proto__.html = function(html) {
    if (html || html === "") {
      if (this.length > 0) {
        this[0].innerHTML = html;
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].innerHTML ? this[0].innerHTML : "";
      } else {
        return "";
      }
    }
  };
  nodeList.__proto__.text = function() {
    if (this.length > 0) {
      return this[0].innerText ? this[0].innerText.trim() : "";
    } else {
      return "";
    }
  };
  nodeList.__proto__.hide = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].hide();
    }
    return this;
  };
  nodeList.__proto__.show = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].show();
    }
    return this;
  };
  nodeList.__proto__.toggle = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].toggle();
    }
    return this;
  };
  nodeList.__proto__.addClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add(className);
    }
    return this;
  };
  nodeList.__proto__.removeClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove(className);
    }
    return this;
  };
  nodeList.__proto__.toggleClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.toggle(className);
    }
    return this;
  };
  nodeList.__proto__.hasClass = function(className) {
    if (this.length > 0) {
      return this[0].classList.contains(className);
    }
    return false;
  };
  nodeList.__proto__.fadeIn = function(duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeIn(duration, callBack);
    }
    return this;
  };
  nodeList.__proto__.fadeOut = function(duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeOut(duration, callBack);
    }
    return this;
  };
  nodeList.__proto__.each = function(fn) {
    if (typeof fn === "function") {
      for (let i = 0; i < this.length; i++) {
        this[i].eachFn = fn;
        this[i].eachFn();
        this[i].eachFn = null;
      }
    }
    return this;
  };
  nodeList.__proto__.isVisible = function() {
    if (this.length > 0) {
      return this[0].isVisible();
    }
    return false;
  };
  nodeList.__proto__.visible = function() {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      if (this[i].offsetHeight > 0) {
        this[i].setAttribute("MYJS_Visible_Control", rID);
      }
    }

    let vNodesList = document.querySelectorAll('[MYJS_Visible_Control= "' + rID + '"]');
    for (let i = 0; i < vNodesList.length; i++) {
      vNodesList[i].removeAttribute("MYJS_Visible_Control");
    }
    return vNodesList;
  };
  nodeList.__proto__.is = function(selector) {
    if (this.length > 0) {
      return this[0].is(selector);
    } else {
      return false;
    }
  };
  nodeList.__proto__.closest = function(selector) {
    if (this.length > 0) {
      return this[0].closest(selector);
    } else {
      return document.querySelectorAll("xxxxxxxxxxx");
    }
  };
  nodeList.__proto__.find = function(selector) {
    selector = selector || "*";
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].setAttribute("MYJS_Find_Control", rID);
    }
    let fNodesList = document.querySelectorAll('[MYJS_Find_Control= "' + rID + '"] ' + selector);
    for (let i = 0; i < this.length; i++) {
      this[i].removeAttribute("MYJS_Find_Control");
    }
    return fNodesList;
  };
  nodeList.__proto__.filter = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }

    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let _selector = selector.split(",");
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      __selector += "," + _selector[i].trim() + ".Filter" + rID;
    }
    if (__selector) {
      __selector = __selector.substring(1);
    }

    let filterList = document.querySelectorAll(__selector);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }

    return filterList;
  };
  nodeList.__proto__.filterNot = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }

    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let _selector = selector.split(",");
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      if (_selector[i].trim()) {
        __selector += ":not(" + _selector[i].trim() + ")";
      }
    }

    __selector = ".Filter" + rID + __selector;

    let filterList = document.querySelectorAll(__selector);

    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }

    return filterList;
  };
  nodeList.__proto__.not = nodeList.__proto__.filterNot;
  nodeList.__proto__.next = function() {
    if (this.length > 0) {
      let n = this[0].nextElementSibling;
      if (n) {
        return n;
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return document.querySelectorAll("xxxxxxxxxxx");
  };
  nodeList.__proto__.prev = function() {
    if (this.length > 0) {
      let previousElement = this[0].previousElementSibling;
      if (previousElement) {
        return previousElement;
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return document.querySelectorAll("xxxxxxxxxxx");
  };
  nodeList.__proto__.nextAll = function() {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return this;
  };
  nodeList.__proto__.prevAll = function() {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return this;
  };
  nodeList.__proto__.on = function(eventName, fn) {
    for (let i = 0; i < this.length; i++) {
      this[i].on(eventName, fn);
    }
    return this;
  };
  nodeList.__proto__.off = function(eventName) {
    for (let i = 0; i < this.length; i++) {
      this[i].off(eventName);
    }
    return this;
  };
  nodeList.__proto__.attr = function(attributeName, attributeValue) {
    if (attributeName) {
      if (attributeValue) {
        for (let i = 0; i < this.length; i++) {
          this[i].setAttribute(attributeName, attributeValue);
        }
        return this;
      } else if (attributeValue === "") {
        for (let i = 0; i < this.length; i++) {
          this[i].removeAttribute(attributeName);
        }
        return this;
      } else {
        if (this.length > 0) {
          return this[0].getAttribute(attributeName);
        } else {
          return "";
        }
      }
    }
    return this;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // getElementsByTagNames,getElementsByClassName Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let htmlCollection = document.getElementsByTagName("div");
  htmlCollection.__proto__.val = function(value) {
    if (value || value === "") {
      if (this.length > 0) {
        this[0].value = value;
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].value ? this[0].value : "";
      } else {
        return "";
      }
    }
  };
  htmlCollection.__proto__.html = function(html) {
    if (html || html === "") {
      if (this.length > 0) {
        this[0].innerHTML = html;
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].innerHTML ? this[0].innerHTML : "";
      } else {
        return "";
      }
    }
  };
  htmlCollection.__proto__.text = function() {
    if (this.length > 0) {
      return this[0].innerText ? this[0].innerText.trim() : "";
    } else {
      return "";
    }
  };
  htmlCollection.__proto__.hide = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].hide();
    }
    return this;
  };
  htmlCollection.__proto__.show = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].show();
    }
    return this;
  };
  htmlCollection.__proto__.toggle = function() {
    for (let i = 0; i < this.length; i++) {
      this[i].toggle();
    }
    return this;
  };
  htmlCollection.__proto__.addClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add(className);
    }
    return this;
  };
  htmlCollection.__proto__.removeClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove(className);
    }
    return this;
  };
  htmlCollection.__proto__.toggleClass = function(className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.toggle(className);
    }
    return this;
  };
  htmlCollection.__proto__.hasClass = function(className) {
    if (this.length > 0) {
      return this[0].classList.contains(className);
    }
    return false;
  };
  htmlCollection.__proto__.fadeIn = function(duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeIn(duration, callBack);
    }
    return this;
  };
  htmlCollection.__proto__.fadeOut = function(duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeOut(duration, callBack);
    }
    return this;
  };
  htmlCollection.__proto__.each = function(fn) {
    if (typeof fn === "function") {
      for (let i = 0; i < this.length; i++) {
        this[i].eachFn = fn;
        this[i].eachFn();
        this[i].eachFn = null;
      }
    }
    return this;
  };
  htmlCollection.__proto__.isVisible = function() {
    if (this.length > 0) {
      return this[0].isVisible();
    }
    return false;
  };
  htmlCollection.__proto__.visible = function() {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      if (this[i].offsetHeight > 0) {
        this[i].setAttribute("MYJS_Visible_Control", rID);
      }
    }

    let vNodesList = document.querySelectorAll('[MYJS_Visible_Control= "' + rID + '"]');
    for (let i = 0; i < vNodesList.length; i++) {
      vNodesList[i].removeAttribute("MYJS_Visible_Control");
    }
    return vNodesList;
  };
  htmlCollection.__proto__.is = function(selector) {
    if (this.length > 0) {
      return this[0].is(selector);
    } else {
      return false;
    }
  };
  htmlCollection.__proto__.closest = function(selector) {
    if (this.length > 0) {
      return this[0].closest(selector);
    } else {
      return document.querySelectorAll("xxxxxxxxxxx");
    }
  };
  htmlCollection.__proto__.find = function(selector) {
    selector = selector || "*";
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].setAttribute("MYJS_Find_Control", rID);
    }
    let fNodesList = document.querySelectorAll('[MYJS_Find_Control= "' + rID + '"] ' + selector);
    for (let i = 0; i < this.length; i++) {
      this[i].removeAttribute("MYJS_Find_Control");
    }
    return fNodesList;
  };
  htmlCollection.__proto__.filter = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }

    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      __selector += "," + _selector[i].trim() + ".Filter" + rID;
    }
    if (__selector) {
      __selector = __selector.substring(1);
    }

    let filterList = document.querySelectorAll(__selector);

    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }

    return filterList;
  };
  htmlCollection.__proto__.filterNot = function(selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }

    selector = selector || "";
    if (typeof selector !== "string") {
      selector = "";
    }
    let _selector = selector.split(",");
    let __selector = "";
    for (let i = 0; i < _selector.length; i++) {
      if (_selector[i].trim()) {
        __selector += ":not(" + _selector[i].trim() + ")";
      }
    }

    __selector = ".Filter" + rID + __selector;

    let filterList = document.querySelectorAll(__selector);

    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }

    return filterList;
  };
  htmlCollection.__proto__.not = htmlCollection.__proto__.filterNot;
  htmlCollection.__proto__.next = function() {
    if (this.length > 0) {
      return this[0].nextElementSibling;
    }
    return this;
  };
  htmlCollection.__proto__.prev = function() {
    if (this.length > 0) {
      return this[0].previousElementSibling;
    }
    return this;
  };
  htmlCollection.__proto__.nextAll = function() {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return this;
  };
  htmlCollection.__proto__.prevAll = function() {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return this;
  };
  htmlCollection.__proto__.on = function(eventName, fn) {
    for (let i = 0; i < this.length; i++) {
      this[i].on(eventName, fn);
    }
    return this;
  };
  htmlCollection.__proto__.off = function(eventName) {
    for (let i = 0; i < this.length; i++) {
      this[i].off(eventName);
    }
    return this;
  };
  htmlCollection.__proto__.attr = function(attributeName, attributeValue) {
    if (attributeName) {
      if (attributeValue) {
        for (let i = 0; i < this.length; i++) {
          this[i].setAttribute(attributeName, attributeValue);
        }
        return this;
      } else if (attributeValue === "") {
        for (let i = 0; i < this.length; i++) {
          this[i].removeAttribute(attributeName);
        }
        return this;
      } else {
        if (this.length > 0) {
          return this[0].getAttribute(attributeName);
        } else {
          return "";
        }
      }
    }
    return this;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // Data Type Extension Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  String.prototype.trimAll = function() {
    let str = this;
    str = str
      .trim()
      .replace(/\t/g, " ")
      .replace(/\r/g, " ")
      .replace(/\n/g, " ");
    while (str.indexOf("  ") > 0) {
      str = str.replace(/  /g, " ");
    }
    return str;
  };
  String.prototype.toCamelCase = function() {
    let str = this.trimAll();
    let str2 = "";
    let isSpace = false;
    if (str.indexOf(" ") > 0 || str.indexOf("-") > 0 || str.indexOf("_") > 0) {
      str = str.toLowerCase();
      for (let i = 0; i < str.length; i++) {
        if (str[i] === " " || str[i] === "-" || str[i] === "_") {
          isSpace = true;
        } else if (isSpace) {
          str2 += str[i].toUpperCase();
          isSpace = false;
        } else {
          str2 += str[i];
        }
      }
    } else {
      str2 = str[0].toLowerCase() + str.substring(1);
    }
    return str2;
  };
  String.prototype.toKebabCase = function() {
    let str = this.trimAll();
    let str2 = "";
    let isSpace = false;
    if (str.indexOf(" ") > 0 || str.indexOf("-") > 0 || str.indexOf("_") > 0) {
      str = str.toLowerCase();
      for (let i = 0; i < str.length; i++) {
        if (str[i] === " " || str[i] === "-" || str[i] === "_") {
          isSpace = true;
        } else if (isSpace) {
          str2 += "-" + str[i];
          isSpace = false;
        } else {
          str2 += str[i];
        }
      }
    } else {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && i > 0) {
          str2 += "-" + str[i].toLowerCase();
        } else {
          str2 += str[i].toLowerCase();
        }
      }
    }
    return str2;
  };
  String.prototype.toPascalCase = function() {
    let str = this.trimAll();
    let str2 = "";
    let isSpace = false;
    if (str.indexOf(" ") > 0 || str.indexOf("-") > 0 || str.indexOf("_") > 0) {
      str = str.toLowerCase();
      for (let i = 0; i < str.length; i++) {
        if (str[i] === " " || str[i] === "-" || str[i] === "_") {
          isSpace = true;
        } else if (isSpace || i === 0) {
          str2 += str[i].toUpperCase();
          isSpace = false;
        } else {
          str2 += str[i];
        }
      }
    } else {
      str2 = str[0].toUpperCase() + str.substring(1);
    }
    return str2;
  };
  String.prototype.toSnakeCase = function() {
    let str = this.trimAll();
    let str2 = "";
    let isSpace = false;
    if (str.indexOf(" ") > 0 || str.indexOf("-") > 0 || str.indexOf("_") > 0) {
      str = str.toLowerCase();
      for (let i = 0; i < str.length; i++) {
        if (str[i] === " " || str[i] === "-" || str[i] === "_") {
          isSpace = true;
        } else if (isSpace) {
          str2 += "_" + str[i];
          isSpace = false;
        } else {
          str2 += str[i];
        }
      }
    } else {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && i > 0) {
          str2 += "_" + str[i].toLowerCase();
        } else {
          str2 += str[i].toLowerCase();
        }
      }
    }
    return str2;
  };
  String.prototype.left = function(n) {
    return this.substr(0, n);
  };
  String.prototype.right = function(n) {
    return this.substring(this.length - n);
  };
  String.prototype.mid = function(n, m) {
    return this.substr(n, m);
  };
  String.prototype.toNumber = function() {
    let num = parseFloat(this.replace(/,/g, "").trimAll());
    if (isNaN(num)) {
      num = 0;
    }
    return num;
  };
  String.prototype.toDate = function() {
    let d = new Date();
    let _date = "";
    if (this.indexOf(":") > 0) {
      if (this.indexOf(":") > 3) {
        _date = this.substring(0, this.indexOf(":") - 2).trimAll();
      } else {
        if (new Date(1900, 1, 1).getDay() != 0) {
          _date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        } else {
          _date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
        }
      }
    } else {
      _date = this.trimAll();
    }

    return _date.toDateTime();
  };
  String.prototype.toDateTime = function() {
    let mmm = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
    let d = new Date();
    let dt = { dd: 1, mm: 1, yy: 1900, h: 0, m: 0, s: 0 };
    let strDate = this.replace(/[,-./ ]/g, " ").trimAll();
    let _date = "";
    let _time = "";
    if (strDate.indexOf(":") > 0) {
      if (strDate.indexOf(":") > 3) {
        _date = strDate.substring(0, strDate.indexOf(":") - 2).trimAll();
        _time = strDate.substring(strDate.indexOf(":") - 2).trimAll();
      } else {
        dt.dd = d.getDate();
        dt.mm = d.getMonth();
        dt.yy = d.getFullYear();
        if (new Date(1900, 1, 1).getDay() != 0) {
          dt.mm++;
        }
        _time = strDate.trimAll();
      }
    } else {
      _date = strDate.trimAll();
    }

    if (/^[0-3][0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"01-Jan-2019"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(3, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"1-Jan-2019"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-3][0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"01Jan2019"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"1Jan2019"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(1, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"Jan-2019"
      dt.dd = 1;
      dt.mm = mmm[_date.substr(0, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"Jan2019"
      dt.dd = 1;
      dt.mm = mmm[_date.substr(0, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-3][0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][0-9][0-9]$/i.test(_date)) {
      //"01-Jan-19"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(3, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][0-9][0-9]$/i.test(_date)) {
      //"1-Jan-19"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-3][0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[0-9][0-9]$/i.test(_date)) {
      //"01Jan19"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[0-9][0-9]$/i.test(_date)) {
      //"1Jan19"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(1, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[ ][0-9][0-9]$/i.test(_date)) {
      //"Jan-19"
      dt.dd = 1;
      dt.mm = mmm[_date.substr(0, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[0-9][0-9]$/i.test(_date)) {
      //"Jan19"
      dt.dd = 1;
      dt.mm = mmm[_date.substr(0, 3).toLowerCase()];
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-3][0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)$/i.test(_date)) {
      //"05,jan"

      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(3, 3).toLowerCase()];
      dt.yy = d.getFullYear();
    } else if (/^[0-9][ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)$/i.test(_date)) {
      //"5,jan"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = d.getFullYear();
    } else if (/^[0-3][0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)$/i.test(_date)) {
      //"05jan"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = mmm[_date.substr(2, 3).toLowerCase()];
      dt.yy = d.getFullYear();
    } else if (/^[0-9](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)$/i.test(_date)) {
      //"5jan"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = mmm[_date.substr(1, 3).toLowerCase()];
      dt.yy = d.getFullYear();
    } else if (/^[0-3][0-9][ ][0-1][0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"05-08-2019"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = parseInt(_date.substr(3, 2));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-9][ ][0-1][0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"5-08-2019"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = parseInt(_date.substr(2, 2));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-9][ ][0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"5-8-2019"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = parseInt(_date.substr(2, 1));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-3][0-9][ ][0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"15-8-2019"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = parseInt(_date.substr(3, 1));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-1][0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"11-2019"
      dt.dd = 1;
      dt.mm = parseInt(_date.substr(0, 2));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-9][ ][1-2][0-9][0-9][0-9]$/i.test(_date)) {
      //"8-2019"
      dt.dd = 1;
      dt.mm = parseInt(_date.substr(0, 1));
      dt.yy = parseInt(_date.right(4));
    } else if (/^[0-3][0-9][ ][0-1][0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"05-08-19"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = parseInt(_date.substr(3, 2));
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-9][ ][0-1][0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"5-08-19"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = parseInt(_date.substr(2, 2));
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-9][ ][0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"5-8-19"
      dt.dd = parseInt(_date.substr(0, 1));
      dt.mm = parseInt(_date.substr(2, 1));
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-3][0-9][ ][0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"15-8-19"
      dt.dd = parseInt(_date.substr(0, 2));
      dt.mm = parseInt(_date.substr(3, 1));
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-1][0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"08-19"
      dt.dd = 1;
      dt.mm = parseInt(_date.substr(0, 2));
      dt.yy = parseInt(_date.right(2));
    } else if (/^[0-9][ ][0-9][0-9]$/i.test(_date)) {
      //"8-19"
      dt.dd = 1;
      dt.mm = parseInt(_date.substr(0, 1));
      dt.yy = parseInt(_date.right(2));
    } else {
      d = new Date(this);
      if (!isNaN(d)) {
        dt.dd = d.getDate();
        dt.mm = d.getMonth();
        dt.yy = d.getFullYear();
        if (new Date(1900, 1, 1).getDay() != 0) {
          dt.mm++;
        }
        dt.h = d.getHours();
        dt.m = d.getMinutes();
        dt.s = d.getSeconds();
      }
    }

    if (/^[0-1][0-9]:[0-5][0-9]:[0-5][0-9][ ]{0,1}(am|pm)$/i.test(_time)) {
      //"08:30:24 PM"
      dt.h = parseInt(_time.substr(0, 2));
      dt.m = parseInt(_time.substr(3, 2));
      dt.s = parseInt(_time.substr(6, 2));
      if (_time.right(2).toLowerCase() === "pm") {
        if (dt.h < 12) {
          dt.h += 12;
        }
      }
    } else if (/^[0-9]:[0-5][0-9]:[0-5][0-9][ ]{0,1}(am|pm)$/i.test(_time)) {
      //"8:30:24 PM"
      dt.h = parseInt(_time.substr(0, 1));
      dt.m = parseInt(_time.substr(2, 2));
      dt.s = parseInt(_time.substr(5, 2));
      if (_time.right(2).toLowerCase() === "pm") {
        if (dt.h < 12) {
          dt.h += 12;
        }
      }
    } else if (/^[0-1][0-9]:[0-5][0-9][ ]{0,1}(am|pm)$/i.test(_time)) {
      //"08:30 PM"
      dt.h = parseInt(_time.substr(0, 2));
      dt.m = parseInt(_time.substr(3, 2));

      if (_time.right(2).toLowerCase() === "pm") {
        if (dt.h < 12) {
          dt.h += 12;
        }
      }
    } else if (/^[0-9]:[0-5][0-9][ ]{0,1}(am|pm)$/i.test(_time)) {
      //"8:30 PM"
      dt.h = parseInt(_time.substr(0, 1));
      dt.m = parseInt(_time.substr(2, 2));

      if (_time.right(2).toLowerCase() === "pm") {
        if (dt.h < 12) {
          dt.h += 12;
        }
      }
    } else if (/^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/i.test(_time)) {
      //"08:30:25"
      dt.h = parseInt(_time.substr(0, 2));
      dt.m = parseInt(_time.substr(3, 2));
      dt.s = parseInt(_time.substr(6, 2));
    } else if (/^[0-9]:[0-5][0-9]:[0-5][0-9]$/i.test(_time)) {
      //"8:30:25"
      dt.h = parseInt(_time.substr(0, 1));
      dt.m = parseInt(_time.substr(2, 2));
      dt.s = parseInt(_time.substr(5, 2));
    } else if (/^[0-2][0-9]:[0-5][0-9]$/i.test(_time)) {
      //"08:30"
      dt.h = parseInt(_time.substr(0, 2));
      dt.m = parseInt(_time.substr(3, 2));
    } else if (/^[0-9]:[0-5][0-9]$/i.test(_time)) {
      //"8:30"
      dt.h = parseInt(_time.substr(0, 1));
      dt.m = parseInt(_time.substr(2, 2));
    }

    if (new Date(1900, 1, 1).getDay() != 0) {
      dt.mm--;
    }
    if (dt.yy < 50) {
      dt.yy += 2000;
    } else if (dt.yy < 100) {
      dt.yy += 1900;
    }
    d = new Date(dt.yy, dt.mm, dt.dd, dt.h, dt.m, dt.s);

    if (isNaN(d)) {
      d = new Date("1jan1900");
    }

    return d;
  };
  Number.prototype.format = function(strFormat) {
    if (strFormat && typeof strFormat === "string" && /^([0#,])+([.]){0,1}([0])*$/.test(strFormat)) {
      let str = this.toString();
      let m = "";
      let n = "";
      if (str.indexOf(".") > 0) {
        m = str.substring(0, str.indexOf("."));
        n = str.substring(str.indexOf(".") + 1);
      } else {
        m = str;
      }

      let mm = "";
      let nn = "";
      if (strFormat.indexOf(".") > 0) {
        mm = strFormat.substring(0, strFormat.indexOf("."));
        nn = strFormat.substring(strFormat.indexOf(".") + 1);
      } else {
        mm = strFormat;
      }
      if (nn.indexOf(".") > 0) {
        nn = nn.substring(0, nn.indexOf("."));
      }
      let mmm = "";
      let nnn = "";
      let x = m.length - 1;
      for (let i = mm.length - 1; i >= 0; i--) {
        if (m[x]) {
          if (mm[i] === ",") {
            mmm = mm[i] + mmm;
          } else {
            mmm = m[x] + mmm;
            x--;
          }
        } else if ((mm[i] === "0" && mm.substring(i).indexOf("#") < 0) || (mm[i] === "," && mm.substring(i).indexOf("#") < 0)) {
          mmm = mm[i] + mmm;
        }
      }
      mmm = m.substring(0, x + 1) + mmm;

      for (let i = 0; i < nn.length; i++) {
        if (i < n.length) {
          nnn += n[i];
        } else {
          nnn += nn[i];
        }
      }
      if (n.length > nnn.length && parseInt(n[nn.length]) >= 5) {
        nnn = (parseInt(nnn) + 1).toString();
      }

      return mmm + (nnn ? "." : "") + nnn;
    } else {
      return this.toLocaleString();
    }
  };
})();
