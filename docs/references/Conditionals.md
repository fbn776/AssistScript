## if
**Description:** <br/>Executes a command if the condition is true.<br/>

**Syntax:**<br/>

`if <condition> <command>`<br/>


**Example:**<br/>

```asrc
if (lt 10 20) (print 10 < 20)
```

**Result:**<br/>

```asrc
10 < 20
```

## if-else
`ife`<br/><br/>
**Description:** <br/>Executes a command if the condition is true, otherwise executes another command.<br/>

**Syntax:**<br/>

`if <condition> <command> else <command>`<br/>


**Example:**<br/>

```asrc
if (lt 10 20) (print 10 < 20) else (print 10 >= 20)
```

**Result:**<br/>

```asrc
ASRuntimeError
Reason: The command 'if' expects 2 arguments, but found 4.

if (lt 10 20) (print 10 < 20) else (print 10 >= 20)
└> if <-- Here
   ├>lt
     ├ 10
     ├ 20
   ├>print
     ├ 10
     ├ <
     ├ 20
   ├ else
   ├>print
     ├ 10
     ├ >=
     ├ 20

```

