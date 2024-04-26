import Command from "../../specs/lang-units/Command";
import {ASCII_horizontal, ASCII_l_cross, ASCII_tl_corner, ASCII_vertical} from "../../../utils/ASCII_char";

export function prettyHelp(cmd: Command) {
    const docs = cmd.docs;
    let str = '\n ' + docs.title + ' \n';

    str += ASCII_tl_corner + ASCII_horizontal.repeat(docs.title.length + 1) + '\n';
    docs.aliases.length > 0 && (str += `${ASCII_l_cross} Aliases: ${docs.aliases.join(', ')}\n`)

    str += ASCII_l_cross + ' ' + docs.body + '\n';
    str += ASCII_l_cross + ' Syntax: ' + docs.syntax + '\n';
    docs.example && (str += ASCII_l_cross + ' Example: ' + docs.example + '\n');
    docs.note && (str += ASCII_l_cross + ' Note: ' + docs.note + '\n');

    return str;
}