import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder("Logical Operators");

// AND
store.addCommand(builder
    .names('and')
    .args(2, DataType.boolean, DataType.boolean)
    .docs(new DocsBuilder()
        .name('and')
        .description('Checks if both conditions are true.')
        .syntax('and <boolean> <boolean>')
        .example('and true false') // false
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: boolean, b: boolean) => a && b)
    .build()
)

// OR
store.addCommand(builder
    .names('or')
    .args(2, DataType.boolean, DataType.boolean)
    .docs(new DocsBuilder()
        .name('or')
        .description('Checks if either condition is true.')
        .syntax('or <boolean> <boolean>')
        .example('or true false') // true
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: boolean, b: boolean) => a || b)
    .build()
)

// NOT
store.addCommand(builder
    .names('not')
    .args(1, DataType.boolean)
    .docs(new DocsBuilder()
        .name('not')
        .description('Negates the condition.')
        .syntax('not <boolean>')
        .example('not true') // false
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: boolean) => !a)
    .build()
)

// TRUE
store.addCommand(builder
    .names('TRUE')
    .args(0)
    .docs(new DocsBuilder()
        .name('TRUE')
        .description('Returns true.')
        .syntax('TRUE')
        .example('and (TRUE) (TRUE)')
        .build()
    )
    .returnType(DataType.boolean)
    .run(() => true)
    .build()
)

// FALSE
store.addCommand(builder
    .names('FALSE')
    .args(0)
    .docs(new DocsBuilder()
        .name('FALSE')
        .description('Returns false.')
        .syntax('FALSE')
        .example('FALSE')
        .build()
    )
    .returnType(DataType.boolean)
    .run(() => false)
    .build()
)
