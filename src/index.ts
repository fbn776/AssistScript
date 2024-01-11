import {groupQuotesInStr} from "./parser/stringFunctions";

const inputStr = `hello world ("this is a test") 'this is also a test') "this is a test with a 'quote' in it"`;
//console.log("INPUT: ", inputStr);
//console.log(groupQuotesInStr(inputStr));


function test(inputStr: string) {
    console.log();
    console.log("INPUT: ", inputStr);
    console.log("OUTPUT: ", groupQuotesInStr(inputStr));
    console.log();
}

test("");
test("hello world");
test("hello world (this is a test)");
test(`"Hello there how are you?"`);
test(`hello world 'this is a test' "this is a test" "this is 'a' test" 'this is "a" test'`);
test(`hello world "this is a test"'this is a test'"this is 'a' test"'this is "a" test'`);
test(`hello world ("wtf is this") (this "is a" test)`);
test(`This "'is' 'going' 'to' "be fun. ('this is a "test"') `);