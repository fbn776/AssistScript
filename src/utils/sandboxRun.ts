import AssistScript from "../lang-core/AssistScript";
import ASBaseError from "../lang-core/errors/ASBaseError";

export default function sandboxRun(as: AssistScript, str: string) {
    console.time("Execution time");
    try {
        const result = as.execute(str);
        console.log(result);
    } catch (e) {
        if (e instanceof ASBaseError)
            console.error(e.prettify());
        else
            console.error(e);
    }

    console.timeEnd("Execution time");
    console.log('Done');
}