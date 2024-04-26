import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import {gcd} from "./utils";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// ADDITION
store.addCommand(builder
    .names('add', 'sum', 'plus', 'addition')
    .docs(new DocsBuilder()
        .title('Addition')
        .aliases('sum', 'plus', 'addition')
        .body('Adds the given numbers together and returns the result.')
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
        .title('Subtraction')
        .aliases('sub', 'minus', 'subtraction')
        .body('Subtracts the given numbers and returns the result.')
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
        .title('Multiplication')
        .aliases('mul', 'product', 'multiplication')
        .body('Multiplies the given numbers and returns the result.')
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
        .title('Division')
        .aliases('div', 'division')
        .body('Divides the given numbers and returns the result.')
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
        .title('Modulo')
        .aliases('mod', 'remainder')
        .body('Calculates the remainder of the division of the given numbers.')
        .syntax('modulo <number1> <number2>')
        .example('modulo 10 3')
        .build()
    )
    .returnType(DataType.number)
    .args(2, DataType.number)
    .run((_, a, b) => a % b)
    .build()
)
