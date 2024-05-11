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
    private _store = new Map<string, Command>();

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

    public getCommand(name: string): Command | null {
        return this._store.get(name) || null;
    }

    public addCommand(cmd: Command) {
        for (let name of cmd.names) {
            if (this._store.has(name))
                throw new ASMakeError(`The command name '${name}' already exists.`);

            if (!isNameValid(name))
                throw new ASMakeError(`The command name '${name}' is invalid. Command names should only include alphanumeric characters and underscores. And it should not start with a number.`);

            this._store.set(name, cmd);
        }
    }
}