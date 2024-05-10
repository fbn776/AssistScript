import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import BaseContextProvider from "../../services/BaseContextProvider";
import ASGracefulExitError from "../../errors/ASGracefulExitError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// TODO
store.addCommand(builder
    .names('while')
    .args(2, DataType.command)
    .docs(new DocsBuilder()
        .name('while')
        .description('Loops while the condition is true.')
        .syntax('while <condition> <command>')
        .example('TODO') // TODO
        .build()
    )
    .returnType(DataType.void)
    .run((_, condition: () => boolean, command: () => unknown) => {
        const ctx = _ as BaseContextProvider;

        let limit = 0;
        while (condition()) {
            if(limit >= ctx.LOOP_LIMIT) {
                throw new ASGracefulExitError(`Loop limit of ${ctx.LOOP_LIMIT} exceeded.`);
            }

            command();
        }
    })
    .build()
)