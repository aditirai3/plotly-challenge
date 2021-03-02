// Use the D3 library to read in `samples.json`
d3.json("samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.