// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



// load data from csv
d3.csv("/assets/data/data.csv").then(function (popData) {
    console.log(popData);

    // Cast each rate value in popData as a number using the unary + operator
    popData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log("Poverty:", data.poverty);
    });


    // Create a scale for your independent (x) coordinates
    var xScale = d3.scaleLinear()
        .domain(d3.extent(popData, d => d.poverty))
        .range([0, svgWidth]);

    // Create a scale for your dependent (y) coordinates
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(popData, d => d.healthcare)])
        .range([svgHeight, 0]);

    // create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);


    // @TODO
    // Create code to build the scatter plot using the popData.
    chartGroup.selectAll("dot")
        .data(popData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.poverty); })
        .attr("cy", function (d) { return yScale(d.healthcare); })
        .attr("r", 1.5)
        .style("fill", "69b3a2")
}).catch(function (error) {
    console.log(error);
})

