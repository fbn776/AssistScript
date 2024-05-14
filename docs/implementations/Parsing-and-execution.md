# How AssistScript parses and executes code

AssistScript is a simple language that is straightforward to parse and execute.

The basic model of the AssistScript parser and runner is shown below.<br/>
<img src="../assets/assistscript_execution_diagram.svg"/>


Suppose we want to execute the following code:

```asrc
add 10 20 (sub 30 40)
```
Which is equivalent to `10 + 20 + (30 - 40) = 20`.


