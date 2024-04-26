import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import BaseContextProvider from "../../services/BaseContextProvider";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

store.addCommand(builder
    .names('set', 'set-variable', 'var')
    .docs(new DocsBuilder()
        .name('set')
        .aliases('set-variable', 'var')
        .description('Creates a new variable or updates an existing one.')
        .syntax('set <variable> <value>')
        .example('set x 5')
        .build()
    )
    .returnType(DataType.void)
    .args(2, DataType.string, DataType.any)
    .run((_, name: string, value: unknown) => {
        const ctx = _ as BaseContextProvider;
        console.log(ctx);
        console.log("Setting variable", name, value, "typeof name", typeof name, "typeof value", typeof value)

        ctx.storeService.setVariable(name, value, DataType.any);
    })
    .build()
);