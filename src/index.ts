import AssistScript from "./lang-core/AssistScript";
import sandboxRun from "./utils/sandboxRun";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";

class TestContextProvider extends BaseContextProvider {
    clear() {
        console.clear();
    }
}

const as = new AssistScript(new TestContextProvider());

const txt = `
eval (print "Hello World")
(print "Hi there")


(print setting x = 10) (set x 10)




(print x = (get x))
`

sandboxRun(as, txt);

//sandboxRun(as, 'eval (print ONE) (print TWO (print THREE))')
//sandboxRun(as, 'eval (set x 10) (set y 30) (print (get x)) (print (get y))')



const testScript = `
(set n 5)
(array input 3 5 7 9 1)

(set key 9)
(set found false)

(for (set i 0) (lt (get i) (get n)) (incr i) (
        if (is (get input (get i)) (get key)) (
                        (set found true)
                        (break)
        )
)

if (get found) (
        (p "Found key")
) else (
        (p "Key not found")
)
`

sandboxRun(as, testScript);


//
// sandboxRun(as, 'add 1 (add hi 32)');
// sandboxRun(as, 'sub');
// sandboxRun(as, 'add 12 (sub 34 (mult 23 43))');
// sandboxRun(as, 'add 12 (add 34 (add 23 43))');
// sandboxRun(as, 'add 12 (add 34 (add 23 43)');
// sandboxRun(as, 'print "hello" "hi');
// sandboxRun(as, 'print "hello" "hi" 2 4) 3344');
// sandboxRun(as, 'print "hello" "hi" 2 4 () 3344');
// sandboxRun(as, 'print :"hi" 2 4 3344');
// sandboxRun(as, 'print hello"  3344');
// sandboxRun(as, 'print "hello" "hi" 2 4)23 3344');
// sandboxRun(as, 'add 10 30 (sub 24 (add 24 13) (mult 2 4');
// sandboxRun(as, 'add 10 30 sub 24 add 24 13) 2 4');
//
//
// sandboxRun(as, 'add 30 3')
//