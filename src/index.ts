import {CommandBuilder} from "./lang-core/specs/CommandBuilder";
import {DocsBuilder} from "./lang-core/specs/DocsBuilder";
import Parameters from "./lang-core/specs/lang-units/Parameters";
import DataType from "./lang-core/specs/tokens/DataType";
import AssistScript from "./AssistScript";
import sandboxRun from "./utils/sandboxRun";
import BaseContextProvider from "./lang-core/BaseContextProvider";

class TestContextProvider extends BaseContextProvider {
    clear() {
        console.clear();
    }
}

const as = new AssistScript(new TestContextProvider());

sandboxRun(as, 'add 1 (add hi 32)');
sandboxRun(as, 'sub');
sandboxRun(as, 'add 12 (sub 34 (mult 23 43))');
sandboxRun(as, 'add 12 (add 34 (add 23 43))');
sandboxRun(as, 'add 12 (add 34 (add 23 43)');
sandboxRun(as, 'print "hello" "hi');
sandboxRun(as, 'print "hello" "hi" 2 4) 3344');
sandboxRun(as, 'print "hello" "hi" 2 4 () 3344');
sandboxRun(as, 'print :"hi" 2 4 3344');
sandboxRun(as, 'print hello"  3344');
sandboxRun(as, 'print "hello" "hi" 2 4)23 3344');
sandboxRun(as, 'add 10 30 (sub 24 (add 24 13) (mult 2 4');
sandboxRun(as, 'add 10 30 sub 24 add 24 13) 2 4');


sandboxRun(as, 'add 30 3')



