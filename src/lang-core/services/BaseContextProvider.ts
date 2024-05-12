import VariableStore from "./VariableStore";
import CommandToken from "../specs/tokens/lexmes/CommandToken";
import {T_InitialState} from "../interpreter/runner/runCommand";

/**
 * Context provider provides the provisions to access internal, external or custom services.
 *
 * The default AssistScript class has the BaseContextProvider as the default context provider.
 * If the user wants to use custom services, they can extend this class and provide the necessary services.
 * Which then can be used inside user-created commands.
 *
 * @see [how to create custom commands](/docs/Create-custom-commands.md)
 */
export default class BaseContextProvider {
    readonly stdout = console;

    /** No of times a loop can run */
    readonly LOOP_LIMIT: number = 200;
    /** Used for loop controls*/
    isBreakCalled: boolean = false;
    isContinueCalled: boolean = false;
    /** Used to check if the interpreter is in a loop statement*/
    isInLoop: boolean = false;

    /** A service that handles the storage of variables. */
    readonly storeService: VariableStore = new VariableStore();

    /** Keep track of the current running command and the current root command*/
    private currCmd: CommandToken | null = null;
    private currState: T_InitialState | null = null;

    get currentCommand() {
        return this.currCmd;
    }
    set currentCommand(cmd) {
        this.currCmd = cmd;
    }

    get currentState() {
        return this.currState;
    }

    set currentState(state) {
        this.currState = state;
    }

}