import CommandStore from "./lang-core/interpreter/CommandStore";
import Runner from "./lang-core/interpreter/runner/Runner";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";

import "./lang-core/stdlib/index"; // Import the standard library

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
