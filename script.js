var superheroe;

$('#heroesForm').submit(function(event){
    event.preventDefault();    
    let hero = $("#nHeroe").val();
    let regex = /[^0-9]/;
    let check = regex.test(hero);

    if (check || hero == ""){
        $("#mensajeError").text("Ingrese sólo números por favor");
    } else{
        connection(hero);
        $("#mensajeError").text("");
    }
})

function connection(hero){
    let baseUrl = "https://superheroapi.com/api.php/"
    let token = "fef852081c10c123f89cae02d17bad64/"
    
        $.ajax({
            url: baseUrl+token+hero,
            type: "GET",
            dataType: "json",
            success: function(data){
                superheroe = data;
                try{
                    cards();
                    graphicValidation();
                } catch(e){
                    alert("Número no encontrado");
                }
            }
        })
}

function cards(){
    $("#cards")
            .html("<div class='card my-5' style='max-width: 1080px;'>"+
                    "<div class='row g-0'>"+
                        "<div class='col-md-4'>"+
                        "<img src="+ superheroe.image.url +" class='img-fluid rounded-start'>"+
                        "</div>"+
                        "<div class='col-md-8'>"+
                        "<div class='card-body'>"+
                            "<h5 class='card-title'>Nombre: "+ superheroe.name +"</h5>"+
                            "<hr/>"+
                            "<p class='card-text'>Conexiones: "+ superheroe.connections["group-affiliation"] +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Publicado por: "+ superheroe.biography.publisher +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Ocupación: "+ superheroe.work.occupation +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Primera aparición: "+ superheroe.biography["first-appearance"] +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Altura: "+ superheroe.appearance.height[1] +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Peso: "+ superheroe.appearance.weight[1] +"</p>"+ 
                            "<hr/>"+
                            "<p class='card-text'>Alianzas: "+ superheroe.biography.aliases +"</p>"+ 
                        "</div>"+
                        "</div>"+
                    "</div>"+
                    "</div>"
            );
}

function graphic(){
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Estadísticas de poder de "+ superheroe.name
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y} Pts",
            dataPoints: [
                { y: superheroe.powerstats.combat, label: "Combate" },
                { y: superheroe.powerstats.durability, label: "Resistencia" },
                { y: superheroe.powerstats.intelligence, label: "Inteligencia" },
                { y: superheroe.powerstats.power, label: "Poder" },
                { y: superheroe.powerstats.speed, label: "Velocidad" },
                { y: superheroe.powerstats.strength, label: "Fuerza" }
            ]
        }]
    });
    chart.render();
}

function graphicValidation(){
    if (
        superheroe.powerstats.combat == "null" ||
        superheroe.powerstats.durability == "null" ||
        superheroe.powerstats.intelligence == "null" ||
        superheroe.powerstats.power == "null" ||
        superheroe.powerstats.speed == "null" ||
        superheroe.powerstats.strength == "null"
    ) {
        $("#chartContainer").text("Estadísticas de poder desconocidas");
    }
    else {
        graphic();
    }
}