import LangTokenBase, {TokenType} from "../LangTokenBase";

/**
 * Represents a command token, not the actual command object but an element of the specs tree
 */
export default class CommandToken extends LangTokenBase<string> {
    readonly params: LangTokenBase<unknown>[];

    /** Used to denote is the command is an internally generated command or not*/
    readonly isInternal: boolean;

    constructor(name: string, params: LangTokenBase<unknown>[], isInternal?: boolean) {
        super(name, TokenType.COMMAND);
        this.params = params;
        this.isInternal = isInternal || false;
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