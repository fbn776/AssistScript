import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

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
        .title('Print')
        .aliases('p', 'display', 'show', 'echo', 'log')
        .body('Prints the given message to the console.')
        .syntax('print <message>')
        .example('print "Hello, world!"')
        .build())
    .args(-2, DataType.string)
    .returnType(DataType.void)
    .run((_, ...args) => args.join(' '))
    .build()
)

// HELP
store.addCommand(builder
    .names('help', 'h', '?')
    .docs(new DocsBuilder()
        .title('Help')
        .aliases('h', '?')
        .body('Displays the help message for the given command.')
        .syntax('help <command>')
        .example('help print')
        .build())
    .args(1, DataType.string)
    .returnType(DataType.void)
    .run((_, command: string) => {
        //TODO: Implement help command
        const cmd = store.getCommand(command);
        if(!cmd)
            return `Command '${command}' not found.`;
        return cmd.docs.toString();
    })
    .build()
)