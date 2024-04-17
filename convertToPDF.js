const fs = require('fs');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const PDFDocument = require('pdfkit');

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

    // Convert Markdown to HTML
    const htmlContent = md.render(markdownText);

    // Include custom CSS styles within the HTML content
    const styledHtmlContent = `
        <html>
            <head>
                <style>
                    /* Add your custom CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    h1, h2, h3 {
                        color: #333;
                        font-weight: bold;
                    }
                    pre {
                        background-color: #f4f4f4;
                        padding: 10px;
                        border-radius: 5px;
                    }
                    /* Add more styles as needed */
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
        </html>
    `;

    return styledHtmlContent;
}

async function convertMarkdownToPDF(markdownText, outputFilePath) {
    const doc = new PDFDocument();

    // Convert Markdown to styled HTML
    const styledHtmlContent = await convertMarkdownToHtml(markdownText);

    // Pipe the PDF document to a writable stream
    const stream = fs.createWriteStream(outputFilePath);
    doc.pipe(stream);

    // Add HTML content to the PDF document
    doc.end(styledHtmlContent);
    stream.on('finish', () => {
        console.log(`PDF file created: ${outputFilePath}`);
    });
}

// Example Markdown content
const markdownContent = `
# My Markdown Content

This is a sample Markdown content that will be converted to PDF.
`;

// Output file path
const outputFilePath = 'markdown_to_pdf.pdf';

// Call the function with Markdown content and output file path
convertMarkdownToPDF(markdownContent, outputFilePath);
