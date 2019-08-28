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
  node.__proto__.__proto__.load = function (url) {
    let container = this;
    let p = new Promise(function (resolve, reject) {
      try {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText;
            resolve(container);
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
  node.__proto__.__proto__.find = function (selector) {
    selector = selector || '*';
    return this.querySelectorAll(selector);
  };
  node.__proto__.__proto__.next = function () {
    return this.nextElementSibling;
  };
  node.__proto__.__proto__.prev = function () {
    return this.previousElementSibling;
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
      nextAllElements[i].removeAttribute("MYJS_next_Element")
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
      prevAllElements[i].removeAttribute("MYJS_prev_Element")
    }
    return prevAllElements;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // querySelectorAll Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let nodeList = document.querySelectorAll("html");
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
  nodeList.__proto__.text = function () {
    if (this.length > 0) {
      return this[0].innerText ? this[0].innerText.trim() : "";
    } else {
      return "";
    }
  };
  nodeList.__proto__.hide = function () {
    for (let i = 0; i < this.length; i++) {
      this[i].hide();
    }
    return this;
  };
  nodeList.__proto__.show = function () {
    for (let i = 0; i < this.length; i++) {
      this[i].show();
    }
    return this;
  };
  nodeList.__proto__.addClass = function (className) {
    for (let i = 0; i < this.length; i++) {
      this[i].classList.add(className);
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
  nodeList.__proto__.find = function (selector) {
    selector = selector || '*';
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
  nodeList.__proto__.next = function () {
    if (this.length > 0) {
      return this[0].nextElementSibling;
    }
    return null;
  };
  nodeList.__proto__.prev = function () {
    if (this.length > 0) {
      return this[0].previousElementSibling;
    }
    return null;
  };
  nodeList.__proto__.nextAll = function () {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return null;
  };
  nodeList.__proto__.prevAll = function () {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return null;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  // getElementsByTagNames,getElementsByClassName Extenstion Methods
  ////////////////////////////////////////////////////////////////////////////////////////////
  let htmlCollection = document.getElementsByTagName("div");
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
  htmlCollection.__proto__.text = function () {
    if (this.length > 0) {
      return this[0].innerText ? this[0].innerText.trim() : "";
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
  htmlCollection.__proto__.find = function (selector) {
    selector = selector || '*';
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
  htmlCollection.__proto__.next = function () {
    if (this.length > 0) {
      return this[0].nextElementSibling;
    }
    return null;
  };
  htmlCollection.__proto__.prev = function () {
    if (this.length > 0) {
      return this[0].previousElementSibling;
    }
    return null;
  };
  htmlCollection.__proto__.nextAll = function () {
    if (this.length > 0) {
      return this[0].nextAll();
    }
    return null;
  };
  htmlCollection.__proto__.prevAll = function () {
    if (this.length > 0) {
      return this[0].prevAll();
    }
    return null;
  };
})();