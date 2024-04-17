const fs = require('fs');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const pdf = require('html-pdf');

async function convertMarkdownToHtml(markdownText) {
    const md = markdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (__) {}
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    return md.render(markdownText);
}

// Example Markdown content
const markdownContent = `
# My Markdown Content

This is a sample Markdown content that will be converted to PDF.
`;

// Output file path
const outputFilePath = 'markdown_to_pdf.pdf';

// Call the function with Markdown content
convertMarkdownToHtml(markdownContent)
  .then(html => {
    // Generate PDF from HTML
    pdf.create(html).toFile(outputFilePath, (err, res) => {
      if (err) {
        console.error('Error generating PDF:', err);
      } else {
        console.log('PDF file created:', res.filename);
      }
    });
  })
  .catch(error => {
    console.error('Error converting Markdown to HTML:', error);
  });
