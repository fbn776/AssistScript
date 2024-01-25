export interface TokenData {
    allowedContainers: "(" | ")"
}

export enum TokenType {
    STRING = "TOKEN_STRING",
    NUMBER = "TOKEN_NUMBER",
    COMMAND = "TOKEN_COMMAND",
    SEPARATOR = "TOKEN_SEPARATOR"
}

/**
 * The base class of the token representation in AssistScript
 */
export default class LangTokenBase {
    readonly value: string;
    readonly type: TokenType;
    constructor(value: string, type: TokenType) {
        this.value = value;
        this.type = type;
    }
}

