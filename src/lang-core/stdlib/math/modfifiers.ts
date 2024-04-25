import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import {DocsBuilder} from "../../specs/DocsBuilder";
import DataType from "../../specs/tokens/DataType";

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