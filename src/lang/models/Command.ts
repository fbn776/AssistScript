import Documentation from "./Documentation";
import Arguments from "./Arguments";
import ASMakeError from "../errors/ASMakeError";
import {CmdExec} from "./util_types";

/**
 * The representation of a Command in AssistScript
 * This holds all the information about a command,
 * contains the names (+aliases), documentation, argument info and how to execute.
 */
export default class Command {
    /** The names of the command; Can contain manny names (aliases) */
    names: string[];
    docs: Documentation;
    args: Arguments;
    exec;

    /**
     * @param names Array containing the name and aliases of the command
     * @param docs The documentation of the command
     * @param args The arguments of the command
     * @param exec The function to execute when the command is called
     */
    constructor(names: string[], docs: Documentation, args: Arguments, exec: CmdExec) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.exec = exec;
    }
}


/**
 * A builder class that builds a command
 */
export class CommandBuilder {
    private _names: string[] | null = null;
    private _docs: Documentation | null = null
    private _args: Arguments | null = null;
    private _exec: CmdExec | null = null;

    /**Adds the name and aliases if it exists; REQUIRED*/
    addNames(...names: string[]) {
        this._names = names;
        return this;
    }

    /**Documentation; REQUIRED*/
    addDocs(docs: Documentation) {
        this._docs = docs;
        return this;
    }

    /**Arguments; REQUIRED*/
    addArgs(args: Arguments) {
        this._args = args;
        return this;
    }

    /**Execution function; REQUIRED*/
    addExec(exec: CmdExec) {
        this._exec = exec;
        return this;
    }

    /**
     * @throws ASMakeError If the required properties are not specified.
     */
    build() {
        if(!this._names)
            throw new ASMakeError('Command name(s) not specified.');

        if(!this._docs)
            throw new ASMakeError('Command documentation not specified.');

        if(!this._args)
            throw new ASMakeError('Command arguments not specified.');

        if(!this._exec)
            throw new ASMakeError('Command execution function not specified.');

        return new Command(this._names, this._docs, this._args, this._exec);
    }
}