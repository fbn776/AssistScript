import readline from "readline";
import {displayAST} from "./lang-core/lang_utils";
import generateSyntaxTree from "./lang-core/parser/generateSyntaxTree";
import ASLangError from "./lang-core/errors/ASLangError";

console.log("REPL MODE: ")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

rl.prompt();
rl.on('line', (line) => {
    try {
        displayAST(generateSyntaxTree(line));
    } catch (e) {
        if(e instanceof ASLangError) {
            console.log(e.display())
        } else {
            console.log(e)
        }
    }

    rl.prompt();
}).on('close', () => {
    console.log("REPL MODE END")
    process.exit(0);
});

