# AssistScript <img height="32" src="./docs/assets/AS.png" width="32" alt="AssistScript logo"/>

AssistScript is a simple scripting(?) language that I made for fun.
Not very useful, but it's fun to play around with.
Initially started as a joke and as time passed it became a fun project to work on.

The language is very simple, all you have to do is to specify a command and its arguments.
And has a basic syntax as

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

## Usage

### Using terminal

You can run AssistScript using the terminal. The AssistScript package comes with a command-line interface to run
AssistScript files. It also has a REPL mode to run commands interactively.

```bash
# Without installing the package
npx assistscript;
```
OR
```bash
# Once the package is installed
aslangc
```

### Using the API

You can also use AssistScript in your JavaScript code, for this AssistScript exposes a simple API.
The `AssistScript` class is the main class that you can use run AssistScript code.

```ts
import {AssistScript } from 'assistscript';

const as = new AssistScript();

// Prints 70
console.log(as.run('add 10 20 30'));
``` 

## Want to learn more?

Check out the [documentation](./docs/README.md) for more information on the language and its features.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.


