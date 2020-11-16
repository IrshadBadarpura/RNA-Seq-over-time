class Cluster {
  constructor(svgid, offsetX, offsetY, svgWidth, svgHeight, colorScale, data) {

    var borderWidth = 0.2;
    var borderColor = 'black';
    var dotSize = 2;
    /*
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 460 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;*/

    var x = d3.scaleLinear().range([0, svgHeight]);
    var y = d3.scaleLinear().range([svgWidth, 0]);
    
    x.domain(d3.extent(data, function(d) { return (d.tsne[0]); }));
    y.domain(d3.extent(data, function(d) { return (d.tsne[1]); }));

    //=======================//
    // Set up the SVG canvas //
    //=======================//

    // Create the SVG canvas
    var svg = d3.select("body").append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("id", `ClusterSVG${svgid}`);

    // Reposition  
    $(`#ClusterSVG${svgid}`).css({
      top: offsetY,
      left: offsetX,
      position:'absolute'
    });

    // Border
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("stroke", borderColor)
      .style("stroke-width", borderWidth)
      .style("fill", 'none');

    this._updateView = function(selectedGene) {
      //==================//
      // Draw the cluster //
      //==================//

      // Remove anything previously drawn
      svg.selectAll('.dot').remove();

      // Draw the new cluster
      svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class","dot")
        .attr("r", dotSize)
        .attr("cx", function(d) { return x(d.tsne[0]); })
        .attr("cy", function(d) { return y(d.tsne[1]); })
        .style('fill', function(d) { return colorScale(d[selectedGene]); } );
    }

    // When no gene is selected, all dots show black
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class","dot")
        .attr("r", dotSize)
        .attr("cx", function(d) { return x(d.tsne[0]); })
        .attr("cy", function(d) { return y(d.tsne[1]); })
        .style('fill', 'black');
    //this._updateView("Sftpc");
  }

  updateView(selectedGene) {
    this._updateView(selectedGene);
  }
}