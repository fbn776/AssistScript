/**
 * Context provider provides the provisions to access external or custom services.
 *
 * The default AssistScript class has the BaseContextProvider as the default context provider.
 * If the user wants to use custom services, they can extend this class and provide the necessary services.
 * Which then can be used inside user-created commands.
 *
 * @see [how to create custom commands](/docs/Create-custom-commands.md)
 */
export default class BaseContextProvider {
    //TODO

    /**
     * A TEST method that returns the current date and time.
     *
     * Returns the current date and time.
     *
     * @returns {Date}
     */
    public getDate(): Date {
        return new Date();
    }
}