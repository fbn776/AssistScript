import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder("Comparison");

// LESS THAN
store.addCommand(builder
    .names('lt', 'less-than')
    .args(2, DataType.number, DataType.number)
    .docs(new DocsBuilder()
        .name('lt')
        .aliases('less-than')
        .description('Checks if the first number is less than the second.')
        .syntax('lt <number> <number>')
        .example('lt 2 3') // true
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: number, b: number) => a < b)
    .build()
);

// LESS THAN OR EQUAL TO
store.addCommand(builder
    .names('lte', 'less-than-equal')
    .args(2, DataType.number, DataType.number)
    .docs(new DocsBuilder()
        .name('lte')
        .aliases('less-than-equal')
        .description('Checks if the first number is less than or equal to the second.')
        .syntax('lte <number> <number>')
        .example('lte 2 3') // true
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: number, b: number) => a <= b)
    .build()
)

// GREATER THAN
store.addCommand(builder
    .names('gt', 'greater-than')
    .args(2, DataType.number, DataType.number)
    .docs(new DocsBuilder()
        .name('gt')
        .aliases('greater-than')
        .description('Checks if the first number is greater than the second.')
        .syntax('gt <number> <number>')
        .example('gt 2 3') // false
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: number, b: number) => a > b)
    .build()
)

// GREATER THAN OR EQUAL TO
store.addCommand(builder
    .names('gte', 'greater-than-equal')
    .args(2, DataType.number, DataType.number)
    .docs(new DocsBuilder()
        .name('gte')
        .aliases('greater-than-equal')
        .description('Checks if the first number is greater than or equal to the second.')
        .syntax('gte <number> <number>')
        .example('gte 2 3') // false
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: number, b: number) => a >= b)
    .build()
)

// EQUALS
store.addCommand(builder
    .names('equals', 'eq', 'is')
    .args(2, DataType.any, DataType.any)
    .docs(new DocsBuilder()
        .name('equals')
        .aliases('e', 'is')
        .description('Checks if the two values are equal.')
        .syntax('equals <value> <value>')
        .example('equals 2 3') // false
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: any, b: any) => a === b)
    .build()
)

// NOT EQUALS
store.addCommand(builder
    .names('neq', 'not-equals', 'not-is')
    .args(2, DataType.any, DataType.any)
    .docs(new DocsBuilder()
        .name('neq')
        .aliases('not-equals', 'not-is')
        .description('Checks if the two values are not equal.')
        .syntax('neq <value> <value>')
        .example('neq 2 3') // true
        .build()
    )
    .returnType(DataType.boolean)
    .run((_, a: any, b: any) => a !== b)
    .build()
)