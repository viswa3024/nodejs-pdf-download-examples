const markdownPdf = require("markdown-pdf");

const markdownContent = `
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

`;

const outputFilePath = "output.pdf";

markdownPdf().from.string(markdownContent).to(outputFilePath, () => {
  console.log("PDF created successfully!");
});
