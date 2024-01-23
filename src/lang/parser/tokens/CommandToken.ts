import LangToken, {TokenType} from "./LangToken";

export default class CommandToken extends LangToken {
    readonly params: LangToken[];

    constructor(value: string, params: LangToken[]) {
        super(value, TokenType.COMMAND);
        this.params = params;
    }
}