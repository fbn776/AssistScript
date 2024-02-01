import Documentation from "./Documentation";
import Arguments from "./Arguments";
import ASMakeError from "../errors/ASMakeError";


export default class CommandUnit {
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
    constructor(names: string[], docs: Documentation, args: Arguments, exec: () => unknown) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.exec = exec;
    }
}


export class CommandBuilder {
    private _names: string[] | null = null;
    private _docs: Documentation | null = null
    private _args: Arguments | null = null;
    private _exec: (() => unknown) | null = null;

    addNames(...names: string[]) {
        this._names = names;
        return this;
    }

    addDocs(docs: Documentation) {
        this._docs = docs;
        return this;
    }

    addArgs(args: Arguments) {
        this._args = args;
        return this;
    }

    addExec(exec: () => unknown) {
        this._exec = exec;
        return this;
    }

    build() {
        if(!this._names)
            throw new ASMakeError('Command name(s) not specified.');

        if(!this._docs)
            throw new ASMakeError('Command documentation not specified.');

        if(!this._args)
            throw new ASMakeError('Command arguments not specified.');

        if(!this._exec)
            throw new ASMakeError('Command execution function not specified.');

        return new CommandUnit(this._names, this._docs, this._args, this._exec);
    }
}