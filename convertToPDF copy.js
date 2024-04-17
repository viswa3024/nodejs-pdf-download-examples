// convertToPDF.js
const fs = require('fs');
const PDFDocument = require('pdfkit');

const markdownToPDF = (markdownContent, outputFilePath) => {
  const doc = new PDFDocument();

  // Pipe the PDF document to a writable stream
  const stream = fs.createWriteStream(outputFilePath);
  doc.pipe(stream);

  // Add Markdown content to the PDF document
  doc.text(markdownContent);

  // Finalize the PDF and close the stream
  doc.end();
  stream.on('finish', () => {
    console.log(`PDF file created: ${outputFilePath}`);
  });
};

// Example Markdown content
const markdownContent = `
# My Markdown Content

This is a sample Markdown content that will be converted to a PDF.
`;

// Output file path
const outputFilePath = 'markdown_to_pdf.pdf';

// Call the function with Markdown content and output file path
markdownToPDF(markdownContent, outputFilePath);
