const fs = require('fs');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const puppeteer = require('puppeteer');

async function convertMarkdownToHtml(markdownText) {
    const md = markdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {}
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    return md.render(markdownText);
}

async function htmlToPdf(htmlText, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlText);
    await page.pdf({ path: outputPath, format: 'A4' });

    await browser.close();
}

async function convertMarkdownToPdf(markdownText, outputPath) {
    try {
        const htmlText = await convertMarkdownToHtml(markdownText);
        await htmlToPdf(htmlText, outputPath);
        console.log("PDF created successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage
const markdownText = `
# Hello, Markdown to PDF

This is a **sample** Markdown text.

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
`;

const outputPath = 'output.pdf';
convertMarkdownToPdf(markdownText, outputPath);
