const searchbar = document.getElementById("build-search");
const buildContainers = document.getElementsByClassName("img-container");

searchbar.addEventListener("input", function () {
    for (let i = 0; i < buildContainers.length; i++) {
        const buildContainer = buildContainers[i];
        buildContainer.style.display = "block";
        var charID = buildContainer.id.substring(buildContainer.id.indexOf("-") + 1);
        for (let j = 0; j < tagsArray.length; j++) {
            const tagsArrayElement = tagsArray[j];
            if (tagsArrayElement.name == charID) {
                for (let k = 0; k < tagsArrayElement.tags.length; k++) {
                    const tags = tagsArrayElement.tags[k];
                }
            }
            if (!tagsArrayElement.tags.includes(searchbar.value)) buildContainer.style.display = "none";
        }
    }
});

tagsArray = [
    {
        name: "keqing",
        tags: ["Кэ Цин", "кецин", "кеца", "кека", "Keqing", "Ke Qing"],
    },
];
