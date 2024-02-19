import Documentation from "./lang-units/Documentation";
import Arguments from "./lang-units/Arguments";
import DataTypes from "./tokens/DataType";
import {CmdExec} from "./lang-units/util_types";
import ASMakeError from "../errors/ASMakeError";
import Command from "./lang-units/Command";

/**
 * A builder class that builds a command
 */
export class CommandBuilder {
    private _names: string[] | null = null;
    private _docs: Documentation | null = null
    private _args: Arguments | null = null;
    private _returnType: DataTypes | null = null;
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

    addReturnType(returnType: DataTypes) {
        this._returnType = returnType;
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

        return new Command(this._names, this._docs, this._args, this._returnType, this._exec);
    }
}