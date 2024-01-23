import LangToken, {TokenType} from "./LangToken";

export default class StringToken extends LangToken {
    constructor(value: string) {
        super(value, TokenType.STRING);
    }
}