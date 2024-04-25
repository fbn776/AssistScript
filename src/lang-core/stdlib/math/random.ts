import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// RANDOM
store.addCommand(builder
    .names('random', 'rand', 'randf')
    .docs(new DocsBuilder()
        .title('Random')
        .aliases('rand', 'randf')
        .body('Returns a random float between the specified ranges (optional). If no range is given then random float b/w 0 and 1, if one is specified number b/w 0 and that num.')
        .syntax('random <min?> <max?>')
        .example('random 5 10')
        .build()
    )
    .args(-1, DataType.number)
    .returnType(DataType.number)
    .run((_, a: number | null, b: number | null) => {
        if(a && b)
            return Math.random() * (b - a) + a;
        else if(a)
            return Math.random() * a;
        else
            return Math.random();
    })
    .build()
)

// RANDOM INT
store.addCommand(builder
    .names('randomInt', 'randInt', 'randi')
    .docs(new DocsBuilder()
        .title('Random Integer')
        .aliases('randInt', 'randi')
        .body('Returns a random integer between the specified ranges (optional). If no range is given then random integer b/w 0 and 1, if one is specified number b/w 0 and that num.')
        .syntax('randomInt <min?> <max?>')
        .example('randomInt 5 10')
        .build()
    )
    .args(-1, DataType.number)
    .returnType(DataType.number)
    .run((_, a: number | null, b: number | null) => {
        if(a && b)
            return Math.floor(Math.random() * (b - a + 1) + a);
        else if(a)
            return Math.floor(Math.random() * a);
        else
            return Math.floor(Math.random());
    })
    .build()
)

// RANDOM BOOL
store.addCommand(builder
    .names('randomBool', 'randBool', 'randb')
    .docs(new DocsBuilder()
        .title('Random Boolean')
        .aliases('randBool', 'randb')
        .body('Returns a random boolean value.')
        .syntax('randomBool')
        .example('randomBool')
        .build()
    )
    .args(0)
    .returnType(DataType.boolean)
    .run(() => Math.random() < 0.5)
    .build()
)

// RANDOM CHAR
store.addCommand(builder
    .names('randomChar', 'randChar', 'randc')
    .docs(new DocsBuilder()
        .title('Random Character')
        .aliases('randChar', 'randc')
        .body('Returns a random character from the ASCII table.')
        .syntax('randomChar')
        .example('randomChar')
        .build()
    )
    .args(0)
    .returnType(DataType.string)
    .run(() => String.fromCharCode(Math.floor(Math.random() * 256)))
    .build()
)