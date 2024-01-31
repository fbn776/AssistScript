import Documentation from "./Documentation";

/**
 * TODO; Ya not a good name :(
 * This represents a basic command unit, this encapsulates all the information of a command onto a single object;
 */
export default class CommandUnit {
    names: string[];
    docs: Documentation;
    args: string; // TODO Make a Arguments class
    exec;
    constructor(names: string[], docs: Documentation, args: string, exec: () => unknown) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.exec = exec;
    }
}