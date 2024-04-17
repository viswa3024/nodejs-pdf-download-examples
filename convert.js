const markdownPdf = require("markdown-pdf");
const fs = require("fs");

// Read styles from external CSS file
const styles = fs.readFileSync("styles.css", "utf8");

const markdownContent = `
# Example Markdown Content

This is an example Markdown content.

- It supports lists
- **Bold** and *italic* text
- [Links](https://example.com)

Below is a styled table example:

<style>
${styles}
</style>

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;

const outputFilePath = "output.pdf";

markdownPdf({
  remarkable: {
    html: true,
    breaks: true,
    typographer: true
  }
}).from.string(markdownContent).to(outputFilePath, () => {
  console.log("PDF created successfully!");
});
