import ASBaseError from "./ASBaseError";
import LangTokenBase from "../specs/tokens/LangTokenBase";
import {T_InitialState} from "../interpreter/runner/runCommand";
import {ASTErrorDisplay} from "../utils/ASTErrorDisplay";

interface I_ErrorData {
    /** The initial state of the command. i.e., contains the root command and original execution string */
    state: T_InitialState,
    /** The command where the error occurred */
    occurredCmd: LangTokenBase<any>,
}

/**
 * An error class that represents an error that occurred during runtime.
 */
export default class ASRuntimeError extends ASBaseError {
    private data: I_ErrorData | null;

    /**
     * Creates an instance of ASRuntimeError.
     * @param message
     * @param data
     */
    constructor(message: string, data: I_ErrorData | null) {
        super(message);
        this.data = data;
    }

    public prettify(): string {
        return `${this.name}
Reason: ${this.message}

${this.data?.state.originalStr}
${ASTErrorDisplay(this.data!.state.rootToken, this.data!.occurredCmd.tokenID)}
`
    }
}