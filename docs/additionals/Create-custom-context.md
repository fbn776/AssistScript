# Contexts

ContextProviders is a class that helps in connecting AssistScript code to the external js world.
It is responsible for providing the necessary context to the commands and scripts. It also helps in managing the state of the script, control executions, etc.

Loops state is also managed by the ContextProviders. It provides a way to break, continue, and return from the loops. 
It stops the loops from infinite execution and also provides a way to control the loop execution.

By default, if you haven't provided any ContextProvider, the default ContextProvider is used which is `BaseContextProvider`.

## Accessing ContextProvider

You can access the ContextProvider by using the `ctx` object. It is passed as the first argument to the command run functions. See [custom commands](Create-custom-commands.md).

## Creating custom context

You can create your custom ContextProvider by extending the `BaseContextProvider` class.

This new created class is passed to the `AssistScript` constructor. This way you can provide your custom context to the AssistScript.

### Example

```ts
import {BaseContextProvider, AssistScript} from 'assistscript';

class MyContextProvider extends BaseContextProvider {
    // Setting loop limit to 10000, so now each loop has a max iteration of 10000
    LOOP_LIMIT = 10000;
    
    // Other custom functions
}

const as = new AssistScript(new MyContextProvider());
```

Now `MyContextProvider` is used as the context provider for that instance of AssistScript.

Whenever you run any code using this instance of AssistScript, it will use the `MyContextProvider` as the context provider.

## Predefined properties and methods

- `stdout` - This is the standard out object. This by default contains the `print` method which prints the given string to the console.
- `LOOP_LIMIT: number` - This is the loop limit for the context provider. It is used to limit the number of iterations in a loop. By default, it is set to 1000. 
- `isBreakCalled: boolean` - This is a boolean flag that is set to true when the break is called in a loop. It is used to stop the loop execution.
- `isContinueCalled: boolean` - This is a boolean flag that is set to true when the continue is called in a loop. It is used to skip the current iteration and move to the next iteration.
- `isInLoop: boolean` - This is a boolean flag that is set to true when the loop is running. It is used to check if the current code is running inside a loop.
- `currentCommand` - Getter and setter for the current command. It is used to get/set the current command that is running.

## Read more

- [Creating custom commands](Create-custom-commands.md)
- [How loops works](../implementations/How-loops-are-implemented.md)
