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


})();