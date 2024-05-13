import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import {isNameValid} from "../../utils/lang_utils";
import ASRuntimeError from "../../errors/ASRuntimeError";
import BaseContextProvider from "../../services/BaseContextProvider";
import {I_Arr} from "../../services/VariableStore";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

function checkForNameError(name: string, _: BaseContextProvider) {
    if (!isNameValid(name))
        throw new ASRuntimeError(`Invalid variable name: ${name}. The variable name should only contain letters, numbers, underscores and hyphens. And should not start with a number.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand?.params[0]!
        });
}

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
        checkForNameError(name, _);
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
        return _.storeService.deleteVariable(name);
    })
    .build()
)

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

    return value;
}

// INCREMENT
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

// DECREMENT
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

/** Checks if the array exists and if the index is within bounds, if not throws the necessary errors*/
function checkArrayNameAndIndex(array: I_Arr | undefined, name: string, _: BaseContextProvider, index?: number) {
    if (!array)
        throw new ASRuntimeError(`Array '${name}' does not exist.`, {
            state: _.currentState!,
            occurredCmd: _.currentCommand?.params[0]!,
        });

    if (index)
        if (index < 0 || index >= array.value.length)
            throw new ASRuntimeError(`Index ${index} out of bounds for array '${name}' of length ${name.length}.`, {
                state: _.currentState!,
                occurredCmd: _.currentCommand?.params[1]!,
            });
}

// ARRAY CREATE
store.addCommand(builder
    .names('array', 'arr')
    .docs(new DocsBuilder()
        .name('array')
        .aliases('arr')
        .description('Creates a new array and stores it. If the array name already exists, it overwrites the existing one.')
        .syntax('array <array-name> <value1> <value2> ...')
        .example('array arr 1 2 3 4')
        .build()
    )
    .returnType(DataType.array)
    .args(-2, DataType.string, DataType.any)
    .run((_, name: string, ...values: unknown[]) => {
        checkForNameError(name, _);
        _.storeService.setArray(name, values);
        return values;
    })
    .build()
)

// ARRAY GET
store.addCommand(builder
    .names('get-arr', 'getarr', 'array-get')
    .docs(new DocsBuilder()
        .name('get-arr')
        .aliases('getarr', 'array-get')
        .description('Returns the array stored in the variable.')
        .syntax('get-arr <array-name>')
        .example('(array arr 1 2 3) (get-arr arr)')
        .build()
    )
    .returnType(DataType.array)
    .args(1, DataType.string)
    .run((_, name: string) => {
        const array = _.storeService.getArray(name);
        if (array)
            return array.value;

        checkArrayNameAndIndex(array, name, _);
    })
    .build()
)

// ARRAY GET ELEM AT
store.addCommand(builder
    .names('index')
    .docs(new DocsBuilder()
        .name('index')
        .description('Returns the value at the given index of the array.')
        .syntax('index <array-name> <index>')
        .example('(array arr 1 2 3 4) (index arr 2)')
        .build()
    )
    .returnType(DataType.any)
    .args(2, DataType.string, DataType.number)
    .run((_, name: string, index: number) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _, index);

        return array!.value[index];
    })
    .build()
)

// SET ELM AT INDEX
store.addCommand(builder
    .names('setarr', 'setat', 'set-arr', 'set-at')
    .docs(new DocsBuilder()
        .name('setarr')
        .aliases('setat', 'set-arr', 'set-at')
        .description('Sets the value at the given index of the array.')
        .syntax('setarr <array-name> <index> <value>')
        .example('(array arr 1 2 3 4) (setarr arr 2 10)')
        .build()
    )
    .returnType(DataType.any)
    .args(3, DataType.string, DataType.number, DataType.any)
    .run((_, name: string, index: number, value: unknown) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _, index);

        array!.value[index] = value;
        _.storeService.setArray(name, array!.value);

        return value;
    })
    .build()
)

// ARRAY LENGTH
store.addCommand(builder
    .names('length', 'len', 'arr-length')
    .docs(new DocsBuilder()
        .name('length')
        .aliases('len', 'arr-length')
        .description('Returns the length of the array.')
        .syntax('length <array-name>')
        .example('(array arr 1 2 3 4) (length arr)')
        .build()
    )
    .returnType(DataType.number)
    .args(1, DataType.string)
    .run((_, name: string) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _);

        return array!.value.length;
    })
    .build()
)

// ARRAY DELETE
store.addCommand(builder
    .names('delete-arr', 'deletearr', 'del-arr', 'delarr')
    .docs(new DocsBuilder()
        .name('delete-arr')
        .aliases('deletearr', 'del-arr', 'delarr')
        .description('Deletes the array.')
        .syntax('delete-arr <array-name>')
        .example('(array arr 1 2 3 4) (delete-arr arr)')
        .build()
    )
    .returnType(DataType.boolean)
    .args(1, DataType.string)
    .run((_, name: string) => {
        return _.storeService.deleteArray(name);
    })
    .build()
)

// ARRAY APPEND
store.addCommand(builder
    .names('append', 'append-arr', 'appendarr')
    .docs(new DocsBuilder()
        .name('append')
        .aliases('append-arr', 'appendarr')
        .description('Appends the value to the end of the array.')
        .syntax('append <array-name> <value>')
        .example('(array arr 1 2 4 5) (append arr 10)')
        .build()
    )
    .returnType(DataType.any)
    .args(2, DataType.string, DataType.any)
    .run((_, name: string, value: unknown) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _);

        array!.value.push(value);
        _.storeService.setArray(name, array!.value);

        return value;
    })
    .build()
)

// ARRAY POP
store.addCommand(builder
    .names('pop', 'pop-arr', 'poparr')
    .docs(new DocsBuilder()
        .name('pop')
        .aliases('pop-arr', 'poparr')
        .description('Removes and returns the last element of the array.')
        .syntax('pop <array-name>')
        .example('(array arr 1 2 4 5) (pop arr)')
        .build()
    )
    .returnType(DataType.any)
    .args(1, DataType.string)
    .run((_, name: string) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _);

        let val = array!.value.pop();
        _.storeService.setArray(name, array!.value);
        return val;
    })
    .build()
)

// ARRAY INSERT
store.addCommand(builder
    .names('insert', 'insert-arr', 'insertarr')
    .docs(new DocsBuilder()
        .name('insert')
        .aliases('insert-arr', 'insertarr')
        .description('Inserts the value at the given index of the array.')
        .syntax('insert <array-name> <index> <value>')
        .example('(array arr 1 2 4 5) (insert arr 2 10)')
        .build()
    )
    .returnType(DataType.any)
    .args(3, DataType.string, DataType.number, DataType.any)
    .run((_, name: string, index: number, value: unknown) => {
        const array = _.storeService.getArray(name);
        checkArrayNameAndIndex(array, name, _, index);

        array!.value.splice(index, 0, value);
        _.storeService.setArray(name, array!.value);

        return value;
    })
    .build()
)