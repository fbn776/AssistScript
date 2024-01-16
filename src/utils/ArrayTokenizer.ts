/**
 * A simple class to iterate over an array of tokens;
 * @param T the type of the token
 */
export class ArrayTokenizer<T> {
    readonly tokens: T[];
    private index: number = 0;

    public get length() {
        return this.tokens.length;
    }

    public get currIndex() {
        return this.index
    };

    /** The array of type T to iterate over */
    constructor(tokenArray: T[]) {
        this.tokens = tokenArray
    }

    /** Returns the next token in the token's array, or null if there are no more tokens. */
    nextToken(): T | null {
        return this.tokens[this.index++] || null
    }

    /** Returns the current token in from the token's array, or null if there are no more tokens.
     * This does not increment the index*/
    currentToken(): T | null {
        return this.tokens[this.index] || null;
    }

    hasMoreTokens(): boolean {
        return this.index < this.tokens.length;
    }
    reset(): void {
        this.index = 0;
    }
}


/** Returns the length of the string at the specified token position if all the tokens were joined together. */
export function getJoinedStrLength(token: ArrayTokenizer<string>, tokenPos: number, offset = 0): number {
    if(tokenPos > token.length)
        throw new Error(`Token position ${tokenPos} is greater than the length of the token array (${token.length})`)

    let length = 0;
    for (let i = 0; i < tokenPos; i++) {
        length += token.tokens[i].length + offset;
    }
    return length - offset;
}