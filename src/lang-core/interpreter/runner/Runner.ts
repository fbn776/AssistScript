import CommandStore from "../CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import {runCommand} from "./runCommand";
import BaseContextProvider from "../../BaseContextProvider";

/**
 * The command runner class.
 * Responsible for providing the runtime.
 * Provides a static method to run a command string.
 */
export default class Runner {
    /** Takes in a string and runs it and returns the value of the command
     * @throws ASRuntimeError
     */
    public static run(str: string, store: CommandStore): unknown {
        const ast = generateSyntaxTree(str);
        return runCommand(ast, store, {rootToken: ast, originalStr: str});
    }
}