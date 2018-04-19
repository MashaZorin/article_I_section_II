var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var margin = d3.map();

var projection = d3.geoAlbersUsa();

var path = d3.geoPath()
    .projection(null);

d3.queue()
    .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    .await(data);

var year, // Current year. 0-21
    curArray, // Current array. myData[year]
    curCity, // Current city. Goes through ranks and updates curCity.
    curCityLat, // Current city lat
    curCityLng, // Current city lng
    dataset; // Final dataset to send to svg.

var updateYear = function (newYear) {
    year = newYear;
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
    console.log(curArray);

    for (var i = 0; i < 25; i++) { // Goes through each city in the year's array
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

        tempset.push(tempset2);
        dataset.push(tempset);
    }
}

function data(error, us) {

    projection
        /*
            .scale(979) // Scale of US model to fit the SVG
            .center([-96.2786, 38.850]) // Center of US model
        */
        .scale(1263) //Added from block
        //.center([-106, 37.5]) //Added from block
        .translate([width / 2, height / 2 - 15]);

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
        .attr("r", "8px")
        .attr("fill", "red")
};

// Testing
var testData = function (year) {
    updateYear(year);
    generateDataset();
    genCityCircles();
};

$('#ex1').slider({
    formatter: function (value) {
        return 'Current value: ' + value;
    }
});