import generateSyntaxTree from "../parser/generateSyntaxTree";
import {runCommand} from "./runCommand";
import AssistScript from "../../AssistScript";

function prettifyString(str: string) {
    /** Removes extra spaces and newlines from the string, but ignores spaces between quotes. Double quotes ONLY */
    return str.trim().replace(/\s+/g, ' ');
}

/**
 * The command runner class.
 * Responsible for providing the runtime.
 * Provides a static method to run a command string.
 */
export default class Runner {
    /** Takes in a string and runs it and returns the value of the command
     * @throws ASRuntimeError
     */
    public static run(str: string, asInstance: AssistScript): unknown {
        str = prettifyString(str);
        const ast = generateSyntaxTree(str);
        return runCommand(ast, asInstance, {rootToken: ast, originalStr: str});
    }
}