import randomTokenID from "../../../utils/randomTokenID";

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
 * All tokens extends this class
 */
export default class LangTokenBase<T> {
    value: T;
    readonly type: TokenType;
    readonly tokenID;
    constructor(value: T, type: TokenType) {
        this.value = value;
        this.type = type;
        this.tokenID = randomTokenID();
    }
}

