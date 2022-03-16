const urls = document.getElementsByClassName("url");
const pages = document.getElementsByClassName("page");
for (url of urls) {
    url.addEventListener("click", function func() {
        for (let i = 0; i < urls.length; i++) {
            pages[i].classList.remove("active");
            urls[i].classList.remove("active");
        }

        const index = [...this.parentElement.children].indexOf(this);
        window.history.replaceState("", "", `/${pages[index].classList[0]}`);
        pages[index].classList.add("active");
        this.classList.add("active");
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var ID = getQueryVariable("id");
    if (ID) {
        document.getElementsByClassName(ID)[0].classList.add("active");
        window.history.replaceState("", "", `/${ID}`);

        for (let i = 0; i < urls.length; i++) {
            if (pages[i].classList.contains("active")) {
                urls[i].classList.add("active");
                continue;
            }
            pages[i].classList.remove("active");
            urls[i].classList.remove("active");
        }
    } else {
        for (let i = 0; i < urls.length; i++) {
            pages[i].classList.remove("active");
            urls[i].classList.remove("active");
        }
        window.history.replaceState("", "", "/home");
        pages[0].classList.add("active");
        urls[0].classList.add("active");
    }
});

const IMGavatar = document.getElementsByClassName("avatar")[0];
fetch("/avatar")
    .then((response) => response.text())
    .then((result) => {
        IMGavatar.setAttribute("src", result);
    });

const modals = document.getElementsByClassName("modal");
for (let i = 0; i < modals.length; i++) {
    const img = modals[i].previousElementSibling;
    img.addEventListener("click", function () {
        modals[i].style.display = "block";
    });

    const span = modals[i].children[0];
    span.addEventListener("click", function () {
        modals[i].style.display = "none";
    });
}

const btnNext = document.getElementById("img-next");
btnNext.addEventListener("click", function () {
    document.getElementsByClassName("gallery")[0].scrollLeft += 180;
});
const btnPrev = document.getElementById("img-prev");
btnPrev.addEventListener("click", function () {
    document.getElementsByClassName("gallery")[0].scrollLeft -= 180;
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) return pair[1];
    }
    return false;
}

function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
