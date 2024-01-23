import LangToken, {TokenType} from "./LangToken";

export default class NumberToken extends LangToken {
    constructor(value: string) {
        super(value, TokenType.NUMBER);
    }
}