import LangTokenBase, {TokenType} from "../LangTokenBase";

/**
 * Represents a command token, not the actual command object but an element of the specs tree
 */
export default class CommandToken extends LangTokenBase<string> {
    readonly params: LangTokenBase<unknown>[];
    private cmdName: string;

    constructor(name: string, params: LangTokenBase<unknown>[]) {
        super('command_block', TokenType.COMMAND);
        this.cmdName = name;
        this.params = params;
    }

    changeName(name: string){
        this.cmdName = name;
    }

    /** The command name*/
    get commandName() {
        return this.cmdName;
    }

    appendParam(param: LangTokenBase<unknown>) {
        this.params.push(param);
    }
}