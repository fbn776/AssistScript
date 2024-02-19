import CommandStore from "../specs/CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import CommandToken from "../specs/tokens/lexmes/CommandToken";
import NumberToken from "../specs/tokens/lexmes/NumberToken";
import ASRuntimeError from "../errors/ASRuntimeError";

export default class ExecutionEngine {
    private _store = CommandStore.getInstance();

    public execute(str: string) {
        const ast = generateSyntaxTree(str);
        return executeCmd(this._store, ast);
    }
}

function executeCmd(store: CommandStore, cmd: CommandToken): any {
    const cmdUnit = store.getCommand(cmd.commandName);
    if (!cmdUnit)
        throw new ASRuntimeError(`Command '${cmd.commandName}' not found.`);

    let params = cmd.params;

    const paramsCP = params.map((value) => {
        if (value instanceof CommandToken)
            return executeCmd(store, value);
        else if (value instanceof NumberToken)
            return +(value.value as number);
        else
            return value.value as string;
    });

    return cmdUnit.exec(...paramsCP);
}
