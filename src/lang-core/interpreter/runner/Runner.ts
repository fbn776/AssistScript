import CommandStore from "../CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import {runCommand} from "./runCommand";

/**
 * The command runner class.
 * Responsible for providing the runtime.
 * Provides a static method to run a command string.
 */
export default class Runner {
    private static _store = CommandStore.getInstance();

    /** Takes in a string and runs it and returns the value of the command
     * @throws ASRuntimeError
     */
    public static run(str: string): unknown {
        const ast = generateSyntaxTree(str);
        return runCommand(ast, this._store, {rootToken: ast, originalStr: str});
    }
}