## break
**Description:** <br/>Breaks out of the loop in which it is called.<br/>

**Syntax:**<br/>

`break`<br/>


**Example:**<br/>

```asrc

(set i 0)
(while (lt (get i) 10) (
    (if (eq (get i) 5) (
        (print i is 5)
        (break)
    ))
    
    (print (get i))    
    (incr i)    
))
```

**Result:**<br/>

```asrc
0
1
2
3
4
i is 5
```

## continue
**Description:** <br/>Skips the rest of the loop body and does the next iteration in which it is called.<br/>

**Syntax:**<br/>

`continue`<br/>


**Example:**<br/>

```asrc

(set i 0)
(while (lt (get i) 10) (
    (if (eq (get i) 5) (
        (print i is 5)
        (break)
    ))
    
    (print (get i))    
    (incr i)    
))
```

**Result:**<br/>

```asrc
0
1
2
3
4
i is 5
```

## while
**Description:** <br/>Loops while the condition is true.<br/>

**Syntax:**<br/>

`while <condition> <command>`<br/>


**Example:**<br/>

```asrc
while (TRUE) (
    (p (get i))
    (break)
)
```

**Result:**<br/>

```asrc
5
```

## repeat
**Description:** <br/>Repeats the given command n times.<br/>

**Syntax:**<br/>

`repeat <number> <command>`<br/>


**Example:**<br/>

```asrc
repeat 5 (print Hello, world!)
```

**Result:**<br/>

```asrc
Hello, world!
Hello, world!
Hello, world!
Hello, world!
Hello, world!
```

## for
**Description:** <br/>Loops through the given range. <init> is executed once at the beginning, <condition> is checked before each iteration, <increment> is executed at each iteration.<br/>

**Syntax:**<br/>

`for <init> <condition> <increment> <command>`<br/>


**Example:**<br/>

```asrc
for (set i 0) (lt (get i) 10) (incr i) (print i = (get i))
```

**Result:**<br/>

```asrc
i = 0
i = 1
i = 2
i = 3
i = 4
i = 5
i = 6
i = 7
i = 8
i = 9
```

