const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const generateTemplate = (key, content) => {
    const dom = new JSDOM(content);
    const svg = dom.window.document.querySelector("svg");
      return `
        <ng-container *ngSwitchCase="${key}">
          ${svg.innerHTML}
        </ng-container>
      `;
}

fs.readdir(__dirname, {
    encoding: 'utf-8',
    withFileTypes: true,
}, (err, files) => {
    if (err) return console.error(err);
    const iconsets = [];

    for (const { name } of files) {
        if (typeof name == 'string' && name.includes('svg')) {
            const content = fs.readFileSync(path.resolve(__dirname, name), { encoding: 'utf-8' })
            iconsets.push(generateTemplate(name, content));
        }
    }

    fs.writeFileSync(path.resolve(__dirname, 'iconSets.tsx'), `
      <ng-container [ngSwitch]="{{name}}">
        ${iconsets.join(",")}
      </ng-container>
    `)
})
