import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

store.addCommand(builder
    .names('while')
    .args(2, DataType.command)
    .docs(new DocsBuilder()
        .name('while')
        .description('Loops while the condition is true.')
        .syntax('while <condition> <command>')
        .example('while {x < 5} {set x = {x + 1}}')
        .build()
    )
    .build()
)