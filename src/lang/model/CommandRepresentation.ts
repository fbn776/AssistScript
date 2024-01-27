import CommandStore from "./CommandStore";

/**
 * TODO; Ya not a good name :(
 * This represents a basic command unit, this encapsulates all the command logics
 */
export default class CommandRepresentation {
    names: string[];
    docs: string; // TODO Make a documentation class
    args: string; // TODO Make a Arguments class
    exec;
    constructor(names: string[], docs: string, args: string, exec: () => unknown) {
        this.names = names;
        this.docs = docs;
        this.args = args;
        this.exec = exec;
    }
}