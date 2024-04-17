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
                        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>';
                } catch (__) {}
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    return md.render(markdownText);
}

async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlText);
    await page.addStyleTag({ content: `
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    ` });

    const pdf = await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
        displayHeaderFooter: true,
        headerTemplate: async (pageNum) => {
            return `<div style="font-size: 12px; text-align: center;">
                        ${(pageNum === 1) ? firstPageTitle : title}
                    </div>`;
        },
        footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
    });

    await browser.close();
}


// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: `
//             <div style="font-size: 12px; text-align: center;">
//                 <span id="headerTitle"></span>
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     // Wait for the .pageNumber element to appear in the document
//     await page.waitForSelector('.pageNumber');

//     // Set the header title based on the page number
//     await page.evaluate((firstPageTitle, title) => {
//         const headerTitleElement = document.getElementById('headerTitle');
//         const currentPage = parseInt(document.querySelector('.pageNumber').textContent);
//         headerTitleElement.textContent = (currentPage === 1) ? firstPageTitle : title;
//     }, firstPageTitle, title);

//     await browser.close();
// }


// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: `
//             <div style="font-size: 12px; text-align: center;">
//                 <span id="headerTitle"></span>
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     // Set the header title based on the page number
//     await page.evaluate((firstPageTitle, title) => {
//         const headerTitleElement = document.getElementById('headerTitle');
//         const currentPage = parseInt(document.querySelector('.pageNumber').textContent);
//         headerTitleElement.textContent = (currentPage === 1) ? firstPageTitle : title;
//     }, firstPageTitle, title);

//     await browser.close();
// }


// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: async (pageNum) => {
//             if (pageNum === 1) {
//                 return `<div style="font-size: 12px; text-align: center;">${firstPageTitle}</div>`;
//             } else {
//                 return `<div style="font-size: 12px; text-align: center;">${title}</div>`;
//             }
//         },
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     await browser.close();
// }


// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: `
//             <div style="font-size: 12px; text-align: center;">
//                 ${firstPageTitle}
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
//         // Pass title and firstPageTitle as header/footer template options
//         headerTemplateWaitForSelector: '.header-title',
//         footerTemplateWaitForSelector: '.footer-pageNumber'
//     });

//     await browser.close();
// }

// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: (pageNum, totalPages, { title, firstPageTitle }) => `
//             <div style="font-size: 12px; text-align: center;">
//                 ${pageNum === 1 ? firstPageTitle : title}
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
//         // Pass title and firstPageTitle as header/footer template options
//         headerTemplateWaitForSelector: '.header-title',
//         footerTemplateWaitForSelector: '.footer-pageNumber'
//     }, { title, firstPageTitle });

//     await browser.close();
// }


// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: (pageNum, totalPages, { title, firstPageTitle }) => `
//             <div style="font-size: 12px; text-align: center;">
//                 ${pageNum === 1 ? firstPageTitle : title}
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
//         // Pass title and firstPageTitle as header/footer template options
//         headerTemplateWaitForSelector: '.header-title',
//         footerTemplateWaitForSelector: '.footer-pageNumber'
//     }, { title, firstPageTitle });

//     await browser.close();
// }



// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: (pageNum, totalPages) => `
//             <div style="font-size: 12px; text-align: center;">
//                 ${pageNum === 1 ? firstPageTitle : title}
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     await browser.close();
// }

// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: (pageNum) => `
//             <div style="font-size: 12px; text-align: center;">
//                 ${pageNum === 1 ? firstPageTitle : title}
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     await browser.close();
// }

// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: `
//             <div style="font-size: 12px; text-align: center;">
//                 <span>${firstPageTitle}</span>
//                 <script type="text/javascript">
//                     if (pageNumber > 1) {
//                         document.querySelector('span').textContent = '${title}';
//                     }
//                 </script>
//             </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     await browser.close();
// }

// async function htmlToPdf(htmlText, outputPath, title, firstPageTitle) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });

//     const pdf = await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '2cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         headerTemplate: `
//             <div style="font-size: 12px; text-align: center;">${firstPageTitle}</div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`
//     });

//     await browser.close();
// }




// async function htmlToPdf(htmlText, outputPath, title) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlText);
//     await page.addStyleTag({ path: 'github.css' }); // Path to the downloaded CSS file
//     await page.addStyleTag({ content: `
//         table {
//             width: 100%;
//             border-collapse: collapse;
//         }

//         th, td {
//             border: 1px solid #dddddd;
//             padding: 8px;
//             text-align: left;
//         }

//         th {
//             background-color: #f2f2f2;
//         }
//     ` });
//     await page.pdf({
//         path: outputPath,
//         format: 'A4',
//         margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
//         displayHeaderFooter: true,
//         // headerTemplate: `
//         //     <div style="font-size: 12px; padding: 5px;">
//         //         <span>${title}</span>
//         //     </div>`,
//         footerTemplate: `<div style="font-size: 12px; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
//         headerTemplateFirst: `
//             <div style="font-size: 12px; text-align: center;">
//                 <span>${title}</span>
//             </div>`
//     });

//     await browser.close();
// }


async function convertMarkdownToPdf(markdownText, outputPath) {
    try {
        const htmlText = await convertMarkdownToHtml(markdownText);
        const title = 'Consistent Title';
        const firstPageTitle = 'First Page Title';

        await htmlToPdf(htmlText, outputPath, title, firstPageTitle);
        console.log("PDF created successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage
const markdownText = `
  ## Code Examples

  Inline code: \`const example = 'Hello World!';\`

  \`\`\`javascript
  // Block code
  function greet(name) {
    return 'Hello, ' + name + '!';
  }
  greet('John');
  \`\`\`

  ## Example Markdown

This is a simple example of using \`react-markdown\` with \`remark-gfm\`.

- List item 1
- List item 2

| Name  | Age |
|-------|-----|
| John  | 25  |
| Alice | 30  |


## Data Representation

| Name   | Age | Status |
|--------|-----|--------|
| John   | 25  | Active |
| Alice  | 30  | Inactive |

- [x] Learn React
- [ ] Build a project
- [ ] Deploy to production


## Java Code Example

  \`\`\`java
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
  \`\`\`

  This is a *simple* example of using \`react-markdown\` with \`remark-gfm\`.

  - List item 1
  - List item 2

  \`\`\`javascript
  console.log('Hello, React!');
  \`\`\`


  ## Features

  | Feature        | Status |
  | -------------- | ------ |
  | Tables         | ✔️     |
  | Task Lists     | ✔️     |
  | Strikethrough  | ✔️     |


  


  ## Styling Text

  ~~Strikethrough~~ and **bold text** and *italic text*.

  Combination of **bold and _italic_** text.


  ### Ordered List

1. Item 1
2. Item 2
3. Item 3

### Unordered List

- Bullet 1
- Bullet 2
- Bullet 3




## HTML Content Example

    This is some HTML content:

    <div style="color: red;">
      <p>This is a paragraph with <strong>strong</strong> and <em>emphasized</em> text.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>



    ## Bash Syntax Highlighting Example

    This is some Bash code:

    \`\`\`bash
    #!/bin/bash

    echo "Hello, World!"

    for i in {1..5}
    do
      echo "Count: \$i"
    done
    \`\`\`


## Links and Images

[Visit OpenAI](https://www.openai.com/)

![React Logo](https://reactjs.org/logo-og.png)

  `;

// Example usage
const markdownText1 = `
# Hello, Markdown to PDF

This is a **sample** Markdown text.
`;

const outputPath = 'output.pdf';
convertMarkdownToPdf(markdownText, outputPath);
