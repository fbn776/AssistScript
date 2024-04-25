import AssistScript from "../AssistScript";
import ASRuntimeError from "../lang-core/errors/ASRuntimeError";


export default function sandboxRun(as: AssistScript, str: string) {
    console.log('Running: ', str);
    console.time("Execution time");
    try {
        const result = as.execute(str);
        console.log('Result: ', result);
    } catch (e) {
        if (e instanceof ASRuntimeError)
            console.error(e.prettyPrint());
        else
            console.error(e);
    }
    console.timeEnd("Execution time");
    console.log('Done');
}