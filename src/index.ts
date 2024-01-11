import {groupQuotesInStr} from "./parser/stringFunctions";
import ASLangError from "./errors/ASLangError";

const inputStr = `hello world ("this is a test") 'this is also a test') "this is a test with a 'quote' in it"`;
//console.log("INPUT: ", inputStr);
//console.log(groupQuotesInStr(inputStr));


function test(inputStr: string) {
    console.log();
    console.log("INPUT: ", inputStr);
    try {

        console.log("OUTPUT: ", groupQuotesInStr(inputStr));
    } catch (e) {
        if (e instanceof ASLangError)
            console.error(e);
    }
    console.log();
}

test(inputStr);
test(`hello world "this is a test"`);
test(`hello world ("this is a test")`);
test(`"This starts with a quote" haha`);
test(`Haha "this ends with a quote"`);
test(`Haha "there is quotes in the middle" haha`);
test(`Hello there "opened with dq but closed with sq'`);
// test(`hello world ("wtf is this") (this "is a" test)`);
// test(`hello world "this is an error"init`);
// test(`hello world start"this is an error"init`);
// test(`This is an Error "Hello`);
// test(`This is also Error "Hello there""how are you"`);
// test(`Empty quotes " like this is an error`)