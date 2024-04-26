import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// PI
store.addCommand(builder
    .names('pi', 'PI')
    .docs(new DocsBuilder()
        .name('pi')
        .aliases('PI')
        .body('Returns the mathematical constant π.')
        .syntax('pi')
        .example('pi')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.PI)
    .build()
)

// E
store.addCommand(builder
    .names('e', 'E')
    .docs(new DocsBuilder()
        .name('E')
        .aliases('e')
        .body('Returns the mathematical constant e.')
        .syntax('e')
        .example('e')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.E)
    .build()
)

// SQRT 2
store.addCommand(builder
    .names('sqrt2', 'root2')
    .docs(new DocsBuilder()
        .name('sqrt2')
        .aliases('root2')
        .body('Returns the square root of 2.')
        .syntax('sqrt2')
        .example('sqrt2')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.SQRT2)
    .build()
)

// LN2
store.addCommand(builder
    .names('ln2')
    .docs(new DocsBuilder()
        .name('ln2')
        .body('Returns the natural logarithm of 2.')
        .syntax('ln2')
        .example('ln2')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.LN2)
    .build()
)

// LN10
store.addCommand(builder
    .names('ln10')
    .docs(new DocsBuilder()
        .name('ln10')
        .body('Returns the natural logarithm of 10.')
        .syntax('ln10')
        .example('ln10')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.LN10)
    .build()
)

// LOG2E
store.addCommand(builder
    .names('log2e')
    .docs(new DocsBuilder()
        .name('log2e')
        .body('Returns the base 2 logarithm of e.')
        .syntax('log2e')
        .example('log2e')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.LOG2E)
    .build()
)

// LOG10E
store.addCommand(builder
    .names('log10e')
    .docs(new DocsBuilder()
        .name('log10e')
        .body('Returns the base 10 logarithm of e.')
        .syntax('log10e')
        .example('log10e')
        .build()
    )
    .args(0)
    .returnType(DataType.number)
    .run(() => Math.LOG10E)
    .build()
)