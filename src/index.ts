import bracketMatcher from "./lang/parser/bracketMatcher";
import {groupQuotesAndSplitTokens} from "./lang/parser/groupQuotesAndSplitTokens";
import {tokenize} from "./lang/parser/tokenize";
import ASLangError from "./lang/errors/ASLangError";


// const str = `add 10 20 (sub 40 (add 59 70))`;
// console.log("INPUT: ", str);
// bracketMatcher(groupQuotesAndSplitTokens(str));



function test(str: string) {
    try {
        console.log("Testing: ", str);
        const tokens = tokenize(str);
        console.log(tokens);

    } catch (e) {
        if(e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}

test(`helo there "how are you" aaa "h haha"))`);
test(`hello "haha" 'hi' "Hiii 'hello'"`);
test(`Hello ('hii')`);
test(`Hello ('hii'`);
test(`Hello 'hii')`);
test(`Hello ('hii')))`);
test(`Hello ('hii'aa`);
test(`Hello ('hii'aabvc`);
test(`Haha this is a simple string`)
