import LangTokenBase, {TokenData, TokenType} from "../LangTokenBase";
import exp from "node:constants";


export default class ContainerToken extends LangTokenBase<string> {
    constructor(value: TokenData["allowedContainers"]) {
        super(value, TokenType.SEPARATOR);
    }
}

/** Represents '('*/
export class LeftBracketToken extends ContainerToken {
    constructor() {
        super('(');
    }
}

/** Represents ')'*/
export class RightBracketToken extends ContainerToken {
    constructor() {
        super(')');
    }
}