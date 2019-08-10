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
})();
