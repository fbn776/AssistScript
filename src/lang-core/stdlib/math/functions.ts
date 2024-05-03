import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import {DocsBuilder} from "../../specs/DocsBuilder";
import DataType from "../../specs/tokens/DataType";
import {gcd} from "./utils";
import ASRuntimeError from "../../errors/ASRuntimeError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// ABSOLUTE
store.addCommand(builder
    .names('abs', 'absolute')
    .docs(new DocsBuilder()
        .name('abs')
        .aliases('absolute')
        .description('Returns the absolute value of the given number.')
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
        .name('round')
        .description('Rounds the given number to the nearest integer.')
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
        .name('ceil')
        .aliases('ceiling')
        .description('Rounds the given number up to the nearest integer.')
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
        .name('floor')
        .description('Rounds the given number down to the nearest integer.')
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
        .name('truncate')
        .aliases('trunc')
        .description('Truncates the given number to the nearest integer towards zero.')
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
    .names('min', 'minimum')
    .docs(new DocsBuilder()
        .name('min')
        .aliases('minimum')
        .description('Returns the smallest number from the given numbers.')
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
    .names('max', 'maximum')
    .docs(new DocsBuilder()
        .name('max')
        .aliases('maximum')
        .description('Returns the largest number from the given numbers.')
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
        .name('clamp')
        .description('Clamps the given number within the given range.')
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
        .name('sign')
        .description(`Returns the sign of the given number.
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
    .names('pow', 'power')
    .docs(new DocsBuilder()
        .name('pow')
        .aliases('power')
        .description('Raises the first number to the power of the second number.')
        .syntax('pow <number1> <number2>')
        .example('pow 2 3')
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
        .name('sqrt')
        .aliases('root')
        .description('Calculates the square root of the given number.')
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
        .name('factorial')
        .aliases('fact')
        .description('Calculates the factorial of the given number.')
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
        .name('gcd')
        .aliases('hcf')
        .description('Calculates the greatest common divisor of the given numbers.')
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
        .name('lcm')
        .description('Calculates the least common multiple of the given numbers.')
        .syntax('lcm <number1> <number2> ...')
        .example('lcm 24 36')
        .build()
    )
    .returnType(DataType.number)
    .args(-2, DataType.number)
    .run((_, ...args: number[]) => {
        if (args.length < 2)
            throw new ASRuntimeError('At least 2 numbers are required for lcm', {
                state: _.currentState!,
                occurredCmd: _.currentCommand!,
            });

        let result = args[0]!;
        for (let i = 1; i < args.length; i++)
            result = result * args[i]! / gcd(result, args[i]!);

        return result;
    })
    .build()
)

// LOG2
store.addCommand(builder
    .names('log2')
    .docs(new DocsBuilder()
        .name('log2')
        .description('Calculates the base 2 logarithm of the given number.')
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
        .name('log10')
        .description('Calculates the base 10 logarithm of the given number.')
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
        .name('ln')
        .aliases('loge')
        .description('Calculates the natural logarithm of the given number.')
        .syntax('ln <number>')
        .example('ln 2.718')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.number)
    .run((_, a) => Math.log(a))
    .build()
)