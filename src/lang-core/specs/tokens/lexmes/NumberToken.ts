import LangTokenBase, {TokenType} from "../LangTokenBase";

export default class NumberToken extends LangTokenBase<number> {
    constructor(value: number) {
        super(value, TokenType.NUMBER);
    }
}