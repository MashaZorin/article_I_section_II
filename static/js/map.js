var svg = d3.select("svg");
var result;
var DataLibrary;
var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
  if (error) throw error;

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

  var d = [
    [500, 500]
  ];

  var g = function (n) {
    var svgc = svg.selectAll("circle")
      .data(d)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return d[0];
      })
      .attr("cy", function (d) {
        return d[1];
      })
      .attr("r", 20)
      .on("mouseover", function (d) {
        d3.select(this).transition().duration(250).style("fill", "#00aeef");
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration(500).style("fill", "black");
      });
  };

  g(0);
});

function getCoordinates() {
    
    var geocoder = new google.maps.Geocoder();
    for (var year in myData){
	for ( var rank in year){
	    geocoder.geocode({
		'address': rank[0];
	    }, function (results, status) {
		if (status === 'OK') {
		    result = results[0].geometry.location;
		    myData.year.rank.push(result.lat());
		    myData.year.rank.push(result.lng());
		} else {
		    alert('Geocode was not successful for the following reason: ' + status);
		}
	    });
	};
    };
};

console.log(myData);