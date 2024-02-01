import CommandStore from "../models/CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import CommandToken from "../tokens/lexmes/CommandToken";

export default class ExecutionEngine {
    private _store = CommandStore.getInstance();

    public execute(str: string) {
        const ast = generateSyntaxTree(str);

        const cmd = this._store.getCommand(ast.commandName);

        if(cmd) {

        }
    }
}

function executeCmd(cmd: CommandToken) {

}