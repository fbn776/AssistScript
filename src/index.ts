import AssistScript from "./lang-core/AssistScript";
import sandboxRun from "./utils/sandboxRun";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";

class TestContextProvider extends BaseContextProvider {
    clear() {
        console.clear();
    }
}

const as = new AssistScript(new TestContextProvider());

// sandboxRun(as, `
// (set n 10)
// (set i 0)
// (while (lt (get i) 10) (
//     (if (eq (get i) 5) (
//         (print i is 5)
//         (break)
//     ))
//
//     (print (get i))
//     (incr i)
// ))`);

sandboxRun(as, `
(set n 10)
(repeat 5 (
    (print "Hello, world!")
))
`);

sandboxRun(as, `
for (set i 0) (lt (get i) 10) (incr i) (    
    (print i = (get i))
)
`)

// console.log(as.store)
//
// const txt = `
// (set n 5)
// (set-arr arr 3 5 7 9 1)
//
// `
//
// sandboxRun(as, txt);
//
//
// const testScript = `
// (set n 5)
// (array input 3 5 7 9 1)
//
// (set key 9)
// (set found false)
//
//
//
// if (get found) (
//         (p "Found key")
// ) else (
//         (p "Key not found")
// )
// `
//
// sandboxRun(as, testScript);

