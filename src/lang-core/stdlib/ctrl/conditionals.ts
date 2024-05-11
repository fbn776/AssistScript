import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import ASRuntimeError from "../../errors/ASRuntimeError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// IF
store.addCommand(builder
    .names('if')
    .args(2, DataType.command, DataType.command)
    .docs(new DocsBuilder()
        .name('if')
        .description('Executes a command if the condition is true.')
        .syntax('if <condition> <command>')
        .example('if (lt 10 20) (print 10 < 20)')
        .build()
    )
    .returnType(DataType.void)
    .run((_, condition: () => boolean, func: () => void) => {
        if(condition())
            func();
    })
    .build()
)

// IF AND ELSE
store.addCommand(builder
    .names('if-else', 'ife')
    .args(4, DataType.command, DataType.command, DataType.string, DataType.command)
    .docs(new DocsBuilder()
        .name('if')
        .description('Executes a command if the condition is true, otherwise executes another command.')
        .syntax('if <condition> <command> else <command>')
        .example('if (lt 10 20) (print 10 < 20) else (print 10 >= 20)')
        .build()
    )
    .returnType(DataType.void)
    .run((_, condition: () => boolean, func1: () => void, str: string, func2: () => void) => {
        if(str !== 'else')
            throw new ASRuntimeError(`Expected 'else' but got '${str}'`, {
                state: _.currentState!,
                occurredCmd: _.currentCommand!,
            })

        if(condition())
            func1();
        else
            func2();
    })
    .build()
)
