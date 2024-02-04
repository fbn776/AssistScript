import ASLangError from "./lang/errors/ASLangError";
import ExecutionEngine from "./lang/executer/ExecutionEngine";
import CommandStore from "./lang/models/CommandStore";
import {CommandBuilder} from "./lang/models/Command";
import {DocsBuilder} from "./lang/models/Documentation";
import Arguments from "./lang/models/Arguments";
import DataTypes from "./lang/tokens/DataType";

function test(func: () => any) {
    try {
        func();
    } catch (e) {
        if (e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}

const store = CommandStore.getInstance();


store.addCommand(
    new CommandBuilder()
        .addNames('add')
        .addDocs(new DocsBuilder()
            .title('Add')
            .body('')
            .syntax('')
            .example('')
            .build()
        )
        .addArgs(new Arguments(DataTypes.number, DataTypes.number))
        .addReturnType(DataTypes.number)
        .addExec((x: number, y: number) => {
            console.log(x, y);
            return x + y;
        })
        .build()
)

const exec = new ExecutionEngine();

console.log(exec.execute('add 10 20'));
