// @TODO: YOUR CODE HERE!

// The code for the chart is wrapped inside a function that
// automatically resizes the chart

function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  
  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  
  
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
   var svg = d3
     .select("#scatter")
     .append("svg")
     .attr("height", svgHeight)
     .attr("width", svgWidth);

     
  // Append group element
   var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
    // Read CSV
   d3.csv("./D3_data_journalism/StarterCode/assets/data/data.csv").then(function(ourData) {
        // console.log(data)
   
        // parse data
    ourData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.abbr =  data.abbr;
    });

    // create scales
    var xScale = d3.scaleLinear()
                   .domain([d3.min(ourData, data => (data.poverty-0.2)) ,
  
                            d3.max(ourData, data => data.poverty) ])               
                   .range([0, width]);
                     
    var yScale = d3.scaleLinear()
                   .domain([d3.min(ourData, data=> (data.healthcare-1)),
                            d3.max(ourData, data => data.healthcare) ])
                   .range([height, 0]);
                            
                   
  
    // create axes
    var xAxis= d3.axisBottom(xScale).ticks(20);
    var yAxis = d3.axisLeft(yScale).ticks(20);
    
  
    // append axes
    chartGroup.append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(xAxis);
   
    chartGroup.append("g")
              .call(yAxis);
  
         
    // append circles
   var circlesGroup = chartGroup.selectAll("circle")
      .data(ourData)
      .enter()
      .append("circle")
      .attr("cx", data => xScale(data.poverty))
      .attr("cy", data => yScale(data.healthcare))
      .attr("r", "10")
      .attr("fill", "pink")
      .attr("stroke-width", "1")
      .attr("stroke", "black");
 
