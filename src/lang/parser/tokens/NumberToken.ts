import LangTokenBase, {TokenType} from "./LangTokenBase";

export default class NumberToken extends LangTokenBase {
    constructor(value: string) {
        super(value, TokenType.NUMBER);
    }
}