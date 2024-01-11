export class StringTokenizer {
    readonly tokens: string[];
    private index: number = 0;
    constructor(str: string, delimiter: string) {
        this.tokens = str.split(delimiter);
    }

    /** Returns the next token in the string, or null if there are no more tokens. */
    nextToken(): string | null {
        return this.tokens[this.index++] || null;
    }

    hasMoreTokens(): boolean {
        return this.index < this.tokens.length;
    }

    reset(): void {
        this.index = 0;
    }
}
