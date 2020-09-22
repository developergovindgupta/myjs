"use strict";
(function () {
  document.ready = function (fn) {
    if (typeof fn === "function") {
      document.addEventListener("readystatechange", function () {
        if (document.readyState === "complete") {
          fn();
        }
      });
    }
  };
  if (typeof [].forEach != "function") {
    [].__proto__.forEach = function (fn) {
      for (let i = 0; i < this.length; i++) {
        fn(this[i], i);
      }
    };
  }
  document.__proto__.select = function (selector) {
    selector = selector || "*";
    if (typeof selector === "string") {
      return document.querySelectorAll(selector);
    } else if (selector.isNodeList) {
      return selector;
    } else if (selector.isDomElement) {
      let rID = parseInt(Math.random() * 1000000);
      selector.classList.add("selectnode" + rID);
      let selectList = document.querySelectorAll(".selectnode" + rID);
      selector.classList.remove("selectnode" + rID);
      return selectList;
    } else {
      return document.querySelectorAll("MyJS_Emply_Node_List");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                        //
  // getElementById, getElementByTagName, querySelector  Extension Methods                  //
  //                                                                                        //
  ////////////////////////////////////////////////////////////////////////////////////////////
  let node = document.createElement("input");
  node.__proto__.__proto__.isDomElement = true;
  node.__proto__.__proto__.select = document.select;
  /*
    ======================================================================================
    It load passed page url content in target DOM element asynchronously. 
    It follows Promise structure.
    ======================================================================================
    */
  node.__proto__.__proto__.load = function (url) {
    let container = this;
    let p = new Promise(function (resolve, reject) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
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
  node.__proto__.__proto__.val = function (value) {
    if (value || value === "") {
      this.value = value;
      return this;
    } else {
      return this.value ? this.value : "";
    }
  };
  node.__proto__.__proto__.html = function (html) {
    if (html || html === "") {
      this.innerHTML = html;
      return this;
    } else {
      return this.innerHTML ? this.innerHTML : "";
    }
  };
  node.__proto__.__proto__.text = function () {
    return this.innerText ? this.innerText.trim() : "";
  };
  node.__proto__.__proto__.hide = function () {
    if (this.style.display && this.style.display != "none") {
      this.oldDisplay = this.style.display;
    }
    this.style.display = "none";
    this.style.opacity = "";
    return this;
  };
  node.__proto__.__proto__.show = function () {
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
  node.__proto__.__proto__.toggle = function () {
    if (this.offsetHeight > 0) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  };
  node.__proto__.__proto__.addClass = function (className) {
    this.classList.add(className);
    return this;
  };
  node.__proto__.__proto__.removeClass = function (className) {
    this.classList.remove(className);
    return this;
  };
  node.__proto__.__proto__.toggleClass = function (className) {
    this.classList.toggle(className);
    return this;
  };
  node.__proto__.__proto__.hasClass = function (className) {
    return this.classList.contains(className);
  };
  node.__proto__.__proto__.fadeIn = function (duration, callBack) {
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
    let windowInterval = window.setInterval(function () {
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
  node.__proto__.__proto__.fadeOut = function (duration, callBack) {
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
    let windowInterval = window.setInterval(function () {
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
  node.__proto__.__proto__.each = function (fn) {
    if (typeof fn === "function") {
      this.eachFn = fn;
      this.eachFn();
      this.eachFn = null;
    }
    return this;
  };
  node.__proto__.__proto__.isVisible = function () {
    return this.offsetHeight > 0;
  };
  node.__proto__.__proto__.visible = function () {
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
  node.__proto__.__proto__.is = function (selector) {
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
  node.__proto__.__proto__.closest = function (selector) {
    if (!selector) {
      return this.parentNode;
    }
    let p = this;
    while (p) {
      if (p.is(selector)) {
        return p;
      }
      p = p.parentNode;
    }
    return document.querySelectorAll("xxxxxxxxxxx");
  };
  node.__proto__.__proto__.find = function (selector) {
    selector = selector || "*";
    return this.querySelectorAll(selector);
  };
  node.__proto__.__proto__.filter = function (selector) {
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
  node.__proto__.__proto__.filterNot = function (selector) {
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
  node.__proto__.__proto__.next = function () {
    return this.nextElementSibling || document.querySelectorAll("xxxxxxxxxxx");
  };
  node.__proto__.__proto__.prev = function () {
    return this.previousElementSibling || document.querySelectorAll("xxxxxxxxxxx");
  };
  node.__proto__.__proto__.nextAll = function () {
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
  node.__proto__.__proto__.prevAll = function () {
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
  node.__proto__.__proto__.on = function (eventName, fn) {
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
  node.__proto__.__proto__.off = function (eventName) {
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
  node.__proto__.__proto__.one = function (eventName, fn) {
    if (typeof this["_one" + eventName] === "function") {
      this.removeEventListener(eventName, this["_one" + eventName]);
    }
    if (typeof fn === "function") {
      this["_one" + eventName] = fn;
      this["_one_" + eventName] = function (e) {
        this["_one" + eventName](e);
        this.removeEventListener(eventName, this["_one_" + eventName]);
        delete this["_one" + eventName];
        delete this["_one_" + eventName];
      };

      this.addEventListener(eventName, this["_one_" + eventName]);
    }

    return this;
  };
  node.__proto__.__proto__.attr = function (attributeName, attributeValue) {
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
  node.__proto__.__proto__.append = function (domElement) {
    if (this.appendChild) {
      if (typeof domElement === "string") {
        let div = document.createElement("div");
        div.innerHTML = domElement;
        let children = div.childNodes;
        for (let i = 0; i < children.length; i++) {
          this.appendChild(children[i]);
        }
      } else if (domElement.outerHTML) {
        this.appendChild(domElement);
      } else if (domElement.length) {
        for (let i = 0; i < domElement.length; i++) {
          this.append(domElement[i]);
        }
      } else {
        this.append(domElement.toString());
      }
    }
    return this;
  };
  node.__proto__.__proto__.remove = function () {
    this.parentNode.removeChild(this);
  };
  node.__proto__.__proto__.getComputedStyle = function () {
    return window.getComputedStyle(this);
  };
  node.__proto__.__proto__.shadow = function () {
    let shadowList = [];
    function getShadowList() {
      let boxShadow = window.getComputedStyle(this).boxShadow;
      let _shadowAttr = boxShadow.match(/rgb(a){0,1}[(]([\d., ]+[)] )|[\d]+px|inset|#([\d\w])+|([\w])+|([,]) /gi);
      //window.getComputedStyle(x).boxShadow.match(/rgb(a){0,1}[(]([\d., ]+[)] )|[\d]+px|inset|#([\d\w])+|([\w])+|([,]) /ig)
      let s = {
        color: "#000000",
        hOffset: 10,
        vOffset: 10,
        blur: 0,
        spread: 0,
        inset: false,
      };
      let px = 0;
      _shadowAttr.forEach(function (x) {
        x = x.trim().toLowerCase();
        if (x.isNumber || x.indexOf("px") > 0) {
          if (px == 0) {
            s.hOffset = parseInt(x);
          } else if (px == 1) {
            s.vOffset = parseInt(x);
          } else if (px == 2) {
            s.blur = parseInt(x);
          } else if (px == 3) {
            s.spread = parseInt(x);
          }
          px++;
        } else if (x === "inset") {
        }
      });
    }
    getShadowList();
    return shadowList;
  };
  node.__proto__.__proto__.addShadow = function (left, top, color) {
    this.__shadow = this.__shadow || [];
    var domObj = this;
    let setShadow = function () {
      let shadowstr = "";
      domObj.__shadow.forEach(function (x) {
        shadowstr += "," + x.left + " " + x.top + " " + x.color;
      });
      if (shadowstr.length > 0) {
        shadowstr = shadowstr.substring(1);
      }
      domObj.style.boxShadow = shadowstr;
    };
    let Shadow = function () {
      let _top = top || "0px";
      let _left = left || "0px";
      let _color = color || "#000000";
      _top = parseInt(_top) + "px";
      _left = parseInt(_left) + "px";
      _color = _color.toString().toRGBA().value;

      return {
        get top() {
          return _top;
        },
        set top(value) {
          _top = parseInt(value) + "px";
          setShadow();
        },
        get left() {
          return _left;
        },
        set left(value) {
          _left = parseInt(value) + "px";
          setShadow();
        },
        get color() {
          return _color;
        },
        set color(value) {
          _color = value.toString().toRGBA().value;
          setShadow();
        },
      };
    };
    this.__shadow.push(new Shadow());
    setShadow();
    return this.__shadow;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // SELECT Element
  ////////////////////////////////////////////////////////////////////////////////////////////
  let select = document.createElement("select");
  select.__proto__.text = function () {
    if (this.selectedOptions.length > 0) {
      return this.selectedOptions[0].innerText;
    } else {
      return "";
    }
  };
  select.__proto__.html = function () {
    if (this.selectedOptions.length > 0) {
      return this.selectedOptions[0].innerHTML;
    } else {
      return "";
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  // querySelectorAll Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let nodeList = document.querySelectorAll("html");
  nodeList.__proto__.isNodeList = true;
  nodeList.__proto__.val = function (value) {
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
  nodeList.__proto__.html = function (html) {
    if (html || html === "") {
      if (this.length > 0) {
        this[0].html(html);
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].html();
      } else {
        return "";
      }
    }
  };
  nodeList.__proto__.text = function () {
    if (this.length > 0) {
      return this[0].text();
    } else {
      return "";
    }
  };
  nodeList.__proto__.hide = function () {
    if (this.length > 0) {
      this.forEach(function (x) {
        x.hide();
      });
    }

    return this;
  };
  nodeList.__proto__.show = function () {
    if (this.length > 0) {
      this.forEach(function (x) {
        x.show();
      });
    }
    return this;
  };
  nodeList.__proto__.toggle = function () {
    if (this.length > 0) {
      this.forEach(function (x) {
        x.toggle();
      });
    }
    return this;
  };
  nodeList.__proto__.addClass = function (className) {
    if (this.length > 0) {
      this.forEach(function (x) {
        x.classList.add(className);
      });
    }
    return this;
  };
  nodeList.__proto__.removeClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove(className);
    }
    return this;
  };
  nodeList.__proto__.toggleClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.toggle(className);
    }
    return this;
  };
  nodeList.__proto__.hasClass = function (className) {
    if (this.length > 0) {
      return this[0].classList.contains(className);
    }
    return false;
  };
  nodeList.__proto__.fadeIn = function (duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeIn(duration, callBack);
    }
    return this;
  };
  nodeList.__proto__.fadeOut = function (duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeOut(duration, callBack);
    }
    return this;
  };
  nodeList.__proto__.each = function (fn) {
    if (typeof fn === "function") {
      for (let i = 0; i < this.length; i++) {
        this[i].eachFn = fn;
        this[i].eachFn();
        this[i].eachFn = null;
      }
    }
    return this;
  };
  nodeList.__proto__.isVisible = function () {
    if (this.length > 0) {
      return this[0].isVisible();
    }
    return false;
  };
  nodeList.__proto__.visible = function () {
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
  nodeList.__proto__.is = function (selector) {
    if (this.length > 0) {
      return this[0].is(selector);
    } else {
      return false;
    }
  };
  nodeList.__proto__.closest = function (selector) {
    if (this.length > 0) {
      return this[0].closest(selector);
    } else {
      return this;
    }
  };
  nodeList.__proto__.find = function (selector) {
    selector = selector || "*";
    if (typeof selector === "string") {
      let rID = parseInt(Math.random() * 1000000);
      for (let i = 0; i < this.length; i++) {
        this[i].setAttribute("MYJS_Find_Control", rID);
      }
      let fNodesList = document.querySelectorAll('[MYJS_Find_Control= "' + rID + '"] ' + selector);
      for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute("MYJS_Find_Control");
      }
      return fNodesList;
    } else {
      return document.select(selector);
    }
  };
  nodeList.__proto__.select = nodeList.__proto__.find;
  nodeList.__proto__.filter = function (selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }
    let fList = document.select(selector);
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.add("FilterItem" + rID);
    }
    let resultList = document.querySelectorAll(".Filter" + rID + ".FilterItem" + rID);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.remove("FilterItem" + rID);
    }
    return resultList;
  };
  nodeList.__proto__.filterNot = function (selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }
    let fList = document.select(selector);
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.add("FilterItem" + rID);
    }
    let resultList = document.querySelectorAll(".Filter" + rID + ":not(.FilterItem" + rID + ")");
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.remove("FilterItem" + rID);
    }
    return resultList;
  };
  nodeList.__proto__.not = nodeList.__proto__.filterNot;
  nodeList.__proto__.next = function () {
    if (this.length > 0) {
      let n = this[0].nextElementSibling;
      if (n) {
        return document.select(n);
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return this;
  };
  nodeList.__proto__.prev = function () {
    if (this.length > 0) {
      let previousElement = this[0].previousElementSibling;
      if (previousElement) {
        return document.select(previousElement);
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return this;
  };
  nodeList.__proto__.nextAll = function () {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return this;
  };
  nodeList.__proto__.prevAll = function () {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return this;
  };
  nodeList.__proto__.on = function (eventName, fn) {
    for (let i = 0; i < this.length; i++) {
      this[i].on(eventName, fn);
    }
    return this;
  };
  nodeList.__proto__.off = function (eventName) {
    for (let i = 0; i < this.length; i++) {
      this[i].off(eventName);
    }
    return this;
  };
  nodeList.__proto__.attr = function (attributeName, attributeValue) {
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
  nodeList.__proto__.append = function (domElement) {
    if (this.length > 0) {
      this[0].append(domElement);
    }
    return this;
  };
  nodeList.__proto__.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      this[i].remove();
    }
  };
  nodeList.__proto__.getComputedStyle = function () {
    if (this.length > 0) {
      return window.getComputedStyle(this[0]);
    } else {
      return [];
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // getElementsByTagNames,getElementsByClassName Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let htmlCollection = document.getElementsByTagName("div");
  htmlCollection.__proto__.isNodeList = true;
  htmlCollection.__proto__.val = function (value) {
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
  htmlCollection.__proto__.html = function (html) {
    if (html || html === "") {
      if (this.length > 0) {
        this[0].html(html);
      }
      return this;
    } else {
      if (this.length > 0) {
        return this[0].html();
      } else {
        return "";
      }
    }
  };
  htmlCollection.__proto__.text = function () {
    if (this.length > 0) {
      return this[0].text();
    } else {
      return "";
    }
  };
  htmlCollection.__proto__.hide = function () {
    for (let i = 0; i < this.length; i++) {
      this[i].hide();
    }
    return this;
  };
  htmlCollection.__proto__.show = function () {
    for (let i = 0; i < this.length; i++) {
      this[i].show();
    }
    return this;
  };
  htmlCollection.__proto__.toggle = function () {
    for (let i = 0; i < this.length; i++) {
      this[i].toggle();
    }
    return this;
  };
  htmlCollection.__proto__.addClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add(className);
    }
    return this;
  };
  htmlCollection.__proto__.removeClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove(className);
    }
    return this;
  };
  htmlCollection.__proto__.toggleClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.toggle(className);
    }
    return this;
  };
  htmlCollection.__proto__.hasClass = function (className) {
    if (this.length > 0) {
      return this[0].classList.contains(className);
    }
    return false;
  };
  htmlCollection.__proto__.fadeIn = function (duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeIn(duration, callBack);
    }
    return this;
  };
  htmlCollection.__proto__.fadeOut = function (duration, callBack) {
    for (let i = 0; i < this.length; i++) {
      this[i].fadeOut(duration, callBack);
    }
    return this;
  };
  htmlCollection.__proto__.each = function (fn) {
    if (typeof fn === "function") {
      for (let i = 0; i < this.length; i++) {
        this[i].eachFn = fn;
        this[i].eachFn();
        this[i].eachFn = null;
      }
    }
    return this;
  };
  htmlCollection.__proto__.isVisible = function () {
    if (this.length > 0) {
      return this[0].isVisible();
    }
    return false;
  };
  htmlCollection.__proto__.visible = function () {
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
  htmlCollection.__proto__.is = function (selector) {
    if (this.length > 0) {
      return this[0].is(selector);
    } else {
      return false;
    }
  };
  htmlCollection.__proto__.closest = function (selector) {
    if (this.length > 0) {
      return this[0].closest(selector);
    } else {
      return this;
    }
  };
  htmlCollection.__proto__.find = function (selector) {
    selector = selector || "*";
    if (typeof selector === "string") {
      let rID = parseInt(Math.random() * 1000000);
      for (let i = 0; i < this.length; i++) {
        this[i].setAttribute("MYJS_Find_Control", rID);
      }
      let fNodesList = document.querySelectorAll('[MYJS_Find_Control= "' + rID + '"] ' + selector);
      for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute("MYJS_Find_Control");
      }
      return fNodesList;
    } else {
      return document.select(selector);
    }
  };
  htmlCollection.__proto__.select = htmlCollection.__proto__.find;
  htmlCollection.__proto__.filter = function (selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }
    let fList = document.select(selector);
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.add("FilterItem" + rID);
    }
    let resultList = document.querySelectorAll(".Filter" + rID + ".FilterItem" + rID);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.remove("FilterItem" + rID);
    }
    return resultList;
  };
  htmlCollection.__proto__.filterNot = function (selector) {
    let rID = parseInt(Math.random() * 1000000);
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add("Filter" + rID);
    }
    let fList = document.select(selector);
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.add("FilterItem" + rID);
    }
    let resultList = document.querySelectorAll(".Filter" + rID + ":not(.FilterItem" + rID + ")");
    for (let i = 0; i < this.length; i++) {
      this[i].classList.remove("Filter" + rID);
    }
    for (let i = 0; i < fList.length; i++) {
      fList[i].classList.remove("FilterItem" + rID);
    }
    return resultList;
  };
  htmlCollection.__proto__.not = htmlCollection.__proto__.filterNot;
  htmlCollection.__proto__.next = function () {
    if (this.length > 0) {
      let n = this[0].nextElementSibling;
      if (n) {
        return document.select(n);
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return document.querySelectorAll("xxxxxxxxxxx");
  };
  htmlCollection.__proto__.prev = function () {
    if (this.length > 0) {
      let previousElement = this[0].previousElementSibling;
      if (previousElement) {
        return document.select(previousElement);
      } else {
        return document.querySelectorAll("xxxxxxxxxxx");
      }
    }
    return this;
  };
  htmlCollection.__proto__.nextAll = function () {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return this;
  };
  htmlCollection.__proto__.prevAll = function () {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return this;
  };
  htmlCollection.__proto__.on = function (eventName, fn) {
    for (let i = 0; i < this.length; i++) {
      this[i].on(eventName, fn);
    }
    return this;
  };
  htmlCollection.__proto__.off = function (eventName) {
    for (let i = 0; i < this.length; i++) {
      this[i].off(eventName);
    }
    return this;
  };
  htmlCollection.__proto__.attr = function (attributeName, attributeValue) {
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
  htmlCollection.__proto__.append = function (domElement) {
    if (this.length > 0) {
      this[0].append(domElement);
    }
    return this;
  };
  htmlCollection.__proto__.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      this[i].remove();
    }
  };
  htmlCollection.__proto__.getComputedStyle = function () {
    if (this.length > 0) {
      return window.getComputedStyle(this[0]);
    } else {
      return [];
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // Data Type Extension Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  String.prototype.trimAll = function () {
    let str = this;
    str = str.trim().replace(/\t/g, " ").replace(/\r/g, " ").replace(/\n/g, " ");
    while (str.indexOf("  ") > 0) {
      str = str.replace(/  /g, " ");
    }
    return str;
  };
  String.prototype.toCamelCase = function () {
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
  String.prototype.toKebabCase = function () {
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
  String.prototype.toPascalCase = function () {
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
  String.prototype.toSnakeCase = function () {
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
  String.prototype.left = function (n) {
    return this.substr(0, n);
  };
  String.prototype.right = function (n) {
    return this.substring(this.length - n);
  };
  String.prototype.mid = function (n, m) {
    return this.substr(n, m);
  };
  String.prototype.reverse = function () {
    return this.split("").reverse().join("");
  };
  String.prototype.toNumber = function (nanValue) {
    let num = parseFloat(this.replace(/,/g, "").trimAll());
    if (isNaN(num)) {
      if (nanValue || nanValue == 0) {
        num = nanValue;
      } else {
        num = 0;
      }
    }
    return num;
  };
  String.prototype.parseInt = function (nanValue) {
    let n = parseInt(this);
    if ((nanValue || nanValue == 0) && isNaN(n)) {
      return nanValue;
    } else {
      return n;
    }
  };
  String.prototype.parseFloat = function (nanValue) {
    let n = parseFloat(this);
    if ((nanValue || nanValue == 0) && isNaN(n)) {
      return nanValue;
    } else {
      return n;
    }
  };
  String.prototype.isNaN = function (nanValue) {
    let n = parseFloat(this);
    return n.isNaN(nanValue);
  };
  Object.defineProperty(String.prototype, "isNumber", {
    get: function () {
      let regExp = /(^\d+[.]{0,1}\d*$|^.\d+$)/;
      return regExp.test(this);
    },
  });
  Object.defineProperty(Object.__proto__, "isNumber", {
    get: function () {
      let regExp = /(^\d+[.]{0,1}\d*$|^.\d+$)/;
      return regExp.test(this);
    },
  });

  String.prototype.toDate = function () {
    return this.toDateTime().format("dd/MMM/yyyy").toDateTime();
  };
  String.prototype.toDateTime = function () {
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
      } else {
        if (dt.h == 12) {
          dt.h = 0;
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
      } else {
        if (dt.h == 12) {
          dt.h = 0;
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
      } else {
        if (dt.h == 12) {
          dt.h = 0;
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
      } else {
        if (dt.h == 12) {
          dt.h = 0;
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
  String.prototype.toRGBA = function () {
    let x = document.createElement("div");
    document.body.appendChild(x);
    x.style.backgroundColor = this;
    let color = window.getComputedStyle(x).backgroundColor.toLowerCase();
    x.parentNode.removeChild(x);
    let rgba = { r: 0, g: 0, b: 0, a: 1, value: color };
    if (color.substring(0, 4) == "rgba") {
      let c = color.substring(5);
      c = c.substring(0, c.length - 1);

      let cc = c.split(",");
      rgba.r = parseInt(cc[0]);
      rgba.g = parseInt(cc[1]);
      rgba.b = parseInt(cc[2]);
      rgba.a = parseFloat(cc[3]);
    } else if (color.substring(0, 3) == "rgb") {
      let c = color.substring(4);
      c = c.substring(0, c.length - 1);
      let cc = c.split(",");
      rgba.r = parseInt(cc[0]);
      rgba.g = parseInt(cc[1]);
      rgba.b = parseInt(cc[2]);
      rgba.a = 1;
    }
    if (isNaN(rgba.r)) {
      rgba.r = 0;
    }
    if (isNaN(rgba.g)) {
      rgba.g = 0;
    }
    if (isNaN(rgba.b)) {
      rgba.b = 0;
    }
    if (isNaN(rgba.a)) {
      rgba.a = 1;
    }
    let R = rgba.r.toString(16);
    let G = rgba.g.toString(16);
    let B = rgba.b.toString(16);
    let A = rgba.a > 0.0 && rgba.a < 1.0 ? parseInt(rgba.a * 255).toString(16) : "";
    if (rgba.a == 0 && rgba.r == 0 && rgba.g == 0 && rgba.b == 0) {
      A = "00";
    }
    if (R.length == 1) {
      R = "0" + R;
    }
    if (G.length == 1) {
      G = "0" + G;
    }
    if (B.length == 1) {
      B = "0" + B;
    }
    if (A.length == 1) {
      A = "0" + A;
    }
    rgba.hex = "#" + R + G + B + A;

    return rgba;
  };
  String.prototype.innerHTML = function () {
    let div = document.createElement("div");
    div.innerHTML = this;
    return div.innerHTML;
  };
  String.prototype.innerText = function () {
    let div = document.createElement("div");
    div.innerHTML = this;
    return div.innerText;
  };
  String.prototype.toArray = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(this[i]);
    }
    return arr;
  };
  String.prototype.toCodeArray = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(this.charCodeAt(i));
    }
    return arr;
  };
  String.prototype.toCharCodeArray = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push({ char: this[i], code: this.charCodeAt(i) });
    }
    return arr;
  };
  Number.prototype.toChar = function () {
    return String.fromCharCode(this);
  };
  Number.prototype.format = function (strFormat) {
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
  Number.prototype.isNumber = true;
  NaN.__proto__.isNaN = function (nanValue) {
    if (isNaN(this) || this === Infinity) {
      if (nanValue || nanValue == 0) {
        return nanValue;
      } else {
        return true;
      }
    } else {
      if (nanValue || nanValue == 0) {
        return this;
      } else {
        return false;
      }
    }
  };
  Date.prototype.isDate = true;
  Date.prototype.format = function (strFormat) {
    if (strFormat) {
      let MMM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dddd = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let d = this.getDay();
      let dd = this.getDate();
      let MM = this.getMonth();
      let yyyy = this.getFullYear();
      let hh = this.getHours();
      let mm = this.getMinutes();
      let ss = this.getSeconds();
      let ff = this.getMilliseconds();
      let tt = hh >= 12 ? "PM" : "AM";
      let h = hh % 12;
      let yy = parseInt(yyyy.toString().right(2));
      if (hh == 12) {
        h = 12;
      }

      let _date = new Date("1Jan1900");
      if (_date.getMonth() != 0) {
        MM--;
      }
      if (_date.getDay() == 0) {
        if (d == 0) {
          d = 6;
        } else {
          d--;
        }
      }
      strFormat = strFormat.replace(/dddd/g, "DDDD");
      strFormat = strFormat.replace(/ddd/g, "DDD");
      strFormat = strFormat.replace(/dd/g, dd.format("00"));
      strFormat = strFormat.replace(/d/g, dd);
      strFormat = strFormat.replace(/MMMM/g, "XXXX");
      strFormat = strFormat.replace(/MMM/g, "XXX");
      strFormat = strFormat.replace(/MM/g, "XX");
      strFormat = strFormat.replace(/M/g, "X");
      strFormat = strFormat.replace(/yyyy/g, yyyy.format("0000"));
      strFormat = strFormat.replace(/yyy/g, yyyy.format("0000"));
      strFormat = strFormat.replace(/yy/g, yy.format("00"));
      strFormat = strFormat.replace(/y/g, yy);
      strFormat = strFormat.replace(/HH/g, hh.format("00"));
      strFormat = strFormat.replace(/H/g, hh);
      strFormat = strFormat.replace(/hh/g, h.format("00"));
      strFormat = strFormat.replace(/h/g, h);
      strFormat = strFormat.replace(/mm/g, mm.format("00"));
      strFormat = strFormat.replace(/m/g, mm);
      strFormat = strFormat.replace(/ss/g, ss.format("00"));
      strFormat = strFormat.replace(/s/g, ss);
      strFormat = strFormat.replace(/fff/g, ff.format("000"));
      strFormat = strFormat.replace(/ff/g, ff.format("000"));
      strFormat = strFormat.replace(/f/g, ff.format("000"));
      strFormat = strFormat.replace(/tt/g, tt);
      strFormat = strFormat.replace(/t/g, tt.toLowerCase());
      strFormat = strFormat.replace(/DDDD/g, dddd[d]);
      strFormat = strFormat.replace(/DDD/g, ddd[d]);
      strFormat = strFormat.replace(/XXXX/g, MMMM[MM]);
      strFormat = strFormat.replace(/XXX/g, MMM[MM]);
      strFormat = strFormat.replace(/XX/g, (MM + 1).format("00"));
      strFormat = strFormat.replace(/X/g, MM + 1);
      return strFormat;
    } else {
      return this.toString();
    }
  };
  Date.prototype.addDays = function (num) {
    let d = new Date(this);
    if (num) {
      d.setDate(this.getDate() + num);
    }
    return d;
  };
  Date.prototype.addMonths = function (num) {
    let d = new Date(this);
    if (num) {
      d.setMonth(this.getMonth() + num);
    }
    return d;
  };
  Date.prototype.addYears = function (num) {
    let d = new Date(this);
    if (num) {
      d.setFullYear(this.getFullYear() + num);
    }
    return d;
  };
  Date.prototype.addHours = function (num) {
    let d = new Date(this);
    if (num) {
      d.setHours(this.getHours() + num);
    }
    return d;
  };
  Date.prototype.addMinutes = function (num) {
    let d = new Date(this);
    if (num) {
      d.setMinutes(this.getMinutes() + num);
    }
    return d;
  };
  Date.prototype.addSeconds = function (num) {
    let d = new Date(this);
    if (num) {
      d.setSeconds(this.getSeconds() + num);
    }
    return d;
  };
  Object.prototype.equals = function (obj) {
    if (!obj) {
      return false;
    }
    let keys = Object.keys(this);
    let keys2 = Object.keys(obj);
    if (keys.length != keys2.length) {
      return false;
    }
    if (keys.length === 0) {
      if (this.isDomElement && obj.isDomElement) {
        if (this.outerHTML != obj.outerHTML) {
          return false;
        }
      } else {
        if (JSON.stringify(this) != JSON.stringify(obj)) {
          return false;
        }
      }
    } else {
      for (var i = 0; i < keys.length; i++) {
        if (this[keys[i]].isDomElement) {
          if (obj[keys[i]].isDomElement) {
            if (this[keys[i]] != obj[keys[i]]) {
              return false;
            }
          } else {
            return false;
          }
        } else if (typeof this[keys[i]] === "object") {
          if (typeof obj[keys[i]] === "object") {
            if (this[keys[i]].equals(obj[keys[i]]) === false) {
              return false;
            }
          } else {
            return false;
          }
        } else if (this[keys[i]] != obj[keys[i]]) {
          return false;
        }
      }
    }
    return true;
  };
  Object.prototype.isNaN = function (nanValue) {
    if (nanValue) {
      return nanValue;
    }
    return true;
  };
  Object.prototype.stringify = function () {
    return JSON.stringify(this);
  };
  Array.prototype.isArray = true;
  Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this));
  };
  Array.prototype.contains = function (val) {
    for (let i = 0; i < this.length; i++) {
      if (this[i].equals(val)) {
        return true;
      }
    }
    return false;
  };
  Array.prototype.distinct = function () {
    let arr = [];
    this.forEach(function (x) {
      if (!arr.contains(x)) {
        arr.push(x);
      }
    });
    return arr;
  };
})();
