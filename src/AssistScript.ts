import CommandStore from "./lang-core/interpreter/CommandStore";
import Runner from "./lang-core/interpreter/runner/Runner";

export default class AssistScript {
    // stdin: string;
    // stdout: string;
    // stdout: string;

    store: CommandStore = CommandStore.getInstance();

    constructor() {

    }

    /**
     * Executes the given string
     * @param str
     * @throws ASRuntimeError
     */
    execute(str: string): unknown {
        return Runner.run(str);
    }
}
