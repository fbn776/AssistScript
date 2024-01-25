import LangTokenBase, {TokenType} from "./LangTokenBase";

export default class CommandToken extends LangTokenBase {
    readonly params: LangTokenBase[];
    private cmdName: string;
    constructor(name: string, params: LangTokenBase[]) {
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

    appendParam(param: LangTokenBase) {
        this.params.push(param);
    }
}