import Documentation from "./lang-units/Documentation";
import Arguments from "./lang-units/Arguments";
import DataTypes from "./tokens/DataType";
import ASMakeError from "../errors/ASMakeError";
import Command from "./lang-units/Command";
import {CmdExec} from "../utils/lang_utils";

/**
 * A builder class that builds a command
 */
export class CommandBuilder {
    private _names: string[] | null = null;
    private _docs: Documentation | null = null
    private _args: Arguments | null = null;
    private _returnType: DataTypes | null = null;
    private _exec: CmdExec | null = null;

    /**Adds the name and aliases(if it exists); REQUIRED*/
    names(...names: string[]) {
        this._names = names;
        return this;
    }

    /**Documentation; REQUIRED*/
    docs(docs: Documentation) {
        this._docs = docs;
        return this;
    }

    /**Arguments; REQUIRED*/
    args(args: Arguments) {
        this._args = args;
        return this;
    }

    /**Return type; REQUIRED*/
    returnType(returnType: DataTypes) {
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

        return new Command(this._names, this._docs, this._args, this._returnType, this._exec);
    }
}