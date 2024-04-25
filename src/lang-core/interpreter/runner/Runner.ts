import CommandStore from "../CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import {runCommand} from "./runCommand";
import BaseContextProvider from "../../BaseContextProvider";
import AssistScript from "../../../AssistScript";

/**
 * The command runner class.
 * Responsible for providing the runtime.
 * Provides a static method to run a command string.
 */
export default class Runner {
    /** Takes in a string and runs it and returns the value of the command
     * @throws ASRuntimeError
     */
    public static run<T extends  BaseContextProvider>(str: string, asInstance: AssistScript<T>): unknown {
        const ast = generateSyntaxTree(str);
        return runCommand(ast, asInstance, {rootToken: ast, originalStr: str});
    }
}