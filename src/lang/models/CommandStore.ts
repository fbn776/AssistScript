import CommandUnit from "./CommandUnit";

/**
 * A singleton class that acts as the store for all the commands.
 */
export default class CommandStore {
    private static _instance: CommandStore;
    /** A map of each command;
     * The name of the command is mapped to it's corresponding CommandUnit.
     */
    private _store = new Map<string, CommandUnit>();

    public static getInstance(): CommandStore {
        if (!CommandStore._instance) {
            CommandStore._instance = new CommandStore();
        }

        return CommandStore._instance;
    }

    private constructor() {

    }

    public hasCommand(name: string): boolean {
        return this._store.has(name);
    }
}