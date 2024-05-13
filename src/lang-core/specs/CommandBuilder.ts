import Documentation from "./lang-units/Documentation";
import Parameters from "./lang-units/Parameters";
import DataType from "./tokens/DataType";
import ASMakeError from "../errors/ASMakeError";
import Command from "./lang-units/Command";

import {CmdExec} from "../utils/lang_types";

/**
 * A builder class that builds and returns new command.
 *
 * This command should then be added to the command store, or do something else with it.
 */
export class CommandBuilder {
    private _names: string[] | null = null;
    private _docs: Documentation | null = null
    private _args: Parameters | null = null;
    private _returnType: DataType | null = null;
    private _exec: CmdExec | null = null;
    private readonly _category: string | null = null;

    /**
     * @param category An optional param; used for categorizing the command
     */
    constructor(category?: string) {
        this._category = category || null;
    }

    /**Adds the name and aliases(if it exists); REQUIRED*/
    names(...names: string[]) {
        this._names = names;
        return this;
    }

    /**
     * Adds the documentation for the command; REQUIRED
     * @param title title or heading of the command
     * @param aliases aliases of the command
     * @param body body of the command
     * @param syntax syntax of the command
     * @param example example of the command [optional]
     * @param note note of the command [optional]
     */
    directDocs(title: string, aliases: string[] | null, body: string, syntax: string, example?: string, note?: string) {
        this._docs = new Documentation(title, aliases || [], body, syntax, example, note);
        return this;
    }

    /**
     * Same as `directDocs` but takes a `Documentation` object. Can be used with `DocsBuilder`
     * @param docs
     */
    docs(docs: Documentation) {
        this._docs = docs;
        return this;
    }

    /**
     * Adds the arguments for the command; REQUIRED
     * @param num number of arguments
     * @param params the parameter types listed out
     */
    args(num: number, ...params: DataType[]) {
        this._args = new Parameters(num, ...params);
        return this;
    }

    /**Return type; REQUIRED*/
    returnType(returnType: DataType) {
        this._returnType = returnType;
        return this;
    }

    /**The code to execute when this command is called; REQUIRED*/
    run(exec: CmdExec) {
        this._exec = exec;
        return this;
    }

    /**
     * Builds the command; REQUIRED
     * @throws ASMakeError If the required properties are not specified*/
    build() {
        if (!this._names)
            throw new ASMakeError('Command name(s) not specified.');

        if (!this._docs)
            throw new ASMakeError('Command documentation not specified.');

        if (!this._args)
            throw new ASMakeError('Command arguments not specified.');

        if (!this._exec)
            throw new ASMakeError('Command execution function not specified.');

        if (!this._returnType)
            throw new ASMakeError('Command return type not specified.');

        if (this._category)
            this._docs.category = this._category;

        const cmd = new Command(this._names, this._docs, this._args, this._returnType, this._exec);
        this.reset();
        return cmd;
    }

    reset() {
        this._names = null;
        this._docs = null
        this._args = null;
        this._returnType = null;
        this._exec = null;
    }
}