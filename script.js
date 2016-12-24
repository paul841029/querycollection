/**
 * Created by luh on 12/21/16.
 */

var foo = function(){alert("hello world")};

var selected_graph = [0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0
                      ];
var second = 0;
function testing () {
    $("#canvas").append("<p>test<p>");
}



function generateGraphs(index) {

    var folder = index;


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 400 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;

// Parse the date / time
//var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

// Adds the svg canvas
//var data_lst = ["data1.csv", "data2.csv"]



    for (let i = 0; i<15; i++) {

        (function(){ var svg = d3.select("#graph_"+i)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
            d3.csv(folder.toString()+"/"+i+".csv", function(error, data) {
                data.forEach(function(d) {
                    d.x = +d.x;
                    d.y = +d.y;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.x; }));
                y.domain([0, d3.max(data, function(d) { return d.y; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            });

        })();

    }

}

function selectStep1(index){
    var index_arry = index.split("/");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#graph_" + index_arry[i]).attr("class", "selected_once");
            selected_graph[+index_arry[i]]++;
        })();
    }

}

function selectStep2(index){
    var index_arry = index.split("/");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#graph_" + index_arry[i]).attr("class", "selected_twice");
            selected_graph[+index_arry[i]] = 2;
        })();
    }

    second = 1;
}


$(document).ready(function() {

    //submission handler
    $( "form" ).submit(function( event ) {
        var text = "Query:\xa0\xa0"+$("#query1").val()+"\n";
        var text_step2 = "Query:\xa0\xa0"+$("#query2").val()+"\n";

        var graphs = "Index of selected graphs:\xa0\xa0 /";
        var graphs_step2 = "Index of selected graphs:\xa0\xa0 /";
        for (let i = 0; i<selected_graph.length; i++) {
            if(selected_graph[i]) {
                graphs += i + "/";
                if(selected_graph[i] > 1)
                    graphs_step2 += i + "/";
            }
        }
        graphs += "\n\n";
        graphs_step2 += "\n\n";
        var footer = "Your selections have been recorded. Please go to the next collections by the nav bar below.";
        if(!second)
            alert(text+graphs+footer);
        else
            alert("STEP1:\n"+text+graphs+"STEP2:\n"+text_step2+graphs_step2+footer);
        event.preventDefault();
    });


});



(function(){

})();

