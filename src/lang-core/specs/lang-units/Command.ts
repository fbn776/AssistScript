import Documentation from "./Documentation";
import Parameters from "./Parameters";
import DataType from "../tokens/DataType";

import {CmdExec} from "../../utils/lang_types";

/**
 * The representation of a Command in AssistScript
 * This holds all the information about a command,
 * contains the names (+aliases), documentation, argument info and how to execute.
 */
export default class Command {
    /** The names of the command; Can contain manny names (aliases) */
    names: string[];
    docs: Documentation;
    params: Parameters;
    returnType: DataType;
    exec;

    /**
     * @param names Array containing the name and aliases of the command
     * @param docs The documentation of the command
     * @param params
     * @param returnType The return type of the command
     * @param exec The function to execute when the command is called
     */
    constructor(names: string[], docs: Documentation, params: Parameters, returnType: DataType, exec: CmdExec) {
        this.names = names;
        this.docs = docs;
        this.params = params;
        this.returnType = returnType;
        this.exec = exec;
    }
}