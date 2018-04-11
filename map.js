var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path);

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
});

var d = [[500, 500]];

var g=function(n){
    var circ = d3.select("svg")
    .selectAll("circle")
    .data(d)
    .enter();
  circ.append("circle")
    
    .attr("cx", function(d) {return d[0];})
    .attr("cy", function(d) {return d[1];})
    .attr("r", 20);
};

g(0);
