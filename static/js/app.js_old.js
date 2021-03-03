// Use the D3 library to read in `samples.json`
d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    // var data = importedData;

// // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// // Initializes the page with a default plot
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//  // Slice the first 10 objects for plotting
//   data = data.slice(0, 10)