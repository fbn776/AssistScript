import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

store.addCommand(builder
    .names('if')
    .args(2, DataType.command, DataType.command)
    .docs(new DocsBuilder()
        .name('if')
        .description('Executes a command if the condition is true.')
        .syntax('if <condition> <command>')
        .example('TODO') // TODO
        .build()
    )
    .returnType(DataType.void)
    .run((_, condition: () => boolean, func: () => void) => {
        if (condition()) {
            func();
        }
    })
    .build()
)