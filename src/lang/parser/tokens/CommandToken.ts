import LangTokenBase, {TokenType} from "./LangTokenBase";

export default class CommandToken extends LangTokenBase {
    readonly params: LangTokenBase[];

    constructor(value: string, params: LangTokenBase[]) {
        super(value, TokenType.COMMAND);
        this.params = params;
    }
}