import LangTokenBase, {TokenType} from "../LangTokenBase";

/**
 * Represents a command token, not the actual command object but an element of the specs tree
 */
export default class CommandToken extends LangTokenBase<string> {
    readonly params: LangTokenBase<unknown>[];
    constructor(name: string, params: LangTokenBase<unknown>[]) {
        super(name, TokenType.COMMAND);
        this.params = params;
    }

    changeName(name: string){
        this.value = name;
    }

    /** The command name*/
    get commandName() {
        return this.value;
    }

    appendParam(param: LangTokenBase<unknown>) {
        this.params.push(param);
    }
}