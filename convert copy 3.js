const markdownPdf = require("markdown-pdf");
const fs = require("fs");

const markdownContent = `
# Example Markdown Content

This is an example Markdown content.

- It supports lists
- **Bold** and *italic* text
- [Links](https://example.com)

Below is the React logo:

![React Logo](react-logo.png)
`;

const outputFilePath = "output.pdf";

async function downloadImage(url, filename) {
  const fetch = await import("node-fetch");
  const response = await fetch.default(url);
  const buffer = await response.buffer();
  fs.writeFileSync(filename, buffer);
}

const logoUrl = "https://reactjs.org/logo-og.png";
const logoFilename = "react-logo.png";

downloadImage(logoUrl, logoFilename)
  .then(() => {
    markdownPdf().from.string(markdownContent).to(outputFilePath, () => {
      console.log("PDF created successfully!");
    });
  })
  .catch((error) => {
    console.error("Error downloading image:", error);
  });
