// d3.json('http://localhost:8080/api/rosters').then(function (data) {


//     var tip = d3.select(".chart-container")
//         .append("div")
//         .attr("class", "tip")
//         .style("position", "absolute")
//         .style("z-index", "10")
//         .style("visibility", "hidden");

//     var svg = d3.select("svg").attr("class", "background-style"),
//         margin = {
//             top: 20,
//             right: 20,
//             bottom: 42,
//             left: 40
//         },
//         width = +svg.attr("width") - margin.left - margin.right,
//         height = +svg.attr("height") - margin.top - margin.bottom;

//     var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
//         y = d3.scaleLinear().rangeRound([height, 0]);

//     var g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // var data = team_data;

//     x.domain(data.map(function (d) {
//         return d.player;
//     }));
//     y.domain([0, d3.max(data, function (d) {
//         return d.points;
//     })]);

//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .append("text")
//         .attr("y", 6)
//         .attr("dy", "2.5em")
//         .attr("dx", width / 2 - margin.left)
//         .attr("text-anchor", "start")
//         .text("Players");

//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Points Scored");


//     g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function (d) {
//             return x(d.player);
//         })
//         .attr("y", function (d) {
//             return y(d.points);
//         })
//         .attr("width", x.bandwidth())
//         .attr("height", function (d) {
//             return height - y(d.points)
//         })
//         .on("mouseover", function (d) {
//             return tip.text(d.points).style("visibility", "visible").style("top", y(d.points) - 13 + 'px').style("left", x(d.player) + x.bandwidth() - 12 + 'px')
//         })
//         //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//         .on("mouseout", function () {
//             return tip.style("visibility", "hidden");
//         });
// });

var static_data = [{
    points_scored: 2014,
    assits_count: 42
  },{
    points_scored: 2015,
    assits_count: 102
  },{
    points_scored: 2016,
    assits_count: 160
  },{
    points_scored: 2017,
    assits_count: 82
  },{
    points_scored: 2018,
    assits_count: 48
  },{
    points_scored: 2019,
    assits_count: 68
  },{
    points_scored: 2020,
    assits_count: 28
  }];
  var tip = d3.select(".chart-container")
      .append("div")
    .attr("class", "tip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
  
  var svg = d3.select("svg").attr("class", "background-style"),
      margin = {top: 20, right: 20, bottom: 42, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
  
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
      y = d3.scaleLinear().rangeRound([height, 0]);
  
  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  d3.json("apiPlaceholderURL", function(error, data) {
    //if (error) throw error;
  
    var data = static_data;
    
    x.domain(data.map(function(d) { return d.points_scored; }));
    y.domain([0, d3.max(data, function(d) { return d.assits_count; })]);
  
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
     .append("text")
        .attr("y", 6)
        .attr("dy", "2.5em")
        .attr("dx", width/2 - margin.left)
        .attr("text-anchor", "start")
        .text("Players");
  
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Points Scored ");
   
  
    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.points_scored); })
        .attr("y", function(d) { return y(d.assits_count); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.points)
        })
        .on("mouseover", function (d) {
            return tip.text(d.points).style("visibility", "visible").style("top", y(d.points) - 13 + 'px').style("left", x(d.player) + x.bandwidth() - 12 + 'px')
        })
        //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");
        });
});

// Moose code: 

// d3.json('http://localhost:8080/api/rosters').then(function (data) {


//     var tip = d3.select(".chart-container")
//         .append("div")
//         .attr("class", "tip")
//         .style("position", "absolute")
//         .style("z-index", "10")
//         .style("visibility", "hidden");

//     var svg = d3.select("svg").attr("class", "background-style"),
//         margin = {
//             top: 20,
//             right: 20,
//             bottom: 42,
//             left: 40
//         },
//         width = +svg.attr("width") - margin.left - margin.right,
//         height = +svg.attr("height") - margin.top - margin.bottom;

//     var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
//         y = d3.scaleLinear().rangeRound([height, 0]);

//     var g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // var data = team_data;

//     x.domain(data.map(function (d) {
//         return d.player;
//     }));
//     y.domain([0, d3.max(data, function (d) {
//         return d.points;
//     })]);

//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .append("text")
//         .attr("y", 6)
//         .attr("dy", "2.5em")
//         .attr("dx", width / 2 - margin.left)
//         .attr("text-anchor", "start")
//         .text("Players");

//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y).ticks(10))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Points Scored");


//     g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function (d) {
//             return x(d.player);
//         })
//         .attr("y", function (d) {
//             return y(d.points);
//         })
//         .attr("width", x.bandwidth())
//         .attr("height", function (d) {
//             return height - y(d.points)
//         })
//         .on("mouseover", function (d) {
//             return tip.text(d.points).style("visibility", "visible").style("top", y(d.points) - 13 + 'px').style("left", x(d.player) + x.bandwidth() - 12 + 'px')
//         })
//         //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//         .on("mouseout", function () {
//             return tip.style("visibility", "hidden");
//         });
// });

/* 
This was deemed problematic by Github. Is this good or bad code? 
*/
/*
        .attr("height", function(d) { return height - y(d.assits_count)})
        .on("mouseover", function(d) {return tip.text(d.assits_count).style("visibility", "visible").style("top", y(d.assits_count) - 13+ 'px' ).style("left", x(d.points_scored) + x.bandwidth() - 12 + 'px')})
          //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
          .on("mouseout", function(){return tip.style("visibility", "hidden");});
      });
*/