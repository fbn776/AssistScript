# Documentation

Welcome to the documentation for AssistScript.
This documentation will provide you with the information you need to get started.
AssistScript is a simple scripting language written in TypeScript as a fun project.

## Table of Contents

- [General Overview](#general-overview)
    - [Commands](#commands)
    - [Chaining Commands](#chaining-commands)
    - [Multiple commands](#multiple-commands)
    - [Printing](#printing)
    - [Variables](#variables)
- [Language References](#language-references)
---

## General Overview

AssistScript is a simple scripting language that is straightforward to learn and use.
To use the language, you can need to learn the basic syntax of the language.

The basic syntax of AssistScript is as follows:

```asrc
<command> [arg1] [arg2] ... [argN]
```

Here, `<command>` is the command you want to execute,
and `[arg1]`, `[arg2]`, ... `[argN]` are the arguments for the command, they may or may not be optional.

For example:

```asrc
add 10 20 30
```

This command `add` will add the numbers `10`, `20`, and `30` and output the result `60`.

### Commands

In general, all the commands are written in lowercase, and the arguments are separated by spaces.
There are no operators like `+`, `-`, `*`, `/`, etc., for these you need to use commands.

Everything you do using the language should be of the form commands and its arguments.

For arithmetic operations, you can use the following commands:

| Maths | Commands |
|-------|----------|
| +     | add      |
| -     | sub      |
| *     | mult     |
| /     | div      |
| %     | mod      |

and more...

For example:

```asrc
add 10 20 30
```

translates to `10 + 20 + 30 = 60`.

### Chaining Commands

You can chain commands, i.e., you can use the output of one command as an input to another command.
This is done by the use of parenthesis.

In the language implementation, contents inside parenthesis are considered as command.
And each command should be enclosed inside a parenthesis.
By default, if there is only one command, then the bracket can be omitted.
E.g.:

```asrc
add 10 20
```

```asrc
(add 10 20)
```

These both are equivalent to each other.

For example, let's say you want to implement the following expression:

```
(10 + 20) * 30
```

Then you should use the `add` and `mult` commands.

```asrc
mult (add 10 20) 30
```

Here `(add 10 20)` is identified as a command,
and the command is taken as the first word that comes after the `(` and
its output is used as an input to the `mult` command.

`(add 10 20)` gets executed and returns `30`,
which is then used as an input to the `mult` command.
now `mult 30 30` gets executed and returns `900`.

You can chain any number of commands in this way.

Eg:

```text
10 + (20 * (10 / 2))
```

Is implemented as:

```asrc
add 10 (mult 20 (div 10 2))
```

### Multiple commands

By default, the language only supports one root command;
this is due to the implementation of the language uses a tree like structure to parse the commands.
To learn more about this, see [how the language works](../docs/implementations/Parsing%20and%20execution.md).

To overcome this, you can enclose each command inside a parenthesis and then space separate them like this.

```asrc
(<command1> [arg1] [arg2] ... [argN])
(<command2> [arg1] [arg2] ... [argN]) 
...
(<commandN> [arg1] [arg2] ... [argN])
```
Here each command is executed in the order they are written.
The final executed command's output is the output of the whole program.
The single root limitation is overcome by using the `eval` command.

Eg:
```asrc
(print hello) 
(print 10 + 20 = (add 10 20))
(print 10 * 20 = (mult 10 20))
```
Outputs:
```text
hello
10 + 20 = 30
10 * 20 = 200
```

### Printing

You can print values to the stdout using the `print` command.
```asrc
print <content>
```
For example:
```asrc
print hello there
```
Prints `hello there` to the stdout.

### Variables

You can use variables in the language. 
To define a variable, you can use the `set` command.
```asrc
set <variable-name> <value>
```

For example:
```asrc
set x 10
```
This creates a new variable, named `x` and assigns `10` to it.

To use the variable, you need to use the `get` command.
```asrc
get <variable-name>
```
For example:
```asrc
print x = (get x)
```
prints `x = 10` to stdout.


## Language References

To learn more about the language,
see the [Language References](Language%20references.md) section.

The above has the basic syntax and usage of different commands of the language.
