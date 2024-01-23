import LangTokenBase, {TokenData, TokenType} from "./LangTokenBase";


export default class ContainerToken extends LangTokenBase {
    constructor(value: TokenData["allowedContainers"]) {
        super(value, TokenType.SEPARATOR);
    }
}