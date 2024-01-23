import LangToken, {TokenData, TokenType} from "./LangToken";

export default class SeparatorToken extends LangToken {
    constructor(value: TokenData["allowedSeparator"]) {
        super(value, TokenType.SEPARATOR);
    }
}