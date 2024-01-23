import LangToken, {TokenData, TokenType} from "./LangToken";


export default class ContainerToken extends LangToken {
    constructor(value: TokenData["allowedContainers"]) {
        super(value, TokenType.SEPARATOR);
    }
}