import CommandStore from "./interpreter/CommandStore";
import Runner from "./interpreter/runner/Runner";
import BaseContextProvider from "./services/BaseContextProvider";

import "./stdlib"; // Import the standard library

/**
 * The AssistScript class is the main entry point for the AssistScript language.
 * It provides a simple interface to execute AssistScript code.
 */
export default class AssistScript {
    contextProvider: BaseContextProvider;
    store: CommandStore = CommandStore.getInstance();

    /**
     * Creates a new AssistScript instance.
     * @param ctxProvider The context provider to use.
     * By default, a new BaseContextProvider is used, if you want a custom context provider, you can pass it here.
     */
    constructor(ctxProvider?: BaseContextProvider) {
        this.contextProvider = ctxProvider || new BaseContextProvider()
    }

    /**
     * Executes a given AssistScript code and returns the result.
     * @param str The AssistScript code to execute.
     * @throws ASRuntimeError
     */
    execute(str: string): unknown {
        return Runner.run(str, this);
    }
}
