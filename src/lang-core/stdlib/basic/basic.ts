import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import {prettyHelp} from "./utils";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// TEST
store.addCommand(builder
    .names('test')
    .directDocs('test', null, 'A test command to check if AssistScript is working', 'test', 'test')
    .args(0)
    .returnType(DataType.string)
    .run(() => 'AssistScript is working!')
    .build()
);

// PRINT
store.addCommand(builder
    .names('print', 'p', 'display', 'show', 'echo', 'log')
    .docs(new DocsBuilder()
        .name('print')
        .aliases('p', 'display', 'show', 'echo', 'log')
        .description('Prints the given message to the stdout')
        .syntax('print <message>')
        .example('print "Hello, world!"')
        .build())
    .args(-2, DataType.string)
    .returnType(DataType.void)
    .run((_, ...args) => {
        _.stdout.print(args.join(' '));
    })
    .build()
)

// HELP
store.addCommand(builder
    .names('help', 'h')
    .docs(new DocsBuilder()
        .name('help')
        .aliases('h')
        .description('Displays the help message for the given command.')
        .syntax('help <command>')
        .example('help print')
        .build())
    .args(-1, DataType.string)
    .returnType(DataType.void)
    .run((_, command: string) => {
        if(!command)
            return `Help commands helps you read the documentation of the given command.\n\nSyntax: help <command>`;

        const cmd = store.getCommand(command);

        if(!cmd)
            return `Command '${command}' not found.`;

        _.stdout.print(prettyHelp(cmd));
    })
    .build()
)

// EVAL
store.addCommand(builder
    .names('exec', 'execute', 'eval', 'evaluate')
    .docs(new DocsBuilder()
        .name('execute')
        .aliases('eval', 'evaluate')
        .description('Takes in any number of commands and executes them sequentially and returns the last executed command\'s return. Useful when you want to run multiple commands sequentially')
        .syntax('eval <cmd1> <cmd2> ... <cmdN>')
        .example('eval (set x 10) (set y 30) (print x = (get x)) (print y = (get y))')
        .build()
    )
    .args(-1, DataType.any)
    .returnType(DataType.any)
    .run((_, ...args: unknown[]) => {
        return args[args.length - 1]
    })
    .build()
);