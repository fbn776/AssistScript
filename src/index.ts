import AssistScript from "./lang-core/AssistScript";
import sandboxRun from "./utils/sandboxRun";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";

class TestContextProvider extends BaseContextProvider {
    clear() {
        console.clear();
    }
}

const as = new AssistScript(new TestContextProvider());

//
// sandboxRun(as, `print "hello" "world" What " is thus`);
// sandboxRun(as, `add 10 20 40 50 2 4 2 (sub 30 44 2) (mult 3 4 2 4`);
// sandboxRun(as, `add 10 20 40 50 2 4 2 (sub 30 44 2 mult 3 4 2 4`);
// sandboxRun(as, `add 10 20 40 50 2 4 2 (sub 30 44 2 (mult 3 4 (add 34 2 (fact2 2) 4 4 2) 4))`);



const txt = `
(set n 5)
(set-arr arr 3 5 7 9 1)

`

sandboxRun(as, txt);


const testScript = `
(set n 5)
(array input 3 5 7 9 1)

(set key 9)
(set found false)



if (get found) (
        (p "Found key")
) else (
        (p "Key not found")
)
`

sandboxRun(as, testScript);

