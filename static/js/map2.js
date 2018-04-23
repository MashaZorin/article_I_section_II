var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var margin = d3.map();

var projection = d3.geoAlbersUsa();

var path = d3.geoPath()
    .projection(null);

colors = ['darkred', 'red', 'orangered', 'tomato', 'orange', 'lightsalmon', 'sandybrown', 'khaki',
    'gold', 'goldenrod', 'yellowgreen', 'springgreen', 'limegreen', 'green',
    'darkgreen', 'cadetblue', 'cornflowerblue', 'dodgerblue', 'slateblue', 'navy', 'indigo',
    'rebeccapurple', 'purple', 'orchid', 'plum', 'pink', 'hotpink'
];

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .await(data);

var year, // Current year. 0-21
    numCircles = 25, // Number of circles to display 5 <= numCircles <= 25
    curArray, // Current array. myData[year]
    curCity, // Current city. Goes through ranks and updates curCity.
    curCityLat, // Current city lat
    curCityLng, // Current city lng
    dataset; // Final dataset to send to svg.

var updateYear = function (newYear) {
    year = newYear;
    $('#super-link').html("Now Viewing: " + (1790 + (10 * year)) + "<span class='sr-only'>(current)</span>");
};

var updateCircles = function (newNumber) {
    numCircles = newNumber;
    $('#super-link-2').html("Number of Circles: " + numCircles + "<span class='sr-only'>(current)</span>")
};

var getPop = function (year, rank) {
    return parseInt(myData[year][rank]["Population"]);
};

var getMass = function (year, rank) {
    var tempMass = myData[year][rank]["Land Mass"];
    if (tempMass == "") {
        return "N/A";
    } else {
        return parseInt(tempMass);
    }
}

var getLat = function (name) {
    for (var i = 0; i < myCoords.length; i++) {
        if (myCoords[i]["City"] == name) {
            return parseInt(myCoords[i]["Latitude"]);
        }
    }
};

var getLng = function (name) {
    for (var i = 0; i < myCoords.length; i++) {
        if (myCoords[i]["City"] == name) {
            return parseInt(myCoords[i]["Longitude"]);
        }
    }
};

var generateDataset = function () {
    dataset = []; // Clears the dataset upon run.
    curArray = myData[year]; // Sets the current array to the current year
    //console.log(curArray);

    for (var i = 0; i < numCircles; i++) { // Goes through each city in the year's array
        var tempset = []; // Temporary array to store information. Will get appended to dataset.
        var tempset2 = [];

        curCity = curArray[i]["City"]; // Sets the current city equal to the city ranked at i

        curCityLat = getLat(curCity); // Sets the current city's latitude
        curCityLng = getLng(curCity); // Sets the current city's longitude
        tempset.push(curCityLng); // Adds the longitude to the end of tempset
        tempset.push(curCityLat); // Adds the latitude to the end of tempset

        curCityPop = getPop(year, i); // Sets the current city's population
        curCityMass = getMass(year, i); // Sets the current city's land mass
        tempset2.push(curCity); // Adds the current city to the end of tempset
        tempset2.push(curCityPop); // Adds the population to the end of tempset
        tempset2.push(curCityMass); // Adds the landmass to the end of tempset
        if (curCityMass != "N/A") {
            tempset2.push(curCityPop / curCityMass); // Adds the population density
        } else {
            tempset2.push("No land area data"); // Adds the population density
        }
        tempset.push(tempset2);
        dataset.push(tempset);
    }
}

function data(error, us) {

    projection
        .scale(1260)
        .translate([(width / 2) - 3, (height / 2) - 15]);

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
            return a !== b;
        })));
}

var clearCityCircles = function () {
    svg.selectAll("circle").remove();
};

var calcTotalPop = function () {
    var total = 0;
    for (var i = 0; i < 25; i++) {
        total += getPop(year, i);
    }
    return total;
};

var calcPercentagePop = function (population) {
    var totalPop = calcTotalPop();
    return population / totalPop;
};

var calcRadius = function (population) {
    return Math.sqrt(calcPercentagePop(population) * 20000 / Math.PI);
};

var genCityCircles = function () {
    clearCityCircles();
    svg.selectAll("circle")
        .data(dataset).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", function (d) {
            return calcRadius(d[2][1]);
        })
        .attr("fill", function (d, f) {
            return colors[f];
        })
        .on("mouseover", function (d, f) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("City: " + d[2][0] + "<br>Population (# of people): " + d[2][1] + "<br>Rank: " + (f + 1) 
            + "<br>Land Mass (sq. miles): " + d[2][2] + "<br>Population Density (per sq. mile): " + d[2][3])
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 45) + "px");
        })             
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", function (d, f) {
            alert("City: " + d[2][0] + "\nPopulation (# of people): " + d[2][1] + "\nRank: " + (f + 1) 
            + "\nLand Mass (sq. miles): " + d[2][2] + "\nPopulation Density (per sq. mile): " + d[2][3]);
        });
};

var updateTable = function() {
    var table = document.getElementById("inputdatahere");
    table.innerHTML = "";
    for (var i = 0; i < numCircles; i ++){
        if (i != 24 || year != 0){
            var row = document.createElement("tr");
            var ranking = document.createElement("td");
            ranking.innerHTML = i + 1 + "";
            row.appendChild(ranking);
            var city = document.createElement("td");
            city.innerHTML = dataset[i][2][0];
            row.appendChild(city);
            var pop = document.createElement("td");
            pop.innerHTML = dataset[i][2][1];
            row.appendChild(pop);
            var mass = document.createElement("td");
            mass.innerHTML = dataset[i][2][2];
            row.appendChild(mass);
            var popDen = document.createElement("td");
            popDen.innerHTML = dataset[i][2][3];
            row.appendChild(popDen);
            row.style.color = colors[i];
            table.appendChild(row);
        }
    }
}

// Testing
var testData = function (year) {
    updateYear(year);
    generateDataset();
    genCityCircles();
    updateTable();
};

var mySlider = $('#ex1').slider({
    formatter: function (value) {
        testData(value);
    }
});

var mySlider2 = $('#ex2').slider({
    formatter: function (value) {
        updateCircles(value);
    }
});

var intervalID;

var calcYear = function () {
    if (year < 22) {
        return year + 1;
    } else {
        return 0;
    }
};

var moveSlider = function () {
    div.transition()
        .duration(500)
        .style("opacity", 0);
    updateYear(calcYear());
    mySlider.slider('setValue', year);
};

var startAni = function () {
    stopAni();
    intervalID = setInterval(moveSlider, 1000);
};

var stopAni = function () {
    clearInterval(intervalID);
};

$('#b1').click(startAni);

$('#b2').click(stopAni);

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

clearCityCircles();
startAni();