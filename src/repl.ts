import readline from "readline";
import {displayAST} from "./lang-core/utils/lang_utils";
import generateSyntaxTree from "./lang-core/interpreter/parser/generateSyntaxTree";
import ASLangError from "./lang-core/errors/ASLangError";
import LangTokenBase from "./lang-core/specs/tokens/LangTokenBase";
import CommandToken from "./lang-core/specs/tokens/lexmes/CommandToken";
import AssistScript from "./AssistScript";
import sandboxRun from "./utils/sandboxRun";

const as = new AssistScript();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

console.log("REPL MODE: ");
rl.prompt();
rl.on('line', (line) => {
    try {
        sandboxRun(as, line);
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


