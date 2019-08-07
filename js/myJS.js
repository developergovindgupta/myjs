(function () {
    document.ready = function (fn) {
        if (typeof fn === 'function') {
            document.addEventListener('readystatechange', function () {
                if (document.readyState === 'complete') {
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
        if (value || value === '') {
            this.value = value;
            return this;
        } else {
            return this.value ? this.value : "";
        }
    };
    node.__proto__.__proto__.html = function (html) {
        if (html || html === '') {
            this.innerHTML = html;
            return this;
        } else {
            return this.innerHTML ? this.innerHTML : "";
        }
    };
    node.__proto__.__proto__.text = function () {
        return this.innerText ? this.innerText.trim() : "";
    };
    ////////////////////////////////////////////////////////////////////////////////////////////
    // querySelectorAll Extenstion Methods
    ////////////////////////////////////////////////////////////////////////////////////////////
    let nodeList = document.querySelectorAll('html');
    nodeList.__proto__.val = function (value) {
        if (value || value === '') {
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
        if (html || html === '') {
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
    ////////////////////////////////////////////////////////////////////////////////////////////
    // getElementsByTagNames,getElementsByClassName Extenstion Methods
    ////////////////////////////////////////////////////////////////////////////////////////////
    let htmlCollection = document.getElementsByTagName('div');
    htmlCollection.__proto__.val = function (value) {
        if (value || value === '') {
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
        if (html || html === '') {
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
})();