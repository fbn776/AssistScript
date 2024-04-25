import ASBaseError from "./ASBaseError";
import LangTokenBase from "../specs/tokens/LangTokenBase";
import {T_InitialState} from "../interpreter/runner/runCommand";
import CommandToken from "../specs/tokens/lexmes/CommandToken";
import {displayAST} from "../utils/lang_utils";
import {ASTErrorDisplay} from "../utils/ASTErrorDisplay";

interface I_ErrorData {
    initial: T_InitialState,
    occurredAt: LangTokenBase<any>,
}

export default class ASRuntimeError extends ASBaseError {
    private data: I_ErrorData | null;
    constructor(message: string, data: I_ErrorData | null) {
        super(message);
        this.data = data;
    }

    public prettyPrint(): string {
        return `${this.name}
Reason: ${this.message}

${this.data?.initial.originalStr}
${ASTErrorDisplay(this.data!.initial.rootToken, this.data!.occurredAt.tokenID)}
`
    }
}