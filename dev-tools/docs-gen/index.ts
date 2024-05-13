import {AssistScript, BaseContextProvider} from "../../src";
import fs from "fs";
import path from "node:path";

console.time('TIME');
console.log('STARTING');


let pathSrc = path.join(process.cwd(), 'docs/references/');

console.warn("\nPLEASE MAKE SURE TO REMOVE ANY PREVIOUS FILES IN THE 'docs/references' DIRECTORY\n");

class TestCtx extends BaseContextProvider {
    // To simulate the stdout, for taking the outputs of prints
    buffer: any[] = [];
    stdout = {
        print: (...msg: string[]) => {
            this.buffer.push(msg.join(' '));
        }
    }

    resetBuffer() {
        this.buffer = [];
    }
}

let ctx = new TestCtx();
let as = new AssistScript(ctx);
let store = as.store.getStore;

console.log("Getting commands...");

console.info("Total commands: ", store.size);

// For not storing the duplicate command names
let cmdSet = new Set<string>();
for (let [_, cmd] of store) {
    let docs = cmd.docs;
    cmdSet.add(docs.title); // For each command, only store its title from docs, this way we avoid alias duplication
}

console.info("Total unique commands: ", cmdSet.size);

// Used for categorizing the commands <category, markdown-string>
let categories = new Map<string, string>();
let toc = new Map<string, string[]>();

for (let name of cmdSet) {
    let cmd = as.store.getCommand(name);

    if (!cmd)
        continue;

    let docs = cmd.docs;
    let str = '';
    let cat = docs.category || 'Uncategorized';
    let final = categories.get(cat) || '';

    str += `## ${docs.title}\n`;

    if(!toc.has(cat)) {
        toc.set(cat, [docs.title]);
    } else {
        toc.get(cat)!.push(docs.title);
    }

    if (docs.aliases.length > 0) {
        let als = '';
        for (let alias of docs.aliases) {
            als += `\`${alias}\` `;
        }
        str += als.slice(0, als.length - 1) + '<br/><br/>\n';
    }
    str += `**Description:** <br/>${docs.body}<br/>\n\n`;

    if (docs.syntax)
        str += `**Syntax:**<br/>\n\n\`${docs.syntax}\`<br/>\n`;
    if (docs.example) {
        str += `\n\n**Example:**<br/>\n\n\`\`\`asrc
${docs.example}
\`\`\``;

        // Simulate the stdout, run the code and get the output
        ctx.resetBuffer();
        ctx.buffer.push(as.sandboxRun(docs.example));
        let buffer = ctx.buffer;
        // Filter out any undefined, null or empty strings
        buffer = buffer.filter((v) => v !== undefined && v !== null && v !== '');

        // If output exists, add it to the markdown
        if (buffer.length > 0) {
            str += `\n\n**Result:**<br/>\n\n\`\`\`asrc
${buffer.join('\n')}
\`\`\`\n`;
        }
        ctx.resetBuffer();
    }
    str += '\n';
    final += str;

    categories.set(cat, final);
}

console.warn("Writing the files...");
// Write the files
for (let [name, final] of categories) {
    let src = path.join(pathSrc, `${name}.md`);
    console.log("- ", src);
    fs.writeFileSync(src, final, "utf-8");
}

console.log("\nWriting the language reference file...");

let langRefFile = path.join(process.cwd(), 'docs/Language references.md');
let str = `# Language reference

## Table of contents
`;

for(let [cat, cmds] of toc) {
    str += `
- [${cat}](references/${encodeURIComponent(cat)}.md)`
    for(let cmd of cmds) {
        str += `
    - [${cmd}](references/${encodeURIComponent(cat)}.md#${encodeURIComponent(cmd)})`
    }
}

fs.writeFileSync(langRefFile, str, "utf-8");


console.log("Done!");
console.timeEnd('TIME');