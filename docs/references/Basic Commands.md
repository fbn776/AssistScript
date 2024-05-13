## test
**Description:** <br/>A test command to check if AssistScript is working<br/>

**Syntax:**<br/>

`test`<br/>


**Example:**<br/>

```asrc
test
```

**Result:**<br/>

```asrc
AssistScript is working!
```

## print
`p` `display` `show` `echo` `log`<br/><br/>
**Description:** <br/>Prints the given message to the stdout<br/>

**Syntax:**<br/>

`print <message>`<br/>


**Example:**<br/>

```asrc
print "Hello, world!"
```

**Result:**<br/>

```asrc
"Hello, world!"
```

## help
`h`<br/><br/>
**Description:** <br/>Displays the help message for the given command.<br/>

**Syntax:**<br/>

`help <command>`<br/>


**Example:**<br/>

```asrc
help print
```

**Result:**<br/>

```asrc

 print 
┌──────
├ Aliases: p, display, show, echo, log
├ Prints the given message to the stdout
├ Syntax: print <message>
├ Example: print "Hello, world!"

```

## execute
`eval` `evaluate`<br/><br/>
**Description:** <br/>Takes in any number of commands and executes them sequentially and returns the last executed command's return. Useful when you want to run multiple commands sequentially<br/>

**Syntax:**<br/>

`eval <cmd1> <cmd2> ... <cmdN>`<br/>


**Example:**<br/>

```asrc
eval (set x 10) (set y 30) (print x = (get x)) (print y = (get y))
```

**Result:**<br/>

```asrc
x = 10
y = 30
```

