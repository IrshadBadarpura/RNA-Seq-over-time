var day0Dataset = "Day0";
var day1Dataset = "Day1";
var day2Dataset = "Day2";
var day0Data, day1Data, day2Data, day3Data, day4Data, day5Data;

loadData(day0Dataset);
loadData(day1Dataset);
loadData(day2Dataset);
// loadData(dataset);
// loadData(dataset);
// loadData(dataset);

function loadData(fileName){
    var url = "../data/" + fileName + ".csv";

    var dataArray = [];
    var geneArray = [];
    var cellArray = [];

    d3.csv(url).then(function(data) {

        for(var i = 0; i < data.length; i++){
            var values = Object.values(data[i]);
            var keys = Object.keys(data[i]);
            var geneName = values[0];

            var cellDict = {};

            for(var j = 1; j < values.length; j++){
                cellDict["gene"] = geneName;
                cellDict["cell"] = keys[j];
                cellDict["expession"] = values[j];
                
                if(geneArray.length == 0){
                    cellArray.push(keys[j]);
                }

                dataArray.push(cellDict);
                cellDict = {};
            }

            geneArray.push(geneName);
        }

        createDropdown("ddlGenes", geneArray);
    });
}

function createDropdown(id, array){
    $( "#"+id ).autocomplete({
        source: array
    });
}

$("#ddlGenes").autocomplete({
    select: function( event, ui ) {
        console.log(ui.item.value);
    }
  });

