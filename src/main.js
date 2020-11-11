var dataset = "day0_subset";
var day1Data, day2Data, day3Data, day4Data, day5Data, day6Data;

day1Data = loadData(dataset);
// day2Data = loadData(dataset);
// day3Data = loadData(dataset);
// day4Data = loadData(dataset);
// day5Data = loadData(dataset);
// day6Data = loadData(dataset);

function loadData(fileName){
    var url = "../data/" + fileName + ".csv";

    var dataArray = [];

    d3.csv(url, function(data) {
        var values = Object.values(data);
        var keys = Object.keys(data);
        
        var genesNumber = values.length;
        var cellName = values[0];

        var cellDict = {};

        for(var i = 1; i < genesNumber; i++){
            cellDict["cell"] = cellName;
            cellDict["gene"] = keys[i];
            cellDict["expession"] = values[i];

            dataArray.push(cellDict)
        }
    });

    return dataArray;
}

