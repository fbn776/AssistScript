import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// ADDITION
store.addCommand(builder
    .names('add', 'sum', 'plus', 'addition')
    .docs(new DocsBuilder()
        .name('add')
        .aliases('sum', 'plus', 'addition')
        .description('Adds the given numbers together and returns the result.')
        .syntax('add <number1> <number2> ...')
        .example('add 1 2 3 4 5')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => args.reduce((acc, curr) => acc + curr, 0))
    .build()
)

// SUBTRACTION
store.addCommand(builder
    .names('subtract', 'sub', 'minus', 'subtraction')
    .docs(new DocsBuilder()
        .name('sub')
        .aliases('sub', 'minus', 'subtraction')
        .description('Subtracts the given numbers and returns the result.')
        .syntax('subtract <number1> <number2> ...')
        .example('subtract 10 5 2')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => args.reduce((acc, curr) => acc - curr))
    .build()
)

// MULTIPLICATION
store.addCommand(builder
    .names('multiply', 'mult', 'mul', 'product', 'multiplication')
    .docs(new DocsBuilder()
        .name('mult')
        .aliases('multiply', 'mul', 'product', 'multiplication')
        .description('Multiplies the given numbers and returns the result.')
        .syntax('multiply <number1> <number2> ...')
        .example('multiply 2 3 4')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => args.reduce((acc, curr) => acc * curr, 1))
    .build()
)

// DIVISION
store.addCommand(builder
    .names('divide', 'div', 'division')
    .docs(new DocsBuilder()
        .name('div')
        .aliases('divide', 'division')
        .description('Divides the given numbers and returns the result.')
        .syntax('divide <number1> <number2> ...')
        .example('divide 10 2 2')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => args.reduce((acc, curr) => acc / curr))
    .build()
)

// MODULO
store.addCommand(builder
    .names('modulo', 'mod', 'remainder')
    .docs(new DocsBuilder()
        .name('mod')
        .aliases('modulo', 'remainder')
        .description('Calculates the remainder of the division of the given numbers.')
        .syntax('modulo <number1> <number2>')
        .example('modulo 10 3')
        .build()
    )
    .returnType(DataType.number)
    .args(2, DataType.number)
    .run((_, a, b) => a % b)
    .build()
)
