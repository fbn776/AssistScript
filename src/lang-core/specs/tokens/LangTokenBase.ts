export interface TokenData {
    allowedContainers: "(" | ")"
}

export enum TokenType {
    STRING = "TOKEN_STRING",
    NUMBER = "TOKEN_NUMBER",
    BOOLEAN = "TOKEN_BOOLEAN",
    COMMAND = "TOKEN_COMMAND",
    SEPARATOR = "TOKEN_SEPARATOR"
}

/**
 * The base class of the token representation in AssistScript
 */
export default class LangTokenBase<T> {
    readonly value: T;
    readonly type: TokenType;
    constructor(value: T, type: TokenType) {
        this.value = value;
        this.type = type;
    }
}

