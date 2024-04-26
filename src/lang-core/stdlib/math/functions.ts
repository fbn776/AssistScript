import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import {DocsBuilder} from "../../specs/DocsBuilder";
import DataType from "../../specs/tokens/DataType";
import {gcd} from "./utils";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// ABSOLUTE
store.addCommand(builder
    .names('abs', 'absolute')
    .docs(new DocsBuilder()
        .title('Absolute')
        .aliases('absolute')
        .body('Returns the absolute value of the given number.')
        .syntax('abs <number>')
        .example('abs -5')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.abs(a))
    .build()
)

// ROUND
store.addCommand(builder
    .names('round')
    .docs(new DocsBuilder()
        .title('Round')
        .body('Rounds the given number to the nearest integer.')
        .syntax('round <number>')
        .example('round 3.14')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.round(a))
    .build()
)

// CEIL
store.addCommand(builder
    .names('ceil', 'ceiling')
    .docs(new DocsBuilder()
        .title('Ceiling')
        .aliases('ceiling')
        .body('Rounds the given number up to the nearest integer.')
        .syntax('ceil <number>')
        .example('ceil 3.14')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.ceil(a))
    .build()
)

// FLOOR
store.addCommand(builder
    .names('floor')
    .docs(new DocsBuilder()
        .title('Floor')
        .body('Rounds the given number down to the nearest integer.')
        .syntax('floor <number>')
        .example('floor 3.14')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.floor(a))
    .build()
)

// TRUNCATE
store.addCommand(builder
    .names('truncate', 'trunc')
    .docs(new DocsBuilder()
        .title('Truncate')
        .aliases('trunc')
        .body('Truncates the given number to the nearest integer towards zero.')
        .syntax('truncate <number>')
        .example('truncate 3.14')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.trunc(a))
    .build()
)

// MIN
store.addCommand(builder
    .names('min')
    .docs(new DocsBuilder()
        .title('Minimum')
        .body('Returns the smallest number from the given numbers.')
        .syntax('min <number1> <number2> ...')
        .example('min 2 5 1 9 3')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => Math.min(...args))
    .build()
)

// MAX
store.addCommand(builder
    .names('max')
    .docs(new DocsBuilder()
        .title('Maximum')
        .body('Returns the largest number from the given numbers.')
        .syntax('max <number1> <number2> ...')
        .example('max 2 5 1 9 3')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args) => Math.max(...args))
    .build()
)

// CLAMP
store.addCommand(builder
    .names('clamp')
    .docs(new DocsBuilder()
        .title('Clamp')
        .body('Clamps the given number within the given range.')
        .syntax('clamp <number> <min> <max>')
        .example('clamp 5 1 10')
        .build()
    )
    .returnType(DataType.number)
    .args(3, DataType.number)
    .run((_, a, min, max) => Math.min(Math.max(a, min), max))
    .build()
)

// SIGN
store.addCommand(builder
    .names('sign')
    .docs(new DocsBuilder()
        .title('Sign')
        .body(`Returns the sign of the given number.
Returns 1 if positive else -1.
For positive 0 => +0
For negative 0 => -0`)
        .syntax('sign <number>')
        .example('sign -5')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.sign(a))
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

// LOG2
store.addCommand(builder
    .names('log2')
    .docs(new DocsBuilder()
        .title('Logarithm Base 2')
        .body('Calculates the base 2 logarithm of the given number.')
        .syntax('log2 <number>')
        .example('log2 8')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.log2(a))
    .build()
)

// LOG10
store.addCommand(builder
    .names('log10')
    .docs(new DocsBuilder()
        .title('Logarithm Base 10')
        .body('Calculates the base 10 logarithm of the given number.')
        .syntax('log10 <number>')
        .example('log10 100')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.log10(a))
    .build()
)

// LN
store.addCommand(builder
    .names('ln', 'loge')
    .docs(new DocsBuilder()
        .title('Natural Logarithm')
        .aliases('loge')
        .body('Calculates the natural logarithm of the given number.')
        .syntax('ln <number>')
        .example('ln 2.718')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.log(a))
    .build()
)