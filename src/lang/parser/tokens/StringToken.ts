import LangTokenBase, {TokenType} from "./LangTokenBase";

export default class StringToken extends LangTokenBase {
    constructor(value: string) {
        super(value, TokenType.STRING);
    }
}