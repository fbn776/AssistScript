import CommandStore from "./lang-core/interpreter/CommandStore";
import Runner from "./lang-core/interpreter/runner/Runner";
import BaseContextProvider from "./lang-core/BaseContextProvider";

/**
 * The AssistScript class is the main entry point for the AssistScript language.
 *
 */
export default class AssistScript<T extends BaseContextProvider> {
    contextProvider: T;

    store: CommandStore = CommandStore.getInstance();

    constructor(ctxProvider: T) {
        this.contextProvider = ctxProvider;
    }

    /**
     * Executes the given string
     * @param str
     * @throws ASRuntimeError
     */
    execute(str: string): unknown {
        return Runner.run(str, this.store);
    }
}
