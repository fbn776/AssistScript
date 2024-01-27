import CommandRepresentation from "./CommandRepresentation";

/**
 * A singleton class that acts as the store for all the commands.
 */
export default class CommandStore {
    private static instance: CommandStore;
    private _store = new Map<string, CommandRepresentation>();

    public static getInstance(): CommandStore {
        if (!CommandStore.instance) {
            CommandStore.instance = new CommandStore();
        }

        return CommandStore.instance;
    }

    private constructor() {

    }
}