import AssistScript from "../src/lang-core/AssistScript";
import sandboxRun from "../src/utils/sandboxRun";
import BaseContextProvider from "../src/lang-core/services/BaseContextProvider";

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
//
// sandboxRun(as, `
// (set n 10)
// (repeat 5 (
//     (print "Hello, world!")
// ))
// `);
//
// sandboxRun(as, `
// for (set i 0) (lt (get i) 10) (incr i) (
//     (print i = (get i))
// )
// `)


const testScript = `
(set n 5)
(array input 3 5 7 9 1)

(print (index input 0))
(print (index input 1))
(print (index input 2))
`

sandboxRun(as, testScript);

const linearSearch = `
(print Linear Search)

(array input 3 5 7 9 1)
(set key 9)
(set found false)

(for (set i 0) (lt (get i) (len input)) (incr i) (
    (if (eq (index input (get i)) (get key)) (
        (set found true)
        (break)
    ))
))

(ife (get found)
    (print (get key) found at position (get i))
else
    (print (get key) not found)
)
`;

sandboxRun(as, linearSearch);