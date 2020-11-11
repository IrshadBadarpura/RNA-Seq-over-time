var day0Dataset = "Day0";
var day1Dataset = "Day1";
var day2Dataset = "Day2";
var day0Data, day1Data, day2Data, day3Data, day4Data, day5Data;

day0Data = loadData(day0Dataset);
day2Data = loadData(day1Dataset);
day3Data = loadData(day2Dataset);
// day4Data = loadData(dataset);
// day5Data = loadData(dataset);
// day6Data = loadData(dataset);

function loadData(fileName){
    var url = "../data/" + fileName + ".csv";

    var dataArray = [];

    d3.csv(url).then(function(data) {

        for(var i = 0; i < data.length; i++){
            var values = Object.values(data[i]);
            var keys = Object.keys(data[i]);
            var cellName = values[0];

            var cellDict = {};

            for(var j = 1; j < values.length; j++){
                cellDict["cell"] = cellName;
                cellDict["gene"] = keys[j];
                cellDict["expession"] = values[j];

                dataArray.push(cellDict);
                cellDict = {};
            }
        }
    })

    return dataArray;
}

