var day0Dataset = "Day0";
var day1Dataset = "Day1";
var day2Dataset = "Day2";
var day0Data, day1Data, day2Data, day3Data, day4Data, day5Data;

loadData(day0Dataset, "ddlGenes");
loadData(day1Dataset);
loadData(day2Dataset);
// loadData(dataset);
// loadData(dataset);
// loadData(dataset);

function loadData(fileName, ddlName = ""){
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

        if(ddlName != ""){
            createDropdown(ddlName, geneArray);
            

        }  
    });
}

function createDropdown(id, array){
    $( "#"+id ).autocomplete({
        source: array,
        select: function( event, ui ) {
            var cluster1 = document.getElementById("plot1");
            cluster1.querySelectorAll('*').forEach(n => n.remove());

            var cluster2 = document.getElementById("plot2");
            cluster2.querySelectorAll('*').forEach(n => n.remove());

            var cluster3 = document.getElementById("plot3");
            cluster3.querySelectorAll('*').forEach(n => n.remove());
            
            plot1(ui.item.value);
            plot2(ui.item.value);
            plot3(ui.item.value);
            console.log(ui.item.value);
        }
    });
}
