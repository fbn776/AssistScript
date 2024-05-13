import Command from "../specs/lang-units/Command";
import ASMakeError from "../errors/ASMakeError";
import {isNameValid} from "../utils/lang_utils";

/**
 * A singleton class that acts as the store for all the commands.
 * @internal
 */
export default class CommandStore {
    private static _instance: CommandStore;
    /** A map of each command;
     * The name of the command is mapped to it's corresponding CommandUnit.
     */
    private _getStore = new Map<string, Command>();

    /**
     * Returns the singleton instance of the CommandStore.
     * @returns The singleton instance of the CommandStore.
     */
    public static getInstance(): CommandStore {
        if (!CommandStore._instance) {
            CommandStore._instance = new CommandStore();
        }

        return CommandStore._instance;
    }

    private constructor() {}

    /**
     * Checks if a command with the given name exists.
     * @param name The name of the command to check.
     * @returns True if a command with the given name exists, false otherwise.
     */
    public hasCommand(name: string): boolean {
        return this._getStore.has(name);
    }

    /**
     * Returns the command with the given name.
     * @param name The name of the command to get.
     * @returns The command with the given name, or null if no such command exists.
     */
    public getCommand(name: string): Command | null {
        return this._getStore.get(name) || null;
    }

    /**
     * Adds a command to the store.
     * @param cmd The instance of the command to add
     */
    public addCommand(cmd: Command) {
        for (let name of cmd.names) {
            if (this._getStore.has(name))
                throw new ASMakeError(`The command name '${name}' already exists.`);

            if (!isNameValid(name))
                throw new ASMakeError(`The command name '${name}' is invalid. Command names should only include alphanumeric characters and underscores. And it should not start with a number.`);

            this._getStore.set(name, cmd);
        }
    }

    /** Returns the store of commands. */
    get getStore(): Map<string, Command> {
        return this._getStore;
    }
}