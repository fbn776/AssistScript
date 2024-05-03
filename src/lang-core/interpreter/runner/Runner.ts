import generateSyntaxTree from "../parser/generateSyntaxTree";
import {runCommand} from "./runCommand";
import AssistScript from "../../AssistScript";

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
        const ast = generateSyntaxTree(str);
        return runCommand(ast, asInstance, {rootToken: ast, originalStr: str});
    }
}