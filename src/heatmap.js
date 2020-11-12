//var HEATMAP_GLOBALS_CONTAINER = {};

class Heatmap {
  constructor(offsetX, offsetY, svgWidth, svgHeight, data) {
    //console.log(data);
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    svgWidth = svgWidth;
    svgHeight = svgHeight;

    var margin = 50;

    var uniqueCells = d3.map(data, function(d){return d.cell;}).keys();
    var uniqueGenes = d3.map(data, function(d){return d.gene;}).keys();
    var maxExpression = d3.max(data, function(d){return d.expression});
    //console.log('max exp:',maxExpression);

    //console.log('uniqueCells:', uniqueCells)
    //console.log('uniqueGenes:', uniqueGenes)

    this.data = data;

    var borderWidth = 0.1;
    var borderColor = 'black';

    var cellSet = [];
    var geneSet = [];

    for (var i = 0; i < 15; i++) {
      cellSet.push(uniqueCells[i]);
      geneSet.push(uniqueGenes[i]);
    }

    
    var colorScale = d3.scaleLinear()
        .domain([0, maxExpression])
        .range(['#eff3ff', '#08519c'])
        .interpolate(d3.interpolateHcl); //interpolateHsl interpolateHcl interpolateRgb

    // Create the SVG canvas for the heatmap
    var svg = d3.select("body").append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("id", "HeatMapSVG");

    // Reposition  
    $("svg").css({
      top: this.offsetY,
      left: this.offsetX,
      position:'absolute'
    });

    var selfID = 77;
    // Border
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("stroke", borderColor)
      .style("stroke-width", borderWidth)
      .style("fill", 'none');


    this._addCell = function(cellName) {
      if (!cellSet.includes(cellName)) {
        cellSet.push(cellName);
        this.updateHeatmap();
      }
    }
    this._addGene = function(geneName) {
      if (!geneSet.includes(geneName)) {
        geneSet.push(geneName);
        this.updateHeatmap();
      }
    }

    var updateHeatmap = function () {
      svg.selectAll(`.heatmap${selfID}`).remove();

      var colWidth = (svgWidth - margin) / cellSet.length;
      var rowHeight = (svgHeight - margin) / geneSet.length;

      svg.selectAll('.heatmaprect')
      .data(data)
      .enter()
      .append('rect')
      .filter(function(d) { 
        return (cellSet.includes(d.cell) && geneSet.includes(d.gene));
      })
      .attr('x', function(d) {
        var col_idx = cellSet.indexOf(d.cell);
        var ret = margin + colWidth * col_idx;
        return ret;
      })
      .attr('y', function(d) {
        var row_idx = geneSet.indexOf(d.gene);
        var ret =  margin + rowHeight * row_idx;
        return ret;
      })
      .attr('width', function(d) {
        return colWidth;
      })
      .attr('height', function(d) {
        return rowHeight;
      })
      .attr("fill", function (d) { return colorScale(d.expression); })
      .attr('stroke', borderColor)
      .attr('stroke-width', 0.1)
      .attr('class', function(d){ return `heatmap${selfID}`})
      .attr('id', function(d) {return d3.select(this).attr('class')+` ${d.cell}:${d.gene}`})
      .on("click", function(d) {
        console.log('id: ',d3.select(this).attr('id'));
        console.log('class: ',d3.select(this).attr('class'));
        console.log('data: ', d);
      });

      svg.selectAll('.geneText')
        .data(geneSet)
        .enter()
        .append('text').text(function(d) { return d;})
        .attr('class', `heatmap${selfID}`)
        .attr('font-size', '10px')
        .attr('y', function(d) { 
          var row_idx = geneSet.indexOf(d);
          var ret =  margin + rowHeight * row_idx + rowHeight*(0.66);
          //console.log(row_idx, ret);
          return ret;
        })
        .attr('x', margin*0.9)
        .attr('text-anchor', 'end')
        .on('click', function(d){
          if (d3.event.shiftKey) {
            geneSet.splice(geneSet.indexOf(d), 1);
            updateHeatmap();
          }
          else {
            console.log('TEXT:',d);
          }
        });

      svg.selectAll('.cellText')
        .data(cellSet)
        .enter()
        .append('text').text(function(d) { return d;})
        .attr('class', `heatmap${selfID}`)
        .attr('font-size', '10px')
        .attr('text-anchor', 'end')
        .attr('transform', function(d){
          var col_idx = cellSet.indexOf(d);
          var ret =  margin + colWidth * col_idx + colWidth/2;
          return `translate(${ret},${margin*0.9})rotate(45)`;
        })
        .on('click', function(d){
          if (d3.event.shiftKey) {
            cellSet.splice(cellSet.indexOf(d), 1);
            updateHeatmap();
          }
          else {
            console.log('TEXT:',d);
          }
        });
    }
    this.updateHeatmap = updateHeatmap;

    this.updateHeatmap();
   
  }

  addCell(name) {
    this._addCell(name);
  }
  addGene(name) {
    this._addGene(name);
  }
}