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