import CommandStore from "./interpreter/CommandStore";
import Runner from "./interpreter/runner/Runner";
import BaseContextProvider from "./services/BaseContextProvider";

import "./stdlib"; // Import the standard library

/**
 * The AssistScript class is the main entry point for the AssistScript language.
 *
 */
export default class AssistScript {
    contextProvider: BaseContextProvider;
    store: CommandStore = CommandStore.getInstance();

    constructor(ctxProvider?: BaseContextProvider) {
        this.contextProvider = ctxProvider || new BaseContextProvider()
    }

    /**
     * Executes the given string
     * @param str
     * @throws ASRuntimeError
     */
    execute(str: string): unknown {
        return Runner.run(str, this);
    }
}
