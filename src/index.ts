import ASLangError from "./lang-core/errors/ASLangError";
import {parser} from "./lang-core/interpreter/parser/parser";
import CommandStore from "./lang-core/interpreter/CommandStore";
import {CommandBuilder} from "./lang-core/specs/CommandBuilder";
import {DocsBuilder} from "./lang-core/specs/DocsBuilder";
import Arguments from "./lang-core/specs/lang-units/Arguments";
import DataTypes from "./lang-core/specs/tokens/DataType";
import Runner from "./lang-core/interpreter/runner/Runner";

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

test(() => {
    console.log(parser("hello jjs'haha' 2 3"))
});

test(() => {
    console.log(parser("hello (('haha') 2 3"))
});

test(() => {
    console.log(parser("add 10 43 24.234 34+13 true (sub -422 -42.44 +23 false) False True"))
});




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
        .args(new Arguments(DataTypes.number, DataTypes.number))
        .returnType(DataTypes.number)
        .run((x: number, y: number) => {
            console.log(x, y);
            return x + y;
        })
        .build()
)

const exec = new Runner();

console.log(exec.execute('add 10 20'));