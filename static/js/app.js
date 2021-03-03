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
      
      // Grab the first sample from the list to initiate
    //   var firstName = name[0];
    //   console.log(firstName)

      //Define chart functions
      barChart();
      bubbleChart();
      metadata();
      gaugeChart();

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
      var otu_ids = filteredData.otu_ids;
      var otu_labels = filteredData.otu_labels;
      var sample_values = filteredData.sample_values;

      //console check
    //   console.log(otu_ids);
    //   console.log(otu_labels);
    //   console.log(sample_values);
    
      // Slice the first 10 objects for plotting
      // sort in descending order
      var ten_values = sample_values.slice(0, 10).reverse();
      var ten_labels = otu_labels.slice(0, 10).reverse();
      // Add OTU label to each ID  
      var ten_id = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();

      //check data on console
    //   console.log(filteredData);
    //   console.log(top10sv);
    //   console.log(top10ol);
    //   console.log(top10oid);
        
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
      var otu_ids = filteredData.otu_ids;
      var otu_labels = filteredData.otu_labels;
      var sample_values = filteredData.sample_values;

    // Build Bubble Chart
    var trace2 = [
        {
           x: otu_ids,
           y: sample_values,
           text: otu_labels,
           mode: "markers",
           automargin: true,
           marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
          }
        }
      ];

      Plotly.newPlot("bubble", trace2);
    });
  }

  function metadata(sampleData) {
    d3.json("samples.json").then((data) => {

      //Grab the data to use from the metadata in the json
      var metadata = data.metadata;
      
      //Filter the data based on the ID/name given from samples
      var filteredData = metadata.filter(sample => sample.id == sampleData)[0];

      //console check
      console.log(filteredData)
      
      // Grab a reference to the dropdown select element
      var demoPanel = d3.select("#sample-metadata");
  
      // clear any existing metadata
      demoPanel.html("");
  
      // Add each key and value pair to the panel
      Object.entries(filteredData).forEach(([key, value]) => {
        demoPanel.append("h5").text(`${key}: ${value}`);
      });
  
    });
  }

  function optionChanged(sampleData) {
    
      //Run functions based on the changed value in the select option
      hbarChart(sampleData);
      bubbleChart(sampleData);
      demoInfo(sampleData);
      gaugeChart(sampleData);
  }

  function gaugeChart(sampleData) {
    d3.json("samples.json").then((data) => {

      //Grab the data to use from the metadata in the json
      var metadata = data.metadata;
      
      //Filter the data based on the ID/name given from samples
      var filteredData = metadata.filter(sample => sample.id == sampleData)[0];
  
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