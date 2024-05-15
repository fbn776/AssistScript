import fs from "fs";
import path from "node:path";

const start = path.join(process.cwd())

function getAllDirectories(path: string) {
    return fs.readdirSync(path)
        .filter((file: string) => fs.statSync(`${path}/${file}`).isDirectory());
}

let str = '';

function genTree(currPath: string, level: number) {
    if (
        currPath.includes('node_modules') ||
        currPath.includes('.idea') ||
        currPath.includes('.git') ||
        currPath.includes('.cache')
    )
        return;

    str += ' '.repeat(level * 2) + `${currPath.split(path.sep).pop()}\n`;
    let dirs = getAllDirectories(currPath);

    for (let dir of dirs) {
        genTree(path.join(currPath, dir), level + 1);
    }
}

genTree(start, 0);
console.log(str);

const url= 'https://tree.nathanfriend.io/';

console.log(`\n\n\nCopy the above text and paste it into the ${url} website to generate a tree view of the project.`)