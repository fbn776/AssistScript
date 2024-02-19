import Documentation from "./Documentation";
import Arguments from "./Arguments";
import {CmdExec} from "./util_types";
import DataTypes from "../tokens/DataType";

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
    returnType: DataTypes;
    exec;

    /**
     * @param names Array containing the name and aliases of the command
     * @param docs The documentation of the command
     * @param args The arguments of the command
     * @param returnType The return type of the command
     * @param exec The function to execute when the command is called
     */
    constructor(names: string[], docs: Documentation, args: Arguments, returnType: DataTypes, exec: CmdExec) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.returnType = returnType;
        this.exec = exec;
    }
}