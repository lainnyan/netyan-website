const urls = document.getElementsByClassName("url");
const pages = document.getElementsByClassName("page");
for (url of urls) {
    url.addEventListener("click", function func() {
        for (let i = 0; i < urls.length; i++) {
            if (urls[i].classList.contains("active")) {
                urls[i].classList.remove("active");
                pages[i].classList.remove("active");
                break;
            }
        }

        const index = [...this.parentElement.children].indexOf(this);
        setCookie("active_page_index", index, { "max-age": 7 * 24 * 60 * 60 });
        pages[index].classList.add("active");
        this.classList.add("active");
    });
    urls[1].removeEventListener("click", func);
}
if (getCookie("active_page_index")) {
    urls[getCookie("active_page_index")].classList.add("active");
    pages[getCookie("active_page_index")].classList.add("active");
} else {
    urls[0].classList.add("active");
    pages[0].classList.add("active");
}

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
