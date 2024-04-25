/** Represents unit documentation of a command; each command has a `Documentation` object associated with it.
 * Used for displaying help and other docs related stuff.
 */
export default class Documentation {
    readonly title;
    readonly aliases;
    readonly body;
    readonly syntax;
    readonly example;
    readonly note;

    constructor(title: string, aliases: string[], body: string, syntax: string, example?: string, note?: string) {
        this.title = title;
        this.aliases = aliases;
        this.body = body;
        this.syntax = syntax;
        this.example = example || null;
        this.note = note || null;
    }
}

