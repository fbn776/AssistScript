import ASMakeError from "../errors/ASMakeError";

/** Represents a unit documentation of a command, each command a `Documentation` object associated with it.
 * Used for displaying help and other docs related stuff.
 */
export default class Documentation {
    readonly title;
    readonly aliases;
    readonly body;
    readonly syntax;
    readonly example;
    readonly note;

    constructor(title: string, aliases: string[], body: string, syntax: string, example: string, note?: string) {
        this.title = title;
        this.aliases = aliases;
        this.body = body;
        this.syntax = syntax;
        this.example = example;
        this.note = note || null;
    }
}

export class DocsBuilder {
    private title1: string | null = null;
    private aliases1: string[] | null = null;
    private body1: string | null = null;
    private syntax1: string | null = null;
    private example1: string | null = null;
    private note1: string | null = null;

    title(title: string): DocsBuilder {
        this.title1 = title;
        return this;
    }
    aliases(...aliases: string[]): DocsBuilder {
        this.aliases1 = aliases;
        return this;
    }

    body(body: string): DocsBuilder {
        this.body1 = body;
        return this;
    }

    syntax(syntax: string): DocsBuilder {
        this.syntax1 = syntax;
        return this;
    }

    example(example: string): DocsBuilder {
        this.example1 = example;
        return this;
    }

    note(note: string): DocsBuilder {
        this.note1 = note;
        return this;
    }

    build(): Documentation {
        if (this.title1 === null)
            throw new ASMakeError("Title is a required field for documentation, it is not set");

        if (this.aliases1 === null)
            throw new ASMakeError("Aliases is a required field for documentation, it is not set");

        if (this.body1 === null)
            throw new ASMakeError("Body is a required field for documentation, it is not set");

        if (this.syntax1 === null)
            throw new ASMakeError("Syntax is a required field for documentation, it is not set");

        if (this.example1 === null)
            throw new ASMakeError("Example is a required field for documentation, it is not set");


        return new Documentation(this.title1, this.aliases1, this.body1, this.syntax1, this.example1, this.note1 || undefined);
    }
}
