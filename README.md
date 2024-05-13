# <img height="40" src="./docs/assets/AS.png" width="40" alt="AssistScript logo"/> AssistScript

![NPM License](https://img.shields.io/npm/l/assistscript)
![NPM Version](https://img.shields.io/npm/v/assistscript)

AssistScript is a simple scripting(?) language that I made for fun.
Not very useful, but it's fun to play around with.
Initially started as a joke, and as time passed it became a fun project to work on.

The language is a straightforward, all you have to do is to specify a command and its arguments.
The basic syntax is:

```asrc
<command> <arg1> <arg2> ... <argN>
```

eg:

```asrc
add 10 20 40
```

Outputs 70

## Installation

You can install AssistScript using npm.

```bash
npm install -g assistscript
```

This installs the AssistScript CLI globally on your system.
If you don't want AssistScript to be installed globally,
you can omit the `-g` flag or use `npx` to run AssistScript without installing it.

## Demos

Want to see what the language can do? Check out the [demos🧪](./demos) directory for some examples.

These demos are simple programs that demonstrate the language's features. You can run them using the CLI.


For example, to run the `linear-search.asrc` demo:

```bash
aslangc ./demos/linear-search.asrc
```
Outputs
```text
Linear Search
9 found at position 3
```

## Usage

AssistScript can be used in multiple ways.
You can use it as a standalone program in the terminal using the AssistScript CLI,
or you can use it inside your JavaScript code.

### Using terminal

You can run AssistScript using the terminal. The AssistScript package comes with a command-line interface to run
AssistScript files. It also has a REPL mode to run commands interactively.

```bash
# Without installing the package
npx assistscript
```

OR

```bash
# Once the package is installed
aslangc
```

The above commands, once executed, will show the help menu for the CLI.

> 📝 You can interchangeably use `aslangc` and `assistscript` in the terminal.

#### REPL mode

You can run the REPL mode by using the `-r` or `--repl` flag.

```bash
aslangc -r
```

#### File Mode

You can run AssistScript(.asrc) files using the CLI by providing the path to the file.

```bash
aslangc <path-to-file>
```

### Using the API

You can also use AssistScript in your JavaScript code, for this AssistScript exposes a simple API.
The `AssistScript` class is the main class that you can use run AssistScript code.

```ts
import {AssistScript} from 'assistscript';

const as = new AssistScript();

// Prints 70
console.log(as.run('add 10 20 30'));
// Prints 50 <- (100 - 20 - (10 + 20))
console.log(as.run('sub 100 20 (add 10 20)'));
``` 

## Want to learn more?

Check out the [documentation📃](./docs/README.md) for more information on the language and its features.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.


