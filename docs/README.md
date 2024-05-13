# Documentation

Welcome to the documentation for AssistScript.
This documentation will provide you with the information you need to get started.
AssistScript is a simple scripting language written in TypeScript as a fun project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Using JavaScript](#using-javascript)
    - [Using terminal](#using-terminal)
      - [REPL mode](#repl-mode)
      - [File mode](#file-mode)
- Language Reference
    - [Commands](#commands)
    - [Variables](#variables)
    - [Comments](#comments)
    - [Control Flow](#control-flow)
    - [Functions](#functions)
    - [Modules](#modules)
    - [Standard Library](#standard-library)

---

## Installation

AssistScript can be installed locally using the node package manager (npm).
The package is available at npm registry [here](https://www.npmjs.com/package/assistscript).

To install AssistScript, run the following command in your terminal:

```bash
npm i assistscript
```

This will install the package locally in your project.

To remove the package, run the following command:

```bash
npm uninstall assistscript
```

## Usage

AssistScript can be used in multiple ways.
You can integrate the language in your JavaScript code or use it as a
standalone program in the terminal.

### Using JavaScript

AssistScript exposes a simple API to run AssistScript code in your JavaScript code.
The `AssistScript` class is exported from the package and can be used to run AssistScript code.
In your JavaScript or TypeScript code, you can import the `AssistScript` class, which then needs to be instantiated to
run the code. You can then use the `execute` method which takes in a string and returns the output.

```ts
import {AssistScript} from 'assistscript';

const as = new AssistScript();
const output = as.execute('add 10 20');

console.log(output); // 30
```

### Using terminal

The AssistScript package comes with a command-line interface to run AssistScript codes.

It provides two modes

- REPL mode
- File mode

#### REPL mode

The REPL mode allows you to run commands interactively.
To run the REPL mode, you use the `-r` or `--repl` flag.

```bash
npx assistscript -r
```

Example:
```bash
❯ npx assistscript -r

REPL MODE: 
> add 10 20
30
> exit
REPL MODE END
```

#### File mode

The file mode allows you to run AssistScript files. AssistScript files have the `.asrc` extension.
You can run the file mode by providing the path to the file.

```bash
npx assistscript <path-to-file>
```

Example:
```bash
❯ npx assistscript ./path/to/file.asrc
```

## Language Reference

To get started with AssistScript, you need to understand the basic concepts of the language.


