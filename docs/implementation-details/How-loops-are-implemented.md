# How loops are implemented

Loops are control structures that are used to control the flow of execution the program.
They are used to loop over some set of commands, do repetitive tasks, etc.

In this doc file, I will explain the following control structures:

## LOOPS

Loops are important control structures that are used to repeat a block of code multiple times.
Since AssistScript runs on top of JavaScript, it was hard to get the controls for the loops right.

When we execute something like this:

```
(set i 0)
(while (lt (get i) 10) (
    (print (get i))    
    (incr i)    
))
```

<details>
<summary><b>Code explanation</b></summary>
<code>set i 0</code> Creates a new variable i to 0.<br/>

<code>while (lt (get i) 10)</code> This is the while loop, the condition being, i < 10 <br/>

<code>print (get i)</code> This prints the value of i. <br/>

<code>incr i</code> This increments the value of i by 1. <br/>
</details>

This while-loop loops from i = 0 to i = 9, printing the value of i each time.
Whenever `AssitScript` encounters a loop, it will do the following;

- A new counter is initiated, which is used to keep track of the number of iterations. This has a hard limit provided
  by `LOOP_LIMIT` of ContextProvider.
- Just before execution of the loop, the context provider is updated and sets `isInLoop = true`. This helps AssistScript
  to know that it is currently in a loop
- Then a loop is created to handle the actual looping behavior.
    1. Before each iteration, the counter is checked to see if it has reached the limit, if it has,
       then `ASGracefulExitError` is thrown
       and caught by the `AssistScript` runtime. This is done to prevent infinite loops. If not, the counter is
       incremented.
    2. Then two hooks are inserted at the start of the loop; The context provider has two loop controls, `isBreakCalled`
       and `isContinueCalled`, initially set to false.
       If `break` or `continue` is called, then these are set to true. This is used to break out of the loop or
       continue to the next iteration. Once any of this is called (this is called when `break` or `continue` is
       used), the corresponding context is set to true. This is used to break out of the loop or continue to the next.
    3. Then the actual statements inside the loop are executed.
    4. Goto step 1
- After the loop is done, the context provider is updated to set `isInLoop = false`.

<hr/>

## BREAK and CONTINUE

`break` and `continue` are used to break out of a loop or continue to the next iteration respectively.
When `break` is called, `isBreakCalled` is set to true, and when `continue` is called, `isContinueCalled` is set to
true.
This is used to break out of the loop or continue to the next iteration.

The `isInLoop` is used for verifying if the current execution is inside a loop. If it is not, then `break`
and `continue` will throw an error.

### How it interrupts

Simply `isBreakCalled` or `isContinueCalled` to true and doing the if checks only matters for the next iteration, not
the current iteration. We need a way to interrupt the current iteration.

For example, consider the following code:

```AssistScript
while (<condition>) (<task1> <task2> <task3> <task4> ...)
```

is roughly translated to this pseudocode of a general loop control implementation:

```
while (<condition>)
    if counter > LOOP_LIMIT
        exit;

    if ctx.isBreakCalled
        break;

    if ctx.isContinueCalled
        continue
    
    <task1>
    <task2> <-- Calls the break / continue
    <task3>
    <task4>
    ...
```

Suppose, task2 calls the AssistScript `break` or `continue` command. This sets the `isBreakCalled` or `isContinueCalled`
to true, but these are checked again only at the next iteration. We would expect the loop to be interrupted immediately
at the call area. But this is not what happens.

So to interrupt the current iteration, we need to throw an error, when `break` or `continue` is called. As errors in JS
interrupt the current execution. So to do this, we use a special type of error called `ASInterrupt` in code (for
source [see](../../src/lang-core/errors/ASInterrupt.ts)).

But this stops the whole execution, so we need to catch this error and handle it. This should be done inside the loop
itself.

### Example

```AssistScript
(set i 0)
(while (TRUE) (
    (if (eq (get i) 5) (
        (print i is 5)
        (break)
    ))
    
    (print (get i))    
    (incr i)    
))
```
Roughly translated to the steps;
```plaintext
START  │                         
       │                         
  i=0  │                         
       │                         
  i=1  │                         
       │                         
  i=2  │                         
       │                         
  i=3  │                         
       │                         
  i=4  │                         
       │                         
  i=5  break─┐ ASInterrupt thrown
       |     │                   
  i=6  |     │                   
   .   .     │                   
   .   .     │                   
  END   ◄────┘                                  
```