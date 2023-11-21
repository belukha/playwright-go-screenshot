const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const srcPath = path.join(__dirname, "../../src");

const files = [
  {
    name: "index.html.mustache",
    content: (name) => `<html>
  <head>
    <link rel="stylesheet" href="../common_assets/index.css" />
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div class="content">
      <h1 class="title">{{ title }}</h1>
    </div>
  </body>
</html>`,
  },
  {
    name: "index.stories.js",
    content: (name) => `import template from "./index.html.mustache?raw";
import mustache from "mustache";
import "./index.css";

export default {
  title: "${name}",
};

export const ${name.toUpperCase()} = {
  title: "${name.toUpperCase()}",
  render: ({ title }) => {
    return mustache.render(template, { title });
  },
  argTypes: {
    title: { control: "text" },
  },
  args: {
    title: "Aviasales",
  },
};`,
  },
  {
    name: "index.css",
    content: () => `@import "../common_assets/index.css";

.title {
  color: #fff;
}`,
  },
];

function createDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Directory created: ${directory}`);
  } else {
    console.log(`Directory already exists: ${directory}`);
  }
}

function createFiles(directory, files, template) {
  files.forEach((file) => {
    const filePath = path.join(directory, file.name);
    fs.writeFileSync(filePath, file.content(template), "utf8");
    console.log(`File created: ${filePath}`);
  });
}

inquirer
  .prompt({
    name: "template",
    type: "input",
    message: "Введите название шаблона",
  })
  .then((answer) => {
    const template = answer.template;
    const templatePath = path.join(srcPath, template);
    const templateExists = fs.existsSync(templatePath);
    if (templateExists) {
      console.log(`Template already exists: ${templatePath}`);
    } else {
      createDirectory(templatePath);
      createFiles(templatePath, files, template);
    }
  });
