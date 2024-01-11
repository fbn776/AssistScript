/**
 * A simple class to iterate over an array of tokens;
 * @param T the type of the token
 */
export class ArrayTokenizer<T> {
    readonly tokens: T[];
    private index: number = 0;

    public get currIndex() {
        return this.index
    };

    /** The array of type T to iterate over */
    constructor(tokenArray: T[]) {
        this.tokens = tokenArray
    }

    /** Returns the next token in the tokens array, or null if there are no more tokens. */
    nextToken(): T | null {
        return this.tokens[this.index++] || null
    }

    /** Returns the current token in from the tokens array, or null if there are no more tokens. This does not increment the index*/
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
