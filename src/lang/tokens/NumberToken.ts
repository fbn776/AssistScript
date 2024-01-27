import LangTokenBase, {TokenType} from "./LangTokenBase";

export default class NumberToken extends LangTokenBase {
    constructor(value: number) {
        super(value, TokenType.NUMBER);
    }
}