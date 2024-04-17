const markdownpdf = require("markdown-pdf");
const fs = require("fs");

const inputFilePath = "example.md";
const outputFilePath = "output.pdf";

markdownpdf().from(inputFilePath).to(outputFilePath, () => {
  console.log("PDF created successfully!");
});
