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

  var d = [];

  var i = 0;
  while (i < 1){
    var datas = myData[i];
    var pops = datas.split("\"Population\": \"");
    for (var j = 1; j < pops.length; j ++){
      var pop = pops[j].split("\"")[0];
      pop = parseInt(pop);
      d.push([j * 25, j * 25, pop / 1000]);
    }
    i ++;
  }

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
      .attr("r", function (d) {
        return d[2];
      })
      .on("mouseover", function (d) {
        d3.select(this).transition().duration(250).style("fill", "#00aeef");
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration(500).style("fill", "black");
      });
  };

  for (var k = 0; k < d.length; k ++){
    g(k);
  }
});

console.log(myData);
console.log(myCoords);