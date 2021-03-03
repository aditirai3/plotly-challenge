// Initializes the page with a default plot
function init() {
    // Select the id for the dropdown menu
    var selectoption = d3.select("#selDataset");
  
    // Use the D3 library to read `samples.json`
    d3.json("samples.json").then((data) => {
      //check data on the console
      console.log(data);
    //Extract names from data and assign it to a variable
      var name = data.names;

      //append data to dropdown using foreach Loop
      name.forEach((value) => {
          option = selectoption.append("option")
          option.text(value).property("value"); 
      });
      
      // Select data to initiate
      var initaldata = name[0];
      console.log(initaldata)

      //Define functions
      barChart(initaldata);
      bubbleChart(initaldata);
      demographic(initaldata);
      gaugeChart(initaldata);

    });
  }
//   close the function
  init();

  //Function for horizontal bar chart
  function barChart(aParam) {
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      //select the samples dictionary from the json
      var samples = data.samples;
      //Filter out the id, labels and sample_values
      var filteredData = samples.filter(sample => sample.id == aParam)[0];
      var id = filteredData.otu_ids;
      var label = filteredData.otu_labels;
      var value = filteredData.sample_values;

      //console check
    //   console.log(id);
    //   console.log(label);
    //   console.log(value);
    
      // Slice the first 10 objects for plotting
      // sort in descending order
      var ten_values = value.slice(0, 10).reverse();
      var ten_labels = label.slice(0, 10).reverse();
      // Add OTU label to each ID  
      var ten_id = id.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();

      //check data on console
    //   console.log(filteredData);
    //   console.log(ten_values);
    //   console.log(ten_labels);
    //   console.log(ten_id);
        
      // Build bar chart
      var trace1 = [
        {
          x: ten_values,
          y: ten_id,
          text: ten_labels,
          automargin: true,
          type: "bar",
          orientation: "h",
        }
      ];

      Plotly.newPlot("bar", trace1);

    });
  }

  //Function for bubble bar chart
  function bubbleChart(aParam) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var filteredData = samples.filter(sample => sample.id == aParam)[0];
      var id = filteredData.otu_ids;
      var label = filteredData.otu_labels;
      var value = filteredData.sample_values;

    // Build Bubble Chart
    var trace2 = [
        {
           x: id,
           y: value,
           text: label,
           mode: "markers",
           automargin: true,
           marker: {
            size: value,
            color: id,
            colorscale: 'Earth'
            // referenced from https://plotly.com/javascript/colorscales/
          }
        }
      ];

      Plotly.newPlot("bubble", trace2);
    });
  }

  function demographic(aParam) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      
      //Filter the data based on the ID/name given from samples
      var filteredData = metadata.filter(sample => sample.id == aParam)[0];
      
      // Grab a reference to the dropdown select element
      var sampleData = d3.select("#sample-metadata");
  
      // clear out existing input
      sampleData.html("");
  
      Object.entries(filteredData).forEach(([key, value]) => {
        sampleData.append("h5").text(`${key}: ${value}`);
      });
    });
  }

  function newValue(aParam) {
      barChart(aParam);
      bubbleChart(aParam);
      demographic(aParam);
      gaugeChart(aParam);
  }

  function gaugeChart(aParam) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      
      var filteredData = metadata.filter(sample => sample.id == aParam)[0];
  
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: filteredData.wfreq,
          automargin: true,
          type: "indicator",
          mode: "gauge+number"
        }
      ];
      
      var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
  
    });
  }