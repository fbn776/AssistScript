# How to create custom commands

## Introduction

Commands like `add`, `sub`, `print` etc. are built-in commands in the language.
The source code for these commands is available at [stdlib](../../src/lang-core/stdlib).

If you want to add a custom command other than the one defined in the standard library,
you can do so by following the steps below:

> **NOTE**📒: This is available only when using AssistScript in your js/ts project.

## Steps

1. In your file import `AssistScript`.
   This is the main class that you will use to create custom commands.
   ```ts
   import {AssistScript} from 'assistscript';
   
   const as = new AssistScript();
   ```

2. Get the `store` object from the `AssistScript` object.
   ```ts
   const store = as.store;
   ```
   This gets the store object from the `AssistScript` object.
   The store is where all the commands are stored.

    3. Now import the `CommandBuilder`, `DataType`, `DocsBuilder` from `assistscript`.
       ```ts
       import {CommandBuilder, DataType, DocsBuilder} from 'assistscript';
       ```
       These are the tools you will use to create a custom command.

        - `CommandBuilder` A builder class to build commands decoratively. It is used by chaining methods.
          The methods are:
            - `names` - The name(s) of the command. If there are multiple names, then pass them as arguments.
            - `docs` - The documentation of the command. It takes in a `Documentation` object, which can be created
              using the `DocsBuilder` class.
            - `args` - The number of arguments the command takes and their types.
            - `returnType` - The return type of the command.
            - `run` - The function that will be executed when the command is called.
            - `build` - Builds the command. This method should be called at the end.
        - `DataType` - An enum that contains all the data types that can be used in the language.
            - `number` - Represents a number
            - `string` - Represents a string
            - `boolean` - Represents a boolean
            - `command` - Represents a command
            - `array` - Represents an array
            - `any` - Represents any type
            - `void` - Represents no type (used for `returnType`)
        - `DocsBuilder` - A builder class to build documentation decoratively. It is used by chaining methods.
            - `name` - The name of the command documentation, which mostly is the same as the command name.
            - `description` - The description of the command.
            - `syntax` - The syntax of the command.
            - `examples` - Examples of how the command can be used.
            - `build` - Builds the documentation. This method should be called at the end.

3. In general, the syntax is;

   ```ts
   store.addCommand(builder
       .names("<name of the command>")
       .docs(new DocsBuilder()
           .name("<name of the command>")
           .aliases(["<aliases of the commands...>"])
           .description("<description of the command>")
           .syntax("<syntax of the command>")
           .examples("<examples of the command>")
           .build()
       )
       .args(<no of arguments>, DataType.<types>, ...)
       .returnType(DataType.<type>)
       .run((ctx, <param1>, <param2>, ..., <paramN>) => {
           // Your code here
       })
       .build()
   );
   ```
    
    `ctx` is the context object. It holds a reference to the current ContextProvider.


## Example

```ts
import {AssistScript, CommandBuilder, DataType, DocsBuilder} from 'assistscript';

const as = new AssistScript();
const store = as.store;

store.addCommand(new CommandBuilder()
    .names('testcmd', 'anothername')
    .docs(new DocsBuilder()
        .name('testcmd')
        .aliases('anothername')
        .description('A test command, I created. This takes two string and prints it to the stdout')
        .syntax('testcmd <msg1> <msg2>')
        .examples('testcmd Hello There')
        .build()
    )
    .args(2, DataType.string, DataType.string)
    .returnType(DataType.number)
    .run((ctx, msg1, msg2) => {
        ctx.stdout.print(msg1 + ' ' + msg2);
    })
    .build()
);

```

This will create a command `testcmd` that takes two strings as arguments and prints them to the stdout.

You can now use it in your code like this:

```asrc
testcmd Hello There
```
Output:
```
Hello There
```

That's it! You have successfully created a custom command in AssistScript.

## Read more

- [Creating custom context](Create-custom-context.md)