// Creating empty variables to be used later on 
var option = "";
var dataSet ;


function init() {
  d3.json("samples.json").then(function(data){
    dataSet = data;

    console.log(dataSet);
    
    showMetaData(940,dataSet);
    showBarChart(940,dataSet);
    showBubbleChart(940,dataSet);

    var optionMenu = d3.select("#selDataset");
    // Appending some option tags for the dropdown
    data.names.forEach(function(name){
      optionMenu.append("option").text(name);
    });
 })
}

// Changes the value based on the selection from the dropdown
function optionChanged(value) {
    option = value;
    showMetaData(option,dataSet);
    showBarChart(option,dataSet);
    showBubbleChart(option,dataSet);
}

// Changes what is sown as different IDs are selected to view on the page
function showMetaData(option,dataSet) {
    var metadata = dataSet.metadata.filter(row => row.id == option);
    d3.select("#sample-metadata").html(displayObject(metadata[0]));  
    console.log(metadata); 
}

function displayObject(obj) {
    var str = "";
    Object.entries(obj).forEach(([key,value]) => {
        str += `<br>${key}:${value}</br>`;
        // if(key=="wfreq"){
        //     buildGauge(value);
        //     console.log("gauge value is:" +value);
        // }     
    });
    return str;
}

// Function for the bar graph
function showBarChart(option,dataSet) {
    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData);
    
    var y = barData.map(row =>row.otu_ids);  
    var y1 =[];

    for(i=0;i<y[0].length;i++){
        y1.push(`OTU ${y[0][i]}`);
    }

    var x = barData.map(row =>(row.sample_values));
    var text = barData.map(row =>row.otu_labels);

    var trace = {
        x:x[0].slice(0,10),
        y:y1.slice(0,10),
        text:text[0].slice(0,10),
        type:"bar",
        orientation:"h",
        
    };
    var data = [trace];

    var layout = {
        yaxis: {
            autorange: "reversed" 
        }
    }
    Plotly.newPlot("bar",data,layout);
}

// Function for the bubble chart
function showBubbleChart(option,dataSet) {
    var barData = dataSet.samples.filter(sample => sample.id == option);
    console.log(barData); 

    var x = barData.map(row =>row.otu_ids); 
    var y = barData.map(row =>row.sample_values); 
    var text = barData.map(row =>row.otu_labels);
    var marker_size = barData.map(row =>row.sample_values);
    var marker_color = barData.map(row =>row.otu_ids);
    
    console.log(x[0]);
    console.log(y[0]);
    console.log(text);
    
    var trace1 = {
        x:x[0],
        y:y[0],
        text: text[0],
        mode:"markers",
        marker: {
            color: marker_color[0],
            size: marker_size[0]
        }
    };

    var data = [trace1];

    var layout = {
        xaxis:{
            title: "OTU ID"
        }
    };
    Plotly.newPlot("bubble",data,layout);
}

init();
