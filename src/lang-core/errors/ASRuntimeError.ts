import ASBaseError from "./ASBaseError";
import CommandToken from "../specs/tokens/lexmes/CommandToken";
import LangTokenBase from "../specs/tokens/LangTokenBase";
import {T_InitialState} from "../interpreter/runner/runCommand";

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
reason: ${this.message}`
    }
}