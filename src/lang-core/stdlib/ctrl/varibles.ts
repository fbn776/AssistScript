import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import {isNameValid} from "../../utils/lang_utils";
import ASRuntimeError from "../../errors/ASRuntimeError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

store.addCommand(builder
    .names('set', 'set-variable', 'var')
    .docs(new DocsBuilder()
        .name('set')
        .aliases('set-variable', 'var')
        .description('Creates a new variable or updates an existing one.')
        .syntax('set <variable-name> <value>')
        .example('set x 5')
        .build()
    )
    .returnType(DataType.any)
    .args(2, DataType.string, DataType.any)
    .run((_, name: string, value: unknown) => {
        if (!isNameValid(name))
            throw new ASRuntimeError(`Invalid variable name: ${name}. The variable name should only contain letters, numbers, underscores and hyphens. And should not start with a number.`, {
                state: _.currentState!,
                // params[0] is the variable name
                occurredCmd: _.currentCommand?.params[0]!
            });

        _.storeService.setVariable(name, value);

        return value;
    })
    .build()
);

store.addCommand(builder
    .names('get', 'get-variable')
    .docs(new DocsBuilder()
        .name('get')
        .aliases('get-variable')
        .description('Gets the value of a variable.')
        .syntax('get <variable-name>')
        .example('get x')
        .build()
    )
    .returnType(DataType.any)
    .args(1, DataType.string)
    .run((_, name: string) => {
        const variable = _.storeService.getVariable(name);
        if (variable)
            return variable.value;

        return null;
    })
    .build()
);