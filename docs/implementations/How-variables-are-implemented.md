# How are variables implemented in AssistScript?

Variables are an important part of any programming language. They are used to store data and manipulate them.

In AssistScript, you can create variables using `set` command and get them using `get` command.

Internally, this is done using the ContextProvider class.
The ContextProvider class is responsible for managing the state of the script, providing context to the commands, and
managing the loops.

The ContextProvider exposes a `storeService` object which is used to store and retrieve variables (arrays are also
variables).

The `storeService` object has the following methods:

- `setVariable(name: string, value: unknown, type?: DataType): void` - Sets a variable with the given name and value.
  The type parameter is optional and is used to specify the type of the variable. If not provided, the type is inferred.
- `getVariable(name: string): I_Var | undefined` - Gets the variable with the given name. If the variable does not exist,
  it returns undefined.
- `deleteVariable(name: string): boolean` - Deletes the variable with the given name. Returns true if the variable was
  deleted, false otherwise.
- `setArray(name: string, value: unknown[]): void` - Sets an array with the given name and value.
- `getArray(name: string): I_Arr | undefined` - Gets the array with the given name. If the array does not exist, it
  returns undefined.
- `deleteArray(name: string): boolean` - Deletes the array with the given name. Returns true if the array was deleted,
  false otherwise.
- `appendToArray(name: string, value: unknown): { success: boolean, message?: string }` - Appends a value to the array
  with the given name. Returns an object with a success property indicating if the operation was successful and an
  optional message property with an error message if the operation failed.

The `I_Var` and `I_Arr` interfaces are defined as follows:
```ts
interface I_Var {
  value: unknown | unknown[],
  type: DataType,
}

interface I_Arr {
  value: unknown[],
}
```

The variables are actually stored in a Map<String, I_Var>, and the arrays are stored in a Map<String, I_Arr>.

This is basically how variables are implemented in AssistScript.

## Read More

- [File structure](File-structure.md)
- [How loops are implemented](How-loops-are-implemented.md)

