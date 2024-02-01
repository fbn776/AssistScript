import ASLangError from "./lang/errors/ASLangError";
import ExecutionEngine from "./lang/executer/ExecutionEngine";
import CommandStore from "./lang/models/CommandStore";
import {CommandBuilder} from "./lang/models/CommandUnit";
import {DocsBuilder} from "./lang/models/Documentation";
import Arguments from "./lang/models/Arguments";

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
        .addArgs(new Arguments(0, 0))
        .addExec(() => {
            console.log('add');
        })
        .build()
)

const exec = new ExecutionEngine();

exec.execute('add 10 20');
