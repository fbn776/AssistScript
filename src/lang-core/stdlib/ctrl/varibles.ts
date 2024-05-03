import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import {isNameValid} from "../../utils/lang_utils";
import ASRuntimeError from "../../errors/ASRuntimeError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// SET
store.addCommand(builder
    .names('set', 'set-variable', 'var')
    .docs(new DocsBuilder()
        .name('set')
        .aliases('set-variable', 'var')
        .description('Used to create a new variable, if the variable name already exits it updates the existing one.')
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

// GET
store.addCommand(builder
    .names('get', 'get-variable')
    .docs(new DocsBuilder()
        .name('get')
        .aliases('get-variable')
        .description('Returns the value of a variable.')
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

        throw new ASRuntimeError(`Variable ${name} does not exist.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand?.params[0]!,
        });
    })
    .build()
);

// DELETE
store.addCommand(builder
    .names('delete', 'delete-variable')
    .docs(new DocsBuilder()
        .name('delete')
        .aliases('delete-variable')
        .description('Deletes a variable. Returns true if the variable existed and is deleted, false otherwise.')
        .syntax('delete <variable-name>')
        .example('delete x')
        .build()
    )
    .returnType(DataType.boolean)
    .args(1, DataType.string)
    .run((_, name: string) => {
        let hasVar = _.storeService.exists(name);
        _.storeService.deleteVariable(name);
        return hasVar;
    })
    .build()
)
