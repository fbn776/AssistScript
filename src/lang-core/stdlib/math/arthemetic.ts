import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import ASRuntimeError from "../../errors/ASRuntimeError";
import BaseContextProvider from "../../services/BaseContextProvider";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

function checkForErrors(_: BaseContextProvider, variable: any) {
    const value = _.storeService.getVariable(variable);

    if (!value)
        throw new ASRuntimeError(`Variable '${variable}' not found.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand!,
        })

    if (value.type !== DataType.number)
        throw new ASRuntimeError(`Variable '${variable}' is not a number.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand!,
        })

    if (value.isArray)
        throw new ASRuntimeError(`Variable '${variable}' is an array.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand!,
        })
    return value;
}

store.addCommand(builder
    .names('incr', 'increment')
    .docs(new DocsBuilder()
        .name('incr')
        .aliases('increment')
        .description('Increments the given variable by 1.')
        .syntax('incr <varname>')
        .example('incr i')
        .build()
    )
    .args(1, DataType.string)
    .returnType(DataType.number)
    .run((_, variable) => {
        const value = checkForErrors(_, variable);

        _.storeService.setVariable(variable, value.value as number + 1);
        return value.value as number + 1;
    })
    .build()
)

store.addCommand(builder
    .names('decr', 'decrement')
    .docs(new DocsBuilder()
        .name('decr')
        .aliases('decrement')
        .description('Decrements the given variable by 1.')
        .syntax('decr <varname>')
        .example('decr i')
        .build()
    )
    .args(1, DataType.string)
    .returnType(DataType.number)
    .run((_, variable) => {
        const value = checkForErrors(_, variable);

        _.storeService.setVariable(variable, value.value as number - 1);
        return value.value as number - 1;
    })
    .build()
)

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
