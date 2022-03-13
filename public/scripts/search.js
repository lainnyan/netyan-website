const searchbar = document.getElementById("build-search");
const buildContainers = document.getElementsByClassName("img-container");

searchbar.addEventListener("input", function () {
    for (let i = 0; i < buildContainers.length; i++) {
        const buildContainer = buildContainers[i];
        buildContainer.style.display = "block";
    }
    for (let i = 0; i < buildContainers.length; i++) {
        const buildContainer = buildContainers[i];
        var charID = buildContainer.id.substring(buildContainer.id.indexOf("-") + 1);
        if (!charID.includes(searchbar.value)) {
            buildContainer.style.display = "none";
        }
    }
});
