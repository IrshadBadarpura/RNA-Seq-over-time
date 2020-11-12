function plot1(val){

d3.csv("../data/Day0_mod.csv")
  .then(function(data){

    dataArray = new Array(500);
    genes = {}

    genesKeys = Object.keys(data[0]);

    for(var i = 1; i<500;i++){
      genes[genesKeys[i]] = i+1
    }

    for(var i = 0; i< 500;i++){
      array = new Array(500);
      keys = Object.entries(data[i]);
      for(var j = 0; j<500;j++){
        array[j] = parseFloat(keys[j+1][1]);
      }
      dataArray[i] = array
    }

var opt = {}
opt.epsilon = 10; // epsilon is learning rate (10 = default)
opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
opt.dim = 2; // dimensionality of the embedding (2 = default)

var tsne = new tsnejs.tSNE(opt); // create a tSNE instance

tsne.initDataDist(dataArray);

for(var k = 0; k < 500; k++) {
  tsne.step(); // every time you call this, solution gets better
}

var Y = tsne.getSolution(); // Y is an array of 2-D points that you can plot


for(var i = 0;i< dataArray.length;i++){
  for(var j = 0; j<dataArray[i].length;j++){
    Y[i].push(dataArray[i][j])
  }
}

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;
    
 		var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var svg = d3.select("#plot1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    x.domain(d3.extent(Y, function(d,i) { return (Y[i][0]); }));
    y.domain(d3.extent(Y, function(d,i) { return (Y[i][1]); }));

    // var val = "Sftpc";
    var selectGene = genes[val];
    // console.log(selectGene);
    var colorBlueScale = d3.scaleSequential(d3.interpolateBlues).domain();

    svg.selectAll("dot")
      .data(Y)
      .enter().append("circle")
      .attr("class","circle")
      .attr("r", 5)
      .attr("cx", function(d,i) { return x(Y[i][0]); })
      .attr("cy", function(d,i) { return y(Y[i][1]); })
      .style('fill', function(d,i) { return colorBlueScale( Y[i][selectGene]); } )

});
}

function plot2(val){
  d3.csv("../data/Day1_mod.csv")
  .then(function(data){

    dataArray = new Array(500);

    genes = {}

    genesKeys = Object.keys(data[0]);

    for(var i = 1; i<500;i++){
      genes[genesKeys[i]] = i+1
    }

    for(var i = 0; i< 500;i++){
      array = new Array(500);
      keys = Object.entries(data[i]);
      
      for(var j = 0; j<500;j++){

        array[j] = parseFloat(keys[j+1][1]);
        
      }

      dataArray[i] = array
    }

var opt = {}
opt.epsilon = 10; // epsilon is learning rate (10 = default)
opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
opt.dim = 2; // dimensionality of the embedding (2 = default)

var tsne = new tsnejs.tSNE(opt); // create a tSNE instance

tsne.initDataDist(dataArray);

for(var k = 0; k < 1000; k++) {
  tsne.step(); // every time you call this, solution gets better
}

var Y = tsne.getSolution(); // Y is an array of 2-D points that you can plot

for(var i = 0;i< dataArray.length;i++){
  for(var j = 0; j<dataArray[i].length;j++){
    Y[i].push(dataArray[i][j])
  }
}

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;
    
 		var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var svg = d3.select("#plot2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    x.domain(d3.extent(Y, function(d,i) { return (Y[i][0]); }));
    y.domain(d3.extent(Y, function(d,i) { return (Y[i][1]); }));


    var selectGene = genes[val];
    var colorBlueScale = d3.scaleSequential( d3.interpolateBlues).domain(dataArray[selectGene]);

    svg.selectAll("dot")
      .data(Y)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d,i) { return x(Y[i][0]); })
      .attr("cy", function(d,i) { return y(Y[i][1]); })
      .style('fill', function(d,i) { return colorBlueScale( Y[i][selectGene]); } )

  });
}

function plot3(val){
  d3.csv("../data/Day2_mod.csv")
  .then(function(data){

    dataArray = new Array(500);

    genes = {}

    genesKeys = Object.keys(data[0]);

    for(var i = 1; i<500;i++){
      genes[genesKeys[i]] = i+1
    }

    for(var i = 0; i< 500;i++){
      array = new Array(500);
      keys = Object.entries(data[i]);

      for(var j = 0; j<500;j++){

        array[j] = parseFloat(keys[j+1][1]);
        
      }

      dataArray[i] = array
    }

var colorBlueScale = d3.scaleSequential( d3.interpolateReds ).domain(dataArray[2]);

var opt = {}
opt.epsilon = 10; // epsilon is learning rate (10 = default)
opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
opt.dim = 2; // dimensionality of the embedding (2 = default)

var tsne = new tsnejs.tSNE(opt); // create a tSNE instance

tsne.initDataDist(dataArray);

for(var k = 0; k < 1000; k++) {
  tsne.step(); // every time you call this, solution gets better
}

var Y = tsne.getSolution(); // Y is an array of 2-D points that you can plot

for(var i = 0;i< dataArray.length;i++){
  for(var j = 0; j<dataArray[i].length;j++){
    Y[i].push(dataArray[i][j])
  }
}

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 360 - margin.top - margin.bottom;
    
 		var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var svg = d3.select("#plot3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    x.domain(d3.extent(Y, function(d,i) { return (Y[i][0]); }));
    y.domain(d3.extent(Y, function(d,i) { return (Y[i][1]); }));

    var selectGene = genes[val]
    var colorBlueScale = d3.scaleSequential( d3.interpolateBlues ).domain(dataArray[selectGene]);

    svg.selectAll("dot")
      .data(Y)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d,i) { return x(Y[i][0]); })
      .attr("cy", function(d,i) { return y(Y[i][1]); })
      .style('fill', function(d,i) { return colorBlueScale( Y[i][selectGene]); } )

  });
}
