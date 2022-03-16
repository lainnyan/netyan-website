const topTable = document.getElementById("top-table");

setInterval(
    (function updateTop() {
        fetch("/topBD")
            .then((response) => response.json())
            .then((result) => {
                result.sort(function (a, b) {
                    return parseInt(b.experience) - parseInt(a.experience);
                });
                while (topTable.hasChildNodes()) {
                    topTable.removeChild(topTable.firstChild);
                }

                const tr = topTable.insertRow();
                const tdRank = tr.insertCell();
                tdRank.classList.add("table-rank");
                tdRank.appendChild(document.createTextNode("Ранг"));

                const tdNickname = tr.insertCell();
                tdNickname.classList.add("table-nickname");
                tdNickname.appendChild(document.createTextNode("Никнейм"));

                const tdExp = tr.insertCell();
                tdExp.classList.add("table-exp");
                tdExp.appendChild(document.createTextNode("Опыт"));

                const tdLevel = tr.insertCell();
                tdLevel.classList.add("table-level");
                tdLevel.appendChild(document.createTextNode("Уровень"));

                const tdProgress = tr.insertCell();
                tdProgress.classList.add("table-progress");
                tdProgress.appendChild(document.createTextNode("Прогресс"));

                for (let i = 0; i < 100; i++) {
                    const tr = topTable.insertRow();

                    var level = getLevel(result[i].experience);

                    const tdRank = tr.insertCell();
                    tdRank.classList.add("table-rank");
                    tdRank.appendChild(document.createTextNode("#" + (i + 1).toString()));

                    const tdNickname = tr.insertCell();
                    tdNickname.classList.add("table-nickname");
                    tdNickname.appendChild(document.createTextNode(result[i].nickname));

                    const tdExp = tr.insertCell();
                    tdExp.classList.add("table-exp");
                    tdExp.appendChild(document.createTextNode(result[i].experience));

                    const tdLevel = tr.insertCell();
                    tdLevel.classList.add("table-level");
                    const spanLevel = document.createElement("span");
                    spanLevel.classList.add("table-span-level");
                    spanLevel.innerText = Math.floor(level);
                    tdLevel.appendChild(spanLevel);

                    const tdProgress = tr.insertCell();
                    tdProgress.classList.add("table-progress");
                    tdProgress.appendChild(document.createTextNode(getTwoDecimal(level) + "%"));
                }
            });
        return updateTop;
    })(),
    60000
);

function getLevel(exp) {
    return (-25 + Math.sqrt(689 + 4 * exp)) / 8;
}

function getTwoDecimal(num) {
    if (Number.isInteger(num)) return 0;

    const decimalStr = num.toString().split(".")[1];
    return Number(decimalStr.substring(0, 2));
}
