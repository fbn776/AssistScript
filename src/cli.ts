#!/usr/bin/env node

import {Command} from "commander";
import fs from "fs";
import AssistScript from "./lang-core/AssistScript";
import ASBaseError from "./lang-core/errors/ASBaseError";
import readline from "readline";

const program = new Command();

program
    .name('aslangc')
    .description('The ASLang(AssistScript) runner')
    .version('1.0')
    .option('-r, --repl', 'Run the REPL mode')
    .argument('[file]', 'The AssistScript file to run')
    .action(async (file, options) => {
        if (file && options.repl) {
            console.error('Error: Cannot provide both a file and use the -r option simultaneously.');
            program.help();
        } else if (file) {
            await runFile(file);
        } else if (options.repl) {
            runRepl();
        } else {
            program.help();
        }
    })

const as = new AssistScript();


function runAssistScript(str: string) {
    try {
        const result = as.execute(str);
        if (result !== undefined)
            console.log(result);
    } catch (e) {
        if (e instanceof ASBaseError)
            console.error(e.prettify());
        else
            console.error(e);
    }
}

async function runFile(file: string) {
    try {
        const data = await fs.promises.readFile(file);
        const content = data.toString();
        runAssistScript(content);

    } catch (e) {
        // @ts-ignore
        console.error(`Error reading file '${file}'\n> ${e.message}`);
    }
}

function runRepl() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    console.log("REPL MODE: ");

    rl.prompt();
    rl.on('line', (line) => {
        let trimmed = line.trim();
        if (trimmed === 'exit') {
            rl.close();
            return;
        }

        if (trimmed === 'clear') {
            console.clear();
            rl.prompt();
            return;
        }

        runAssistScript(line);
        rl.prompt();

    }).on('close', () => {
        console.log("REPL MODE END")
        process.exit(0);
    });

}


program.parse(process.argv);