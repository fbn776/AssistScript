import LangTokenBase, {TokenType} from "../LangTokenBase";

export default class StringToken extends LangTokenBase<string> {
    constructor(value: string) {
        super(value, TokenType.STRING);
    }
}