jQuery(document).ready(function () {

    typewriter();

    $("#typedtext").on("click", function () {
        iSpeed = 0;
        aSpeed = 0;
        // iIndex = 1;
    });

    $(".blurp").mouseenter(function () {
        $(this).addClass("animated blurpMove");
        setTimeout(() => {
            $(this).removeClass("animated blurpMove");
        }, 1000);
    });

    $(".darkmode-switch").on("click", function () {
        $("body").toggleClass("darkmode");
        $(".logo, .carousel-control-next-icon, .carousel-control-prev-icon, .btn-main.to-invert").toggleClass("logo-invert");
    });

    window.onclick = function (event) {
        if (event.target.id == "myModal") {
            $("#myModal").addClass("hidden");
        }
    }

    // Récupération et affichages des projets
    $.ajax({
        url: 'https://dimxpas.github.io/src/datas/datas_project.json',
        type: 'GET',
        dataType: 'json',
        success: function (datas_projects) {
            // Récupération des langages utilisés sur les projets
            $.ajax({
                url: 'https://dimxpas.github.io/src/datas/datas_language.json',
                type: 'GET',
                dataType: 'json',
                success: function (datas_languages) {
                    var datas_language = datas_languages.language_project;
                    // boucle sur les projets
                    datas_projects.projects.forEach((data_project) => {
                        var code_project = data_project.code_name_project;
                        var class_project = data_project.code_class_project;
                        div_project = "<div class='col col-sm-12 col-lg-6 col-xl-4 mb-4'>";
                        // avec le css existant
                        // div_project += "<div class='project-block " + class_project + "-block'>";
                        // en supprimant le css pour dynamiser
                        if (code_project == "webils") {
                            background_project = "background-color:" + data_project.background_project;
                        } else {
                            background_project = "background-image: url(src/img/" + code_project + "/" + data_project.background_project + ")";
                        }
                        div_project += "<div class='project-block " + class_project + "-block' style='" + background_project + "'>";
                        if (code_project == "biskit" || code_project == "shakerClub") {
                            div_project += "<span class='" + class_project + "-logo'>" + data_project.name_project + "</span>";
                        } else {
                            div_project += "<img class='" + class_project + "-logo' src='src/img/" + code_project + "/" + data_project.img_project + "'>";
                        }
                        div_project += "<div class='project-content " + class_project + "-content hidden'>";
                        div_project += "<p>" + data_project.mini_description_project + "</p>";
                        // Langages
                        var languages_project = data_project.language_project.split(";");
                        var languages = "";
                        for (let i = 0; i < languages_project.length; i++) {
                            if (datas_language[languages_project[i]]['class_language'].split(' ')[0] == "adaptative-icon") {
                                languages += "<span class='" + datas_language[languages_project[i]]['class_language'] + "' title='" + datas_language[languages_project[i]]['name_language'] + "'></span> ";
                            } else {
                                languages += "<span title='" + datas_language[languages_project[i]]['name_language'] + "'><i class='" + datas_language[languages_project[i]]['class_language'] + "'></i></span> ";
                            }
                        }
                        div_project += "<p class='logo-language'>" + languages + "</p>";
                        if (code_project == "webils") {
                            class_btn = "";
                        } else {
                            class_btn = " logo-invert";
                        }
//                         div_project += "<button class='btn-main" + class_btn + "' onclick=\"openInfosProject('" + class_project + "')\">En savoir plus</button>";
                        div_project += "</div></div></div>";
                        // Ajout de l'affichage du projet dans la section projet
                        $("#projects_section").append(div_project);
                    });

                    $(".project-block").on("mouseenter mouseleave", function () {
                        name_block = $(this)[0].className.replace("project-block ", "").replace("-block", "");
                        $("." + name_block + "-logo, ." + name_block + "-content").toggleClass("hidden");
                    });
                }
            });
        }
    });

});

function redirectToProject(id) {
    location.replace('file:///D:/Documents/Code/dimxpas.github.io/project.html#' + id);
}

// set up text to print, each item in array is new line
var aText = new Array(
    "Bonjour,",
    "je m'appelle Dimitri,",
    "j'ai commencé à coder fin 2018.",
    "En février 2019, j'intègre la Wild Code School à Orléans pour 6 mois.",
    "C'est en septembre 2019 que je rejoins l'entreprise Delixir où j'ai pu coder quelques sites et fonctionnalitées.",
    "Sur ce site vous découvrirez mes projets, compétences ainsi que les languages acquis.",
    "",
    "Bienvenue et bonne visite à vous !"
);

var iSpeed = 30; // time delay of print out
var aSpeed = 500; // time delay of new line
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", aSpeed);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}

function openInfosProject(id_project) {
    $("#myModal").removeClass("hidden");
    background_project = $("." + id_project + "-block")[0].attributes["style"].value.split(":");
    color_project = $("." + id_project + "-content").css("color");
    $(".modal-content").removeAttr("style");
    $(".modal-content").css(background_project[0], background_project[1]).css("color", color_project);
}
