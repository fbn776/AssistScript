import {tokenize} from "./lang/parser/tokenize";
import ASLangError from "./lang/errors/ASLangError";
import makeSyntaxTree from "./lang/parser/makeSyntaxTree";
import {displayAST} from "./lang/lang_utils";

function test(func: () => any) {
    try {
        func();
    } catch (e) {
        if(e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}


test(() => {
    const input = `add 10 30 (sub (add 20 20) 30)`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})

test(() => {
    const input = `add 10 30`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})
test(() => {
    const input = `add 10 30 (sub`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})

test(() => {
    const input = `add 10 30 () haha what to do`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})

test(() => {
    const input = `add 1)0 30) sub`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})


test(() => {
    const input = `add 10 30) sub`
    console.log("INPUT:", input);
    displayAST(makeSyntaxTree(input));
})