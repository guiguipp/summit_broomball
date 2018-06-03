d3.json("myData.json", function (data) {

    var team_data = require("../../routes/stat-api-routes.js")

    var tip = d3.select(".chart-container")
        .append("div")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    var svg = d3.select("svg").attr("class", "background-style"),
        margin = {
            top: 20,
            right: 20,
            bottom: 42,
            left: 40
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("apiPlaceholderURL", function (error, data) {
        //if (error) throw error;

        var data = team_data;

        x.domain(data.map(function (d) {
            return d.player;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.points;
        })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("y", 6)
            .attr("dy", "2.5em")
            .attr("dx", width / 2 - margin.left)
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
            .text("Pooints Scored");


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.player);
            })
            .attr("y", function (d) {
                return y(d.points);
            })
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

})