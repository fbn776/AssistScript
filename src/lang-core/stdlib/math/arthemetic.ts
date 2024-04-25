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

// POWER
store.addCommand(builder
    .names('power', 'pow')
    .docs(new DocsBuilder()
        .title('Power')
        .aliases('pow')
        .body('Raises the first number to the power of the second number.')
        .syntax('power <number1> <number2>')
        .example('power 2 3')
        .build()
    )
    .returnType(DataType.number)
    .args(2, DataType.number)
    .run((_, a, b) => Math.pow(a, b))
    .build()
)

// SQUARE ROOT
store.addCommand(builder
    .names('sqrt', 'root')
    .docs(new DocsBuilder()
        .title('Square Root')
        .aliases('root')
        .body('Calculates the square root of the given number.')
        .syntax('sqrt <number>')
        .example('sqrt 9')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.sqrt(a))
    .build()
)

// FACTORIAL
store.addCommand(builder
    .names('factorial', 'fact')
    .docs(new DocsBuilder()
        .title('Factorial')
        .aliases('fact')
        .body('Calculates the factorial of the given number.')
        .syntax('factorial <number>')
        .example('factorial 5')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => {
        let result = 1;
        for (let i = 1; i <= a; i++) {
            result *= i;
        }
        return result;
    })
    .build()
)


// GCD
store.addCommand(builder
    .names('gcd', 'hcf')
    .docs(new DocsBuilder()
        .title('GCD')
        .aliases('hcf')
        .body('Calculates the greatest common divisor of the given numbers.')
        .syntax('gcd <number1> <number2> ...')
        .example('gcd 24 36')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args: number[]) => gcd(...args))
    .build()
)

// LCM
store.addCommand(builder
    .names('lcm')
    .docs(new DocsBuilder()
        .title('LCM')
        .body('Calculates the least common multiple of the given numbers.')
        .syntax('lcm <number1> <number2> ...')
        .example('lcm 24 36')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args: number[]) => {
        let result = args[0];
        for (let i = 1; i < args.length; i++) {
            result = result * args[i] / gcd(result, args[i]);
        }
        return result;
    })
    .build()
)

