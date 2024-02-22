import ASLangError from "./lang-core/errors/ASLangError";
import CommandStore from "./lang-core/interpreter/CommandStore";
import {CommandBuilder} from "./lang-core/specs/CommandBuilder";
import {DocsBuilder} from "./lang-core/specs/DocsBuilder";
import Parameters from "./lang-core/specs/lang-units/Parameters";
import DataType from "./lang-core/specs/tokens/DataType";
import Runner from "./lang-core/interpreter/runner/Runner";
import randomTokenID from "./utils/randomTokenID";

console.time("Start");
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
        .names('add')
        .docs(new DocsBuilder()
            .title('Add')
            .body('')
            .syntax('')
            .example('')
            .build()
        )
        .args(new Parameters(2, DataType.number))
        .returnType(DataType.number)
        .run((x: number, y: number) => {
            return x + y;
        })
        .build()
)

const exec = new Runner();
console.time("Add command")
exec.run('add 20.32 (add 13 (add 32 (add 13 1)))');
console.timeEnd("Add command")

for(let i = 0; i < 20; i++)
    console.log(randomTokenID())

console.timeEnd("Start")