import Documentation from "./Documentation";
import Arguments from "./Arguments";

/**
 * TODO; Ya not a good name :(
 * This represents a basic command unit, this encapsulates all the information of a command onto a single object;
 */
export default class CommandUnit {
    names: string[];
    docs: Documentation;
    args: Arguments;
    exec;
    constructor(names: string[], docs: Documentation, args: Arguments, exec: () => unknown) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.exec = exec;
    }
}