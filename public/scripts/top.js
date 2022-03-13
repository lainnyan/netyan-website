const topTable = document.getElementById("top-table");

setInterval(
    (function updateTop() {
        fetch("/top")
            .then((response) => response.json())
            .then((result) => {
                result.sort(function (a, b) {
                    return parseInt(b.experience) - parseInt(a.experience);
                });
                while (topTable.hasChildNodes()) {
                    topTable.removeChild(topTable.firstChild);
                }
                for (let i = 0; i < 100; i++) {
                    const tr = topTable.insertRow();
                    const tdRank = tr.insertCell();
                    tdRank.classList.add("table-rank");
                    tdRank.appendChild(document.createTextNode("#" + (i + 1).toString()));
                    const tdNickname = tr.insertCell();
                    tdNickname.classList.add("table-nickname");
                    tdNickname.appendChild(document.createTextNode(result[i].nickname));
                    const tdExp = tr.insertCell();
                    tdExp.classList.add("table-exp");
                    tdExp.appendChild(document.createTextNode(result[i].experience));
                }
            });
        return updateTop;
    })(),
    60000
);
