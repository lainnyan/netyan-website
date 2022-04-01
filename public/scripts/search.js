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
                    const tag = tagsArrayElement.tags[k];
                    if (!tag.toLowerCase().includes(searchbar.value.toLowerCase())) {
                        if (k == tagsArrayElement.tags.length - 1) buildContainer.style.display = "none";
                    } else break;
                }
                break;
            }
        }
    }
});

tagsArray = [
    {
        name: "keqing",
        tags: ["Кэ Цин", "кецин", "кеца", "кека", "Keqing", "Ke Qing"],
    },
    {
        name: "ayaka",
        tags: ["Аяка", "Ayaka", "Камисато", "Kamisato"],
    },
    {
        name: "xiao",
        tags: ["Сяо", "Сява", "дед инсайд", "Xiao"],
    },
    {
        name: "raiden",
        tags: ["Райден", "Баал", "Эи", "Макото", "Вельзевул", "Сёгун", "Сегун", "Raiden", "Baal", "Ei", "Shogun"],
    },
    {
        name: "zhongli",
        tags: ["Чжун Ли", "дед", "Zhongli", "чжунли"],
    },
    {
        name: "xiangling",
        tags: ["Сян Лин", "Xiangling"],
    },
    {
        name: "xingqiu",
        tags: ["Син Цю", "Xingqiu", "Синий", "Синица"],
    },
    {
        name: "bennett",
        tags: ["Беннет", "Bennett", "Benny", "Беннетт", "Бенет"],
    },
    {
        name: "hutao",
        tags: ["Ху Тао", "Hu Tao", "Хутао", "Hutao", "хутава"],
    },
    {
        name: "tartaglia",
        tags: ["Тарталья", "Чайлд", "Tartaglia", "Childe", "торт"],
    },
    {
        name: "yaemiko",
        tags: ["Яэ Мико", "Yae Miko", "жрица", "кицунэ"],
    },
    {
        name: "ayato",
        tags: ["Аято", "Ayato", "Камисато", "Kamisato"],
    },
];
