## set
`set-variable` `var`<br/><br/>
**Description:** <br/>Used to create a new variable, if the variable name already exits it updates the existing one.<br/>

**Syntax:**<br/>

`set <variable-name> <value>`<br/>


**Example:**<br/>

```asrc
set x 5
```

**Result:**<br/>

```asrc
5
```

## get
`get-variable`<br/><br/>
**Description:** <br/>Returns the value of a variable.<br/>

**Syntax:**<br/>

`get <variable-name>`<br/>


**Example:**<br/>

```asrc
get x
```

**Result:**<br/>

```asrc
5
```

## delete
`delete-variable`<br/><br/>
**Description:** <br/>Deletes a variable. Returns true if the variable existed and is deleted, false otherwise.<br/>

**Syntax:**<br/>

`delete <variable-name>`<br/>


**Example:**<br/>

```asrc
delete x
```

**Result:**<br/>

```asrc
true
```

## incr
`increment`<br/><br/>
**Description:** <br/>Increments the given variable by 1.<br/>

**Syntax:**<br/>

`incr <varname>`<br/>


**Example:**<br/>

```asrc
incr i
```

**Result:**<br/>

```asrc
11
```

## decr
`decrement`<br/><br/>
**Description:** <br/>Decrements the given variable by 1.<br/>

**Syntax:**<br/>

`decr <varname>`<br/>


**Example:**<br/>

```asrc
decr i
```

**Result:**<br/>

```asrc
10
```

## array
`arr`<br/><br/>
**Description:** <br/>Creates a new array and stores it. If the array name already exists, it overwrites the existing one.<br/>

**Syntax:**<br/>

`array <array-name> <value1> <value2> ...`<br/>


**Example:**<br/>

```asrc
array arr 1 2 3 4
```

**Result:**<br/>

```asrc
1,2,3,4
```

## get-arr
`getarr` `array-get`<br/><br/>
**Description:** <br/>Returns the array stored in the variable.<br/>

**Syntax:**<br/>

`get-arr <array-name>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 3) (get-arr arr)
```

**Result:**<br/>

```asrc
1,2,3
```

## index
**Description:** <br/>Returns the value at the given index of the array.<br/>

**Syntax:**<br/>

`index <array-name> <index>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 3 4) (index arr 2)
```

**Result:**<br/>

```asrc
3
```

## setarr
`setat` `set-arr` `set-at`<br/><br/>
**Description:** <br/>Sets the value at the given index of the array.<br/>

**Syntax:**<br/>

`setarr <array-name> <index> <value>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 3 4) (setarr arr 2 10)
```

**Result:**<br/>

```asrc
10
```

## length
`len` `arr-length`<br/><br/>
**Description:** <br/>Returns the length of the array.<br/>

**Syntax:**<br/>

`length <array-name>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 3 4) (length arr)
```

**Result:**<br/>

```asrc
4
```

## delete-arr
`deletearr` `del-arr` `delarr`<br/><br/>
**Description:** <br/>Deletes the array.<br/>

**Syntax:**<br/>

`delete-arr <array-name>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 3 4) (delete-arr arr)
```

**Result:**<br/>

```asrc
true
```

## append
`append-arr` `appendarr`<br/><br/>
**Description:** <br/>Appends the value to the end of the array.<br/>

**Syntax:**<br/>

`append <array-name> <value>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 4 5) (append arr 10)
```

**Result:**<br/>

```asrc
10
```

## pop
`pop-arr` `poparr`<br/><br/>
**Description:** <br/>Removes and returns the last element of the array.<br/>

**Syntax:**<br/>

`pop <array-name>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 4 5) (pop arr)
```

**Result:**<br/>

```asrc
5
```

## insert
`insert-arr` `insertarr`<br/><br/>
**Description:** <br/>Inserts the value at the given index of the array.<br/>

**Syntax:**<br/>

`insert <array-name> <index> <value>`<br/>


**Example:**<br/>

```asrc
(array arr 1 2 4 5) (insert arr 2 10)
```

**Result:**<br/>

```asrc
10
```

