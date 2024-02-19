import LangTokenBase, {TokenType} from "../LangTokenBase";

export default class BooleanToken extends LangTokenBase<boolean> {
    constructor(value: boolean) {
        super(value, TokenType.BOOLEAN);
    }
}