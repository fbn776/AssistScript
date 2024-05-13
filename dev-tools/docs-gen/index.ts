import {AssistScript, BaseContextProvider} from "../../src";
import fs from "fs";
import path from "node:path";


class TestCtx extends BaseContextProvider {
    buffer: any[] = [];

    LOOP_LIMIT = 1000;
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

console.log(as.sandboxRun('print help'))


let store = as.store.getStore;

let cmdSet = new Set<string>();

for (let [_, cmd] of store) {
    let docs = cmd.docs;

    cmdSet.add(docs.title)
}

let final = '';
for (let name of cmdSet) {
    let cmd = as.store.getCommand(name);
    if (!cmd)
        continue;
    let docs = cmd.docs;
    let str = '';

    str += `## ${docs.title}\n`;

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

        ctx.resetBuffer();
        ctx.buffer.push(as.sandboxRun(docs.example));
        let buffer = ctx.buffer;

        buffer = buffer.filter((v) => v !== undefined && v !== null && v !== '');

        if (buffer.length > 0) {
            str += `\n\n**Result:**<br/>\n\n\`\`\`asrc
${buffer.join('\n')}
\`\`\`\n`;
        }
        ctx.resetBuffer();
    }


    str += '\n';

    final += str;
    // console.log(str);
}
let pwd = process.cwd();
fs.writeFileSync(path.join(pwd, "output.md"), final, "utf-8");