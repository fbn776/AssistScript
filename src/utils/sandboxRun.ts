import AssistScript from "../lang-core/AssistScript";
import ASBaseError from "../lang-core/errors/ASBaseError";
import {ASCII_bl_corner, ASCII_horizontal, ASCII_tl_corner} from "./ASCII_char";

export default function sandboxRun(as: AssistScript, str: string) {
    console.time("Execution time");
    const lgStr = '\nRunning command:\n' + str.trim();
    const maxLen = lgStr.split('\n').reduce((acc, curr) => curr.length > acc ? curr.length : acc, 0);

    console.log(lgStr);
    console.log(`${ASCII_tl_corner}${ASCII_horizontal.repeat(maxLen - 1)}`);

    try {
        const result = as.run(str);
        if (result !== undefined)
            console.log(`${ASCII_bl_corner} RETURN >`, result);
    } catch (e) {
        if (e instanceof ASBaseError)
            console.error(e.prettify());
        else
            console.error(e);
    }

    console.timeEnd("Execution time");
    console.log('Done');
}

