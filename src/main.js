var filenames = ['Day0_mod', 'Day1_mod', 'Day2_mod'];

var loaded = [];
for (var i = 0; i < filenames.length; i++) {
    loaded.push(false);
}

var viewportWidth = 200;
var viewportHeight = 200;
var viewportMargin = 20;

var clusterArray = [];
var heatmapArray = [];

var geneList = [];
var cellList = [];

// Change some CSS
$('#selectGene').css({
    top: 50,
    left: 50,
    'margin-left':0,
    'margin-top':0,
    position:'absolute'
});
$('#selectCell').css({
    top: 50,
    left: 400,
    'margin-left':0,
    'margin-top':0,
    position:'absolute'
});

$('.selection').css("visibility", "hidden");
$('#myTitle').text('Loading TSNE plots, please wait...');

// Load the data
for (var file_idx = 0; file_idx < filenames.length; file_idx++) {
    loadData(file_idx, filenames[file_idx]);
}

// set up the dropdowns
geneDropdown('ddlGenes', geneList);
cellDropdown('ddlCells', cellList);

function loadData(idx, fileName){
    var url = "../data/" + fileName + ".csv";

    d3.csv(url).then(function(data) {

        var dataArray = [];
        var geneExpressionArray = [];

        for(var i = 0; i < data.length; i++){
            var keys = Object.keys(data[i]);
            var cellName = data[i][keys[0]];
            var entry = {cell:cellName};
            if (!cellList.includes(cellName)) {
                cellList.push(cellName);
            }
            var geneArray = [];

            for(var j = 1; j < keys.length; j++){
                var expVal = parseFloat(data[i][keys[j]])
                entry[keys[j]] = expVal;
                geneArray.push(expVal);
                if (i==1) {
                    if (!geneList.includes(keys[j])) {
                        geneList.push(keys[j]);
                    }
                }
            }
            entry.geneExpressionArray = geneArray;
            geneExpressionArray.push(geneArray); // This is for TSNE

            dataArray.push(entry);
        }
        //console.log(dataArray);
        //console.log(geneExpressionArray);

        //====================//
        // Get TSNE positions //
        //====================//
        var opt = {}
        opt.epsilon = 10; // epsilon is learning rate (10 = default)
        opt.perplexity = 30; // roughly how many neighbors each point influences (30 = default)
        opt.dim = 2; // dimensionality of the embedding (2 = default)
        var tsne = new tsnejs.tSNE(opt); // create a tSNE instance
        tsne.initDataDist(geneExpressionArray);
        for(var k = 0; k < 500; k++) {
          tsne.step(); // every time you call this, solution gets better
        }
        var Y = tsne.getSolution(); // Y is an array of 2-D points that you can plot
        for (var i = 0; i < dataArray.length; i++) {
            dataArray[i].tsne = Y[i];
        }
        //console.log(dataArray);

        //=====================================//
        // Get color scale for gene expression //
        //=====================================//
        var maxExpression = d3.max(dataArray, function(d) {
          return d3.max(d.geneExpressionArray);
        });
        var minExpression = d3.min(dataArray, function(d) {
          return d3.min(d.geneExpressionArray);
        });

        var meanExpression = d3.mean(dataArray, function(d){
            return d3.mean(d.geneExpressionArray)
        });

        var colorScale = d3.scaleSequential(d3.interpolateReds).domain([maxExpression,minExpression]);


        //================//
        // Create Cluster //
        //================//
        var xPosition = viewportMargin + (idx*(viewportWidth+viewportMargin))
        //console.log(idx, xPosition);

        clusterArray.push(new Cluster(idx*2, xPosition, 100, viewportWidth, viewportHeight, colorScale, dataArray, meanExpression, geneExpressionArray));

        heatmapArray.push(new Heatmap(idx*2+1, xPosition, 100+(viewportHeight+viewportMargin), viewportWidth, viewportHeight, colorScale, dataArray, onClickFn=selectGeneInCluster));

        // Check to see if loading is finished
        loaded[idx] = true;
        if (!loaded.includes(false)) {
            $('#myTitle').remove();
            $('.selection').css("visibility", "visible");
        }
    });
}

function selectGeneInCluster(geneName) {
    for (var i = 0; i < clusterArray.length; i++) {
        clusterArray[i].updateView(geneName);
    }  
}

function selectedGenes(genes){
    console.log(genes);
}

function cellDropdown(id, array){
    $( "#"+id ).autocomplete({
        source: array,
        select: function( event, ui ) {
            //c1.updateView(ui.item.value);
            for (var i = 0; i < heatmapArray.length; i++) {
                heatmapArray[i].addCell(ui.item.value);
            }  
        }
    });
}

function geneDropdown(id, array){
    $( "#"+id ).autocomplete({
        source: array,
        select: function( event, ui ) {
            //c1.updateView(ui.item.value);
            for (var i = 0; i < heatmapArray.length; i++) {
                heatmapArray[i].addGene(ui.item.value);
            }  
        }
    });
}
