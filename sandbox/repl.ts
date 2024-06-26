import readline from "readline";
import ASLangError from "../src/lang-core/errors/ASLangError";
import AssistScript from "../src/lang-core/AssistScript";
import sandboxRun from "../src/utils/sandboxRun";

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
            console.log(e.prettify())
        } else {
            console.log(e)
        }
    }

    rl.prompt();
}).on('close', () => {
    console.log("REPL MODE END")
    process.exit(0);
});


