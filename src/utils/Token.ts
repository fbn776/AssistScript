export enum TokenType {
    STRING = "TOKEN_STRING",
    NUMBER = "TOKEN_NUMBER",
    COMMAND = "TOKEN_COMMAND",
}

export default class Token {
    readonly value: string;
    readonly type: TokenType;
    constructor(value: string, type: TokenType) {
        this.value = value;
        this.type = type;
    }
}

export class StringToken extends Token {
    constructor(value: string) {
        super(value, TokenType.STRING);
    }
}

export class NumberToken extends Token {
    constructor(value: string) {
        super(value, TokenType.NUMBER);
    }
}

export class CommandToken extends Token {
    readonly params: Token[];
    constructor(value: string, params: Token[]) {
        super(value, TokenType.COMMAND);
        this.params = params;
    }
}