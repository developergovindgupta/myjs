document.ready(function () {
    let Theme = parseInt(Math.random() * 7);
    document.body.className = "Theme-" + Theme;
    document.querySelectorAll("nav .nav_Menu li").forEach(x => {
        x.addEventListener("click", function (e) {

            document.querySelectorAll(".Selected").forEach(x => {
                x.classList.remove("Selected");
            });

            this.classList.add("Selected");
            history.pushState('', '', this.getAttribute("target"));
            window.document.title = "MYJS-Tutorial-" + this.getAttribute('pageTitle');
            document
                .querySelector("container")
                .load(this.getAttribute("target"))
                .then(function (obj) {

                })
                .catch(function (ex) {
                    console.log(ex);
                });
        });
    });

    let pageName = QSget('page');
    if (pageName) {
        let li = document.querySelector('nav li[target="' + pageName + '"]');

        li.click();
    } else {
        document.querySelector("container").load("pages/Home.html");
    }

});

function QSget(n) {
    var half = location.search.split('&' + n + '=')[1];
    if (!half) half = location.search.split('?' + n + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}


function changeThemeTo(obj) {
    document.body.className = obj.className;
}