import ASMakeError from "../errors/ASMakeError";
import Documentation from "./lang-units/Documentation";

export class DocsBuilder {
    private title1: string | null = null;
    private aliases1: string[] = [];
    private body1: string | null = null;
    private syntax1: string | null = null;
    private example1: string | null = null;
    private note1: string | null = null;

    /** The title or name of the command; REQUIRED*/
    title(title: string): DocsBuilder {
        this.title1 = title;
        return this;
    }

    /** The aliases (if it exists) of the command; OPTIONAL*/
    aliases(...aliases: string[]): DocsBuilder {
        this.aliases1 = aliases;
        return this;
    }

    /** The explanation body of the command; REQUIRED*/
    body(body: string): DocsBuilder {
        this.body1 = body;
        return this;
    }

    /** The basic syntax of the command; REQUIRED*/
    syntax(syntax: string): DocsBuilder {
        this.syntax1 = syntax;
        return this;
    }

    /** The basic example showing how to use the command; REQUIRED*/
    example(example: string): DocsBuilder {
        this.example1 = example;
        return this;
    }

    /** The notes or special information to be shown; OPTIONAL*/
    note(note: string): DocsBuilder {
        this.note1 = note;
        return this;
    }

    /**
     * Builds the documentation object
     * This should be called only on the final step.
     * @throws {ASMakeError} If any of the required fields are not set
     */
    build(): Documentation {
        if (this.title1 === null)
            throw new ASMakeError("Title is a required field for documentation, it is not set");

        if (this.body1 === null)
            throw new ASMakeError("Body is a required field for documentation, it is not set");

        if (this.syntax1 === null)
            throw new ASMakeError("Syntax is a required field for documentation, it is not set");

        if (this.example1 === null)
            throw new ASMakeError("Example is a required field for documentation, it is not set");

        return new Documentation(this.title1, this.aliases1, this.body1, this.syntax1, this.example1, this.note1 || undefined);
    }
}