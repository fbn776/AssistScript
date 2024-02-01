import CommandStore from "../models/CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import CommandToken from "../tokens/lexmes/CommandToken";

export default class ExecutionEngine {
    private _store = CommandStore.getInstance();

    public execute(str: string) {
        const ast = generateSyntaxTree(str);
        executeCmd(this._store, ast);
    }
}

function executeCmd(store: CommandStore, cmd: CommandToken) {
    const cmdUnit = store.getCommand(cmd.commandName);

    if(cmdUnit) {
        const func = cmdUnit.exec();

        console.log(cmdUnit);
    }
}