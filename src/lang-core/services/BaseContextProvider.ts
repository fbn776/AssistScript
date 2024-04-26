import VariableStore from "./VariableStore";

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
    /** No of times a loop can run */
    readonly LOOP_LIMIT: number = 10;

    /** A service that handles the storage of variables. */
    readonly storeService: VariableStore = new VariableStore();
}