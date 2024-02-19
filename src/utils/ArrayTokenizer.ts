import LangTokenBase from "../lang-core/specs/tokens/LangTokenBase";

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
    currToken(): T | null {
        return this.tokens[this.index] || null;
    }

    hasMoreTokens(): boolean {
        return this.index < this.tokens.length;
    }
    reset(): void {
        this.index = 0;
    }
}

/** Returns the position of a token at the specified token position if all the tokens were joined together. */
export function getJoinedStrLength(token: ArrayTokenizer<string>, tokenPos: number, offset = 0): number {
    if(tokenPos > token.length)
        throw new Error(`Token position ${tokenPos} is greater than the length of the token array (${token.length})`)

    let length = 0;
    for (let i = 0; i < tokenPos; i++) {
        length += token.tokens[i].length + offset;
    }
    return length - offset;
}

/** Same as `getJoinedStrLength`, but for `LangTokenBase`, sort of like a function overload*/
export function getJoinedTknLength(token: ArrayTokenizer<LangTokenBase>, tokenPos: number, offset = 0): number {
    if(tokenPos > token.length)
        throw new Error(`Token position ${tokenPos} is greater than the length of the token array (${token.length})`)

    let length = 0;
    for (let i = 0; i < tokenPos; i++) {
        length += (token.tokens[i].value as string).length + offset;
    }
    return length - offset;
}
