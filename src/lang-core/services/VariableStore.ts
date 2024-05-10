import DataType from "../specs/tokens/DataType";
import {getRoughType} from "../utils/lang_utils";

interface I_Var {
    value: unknown,
    type: DataType
}

/**
 * A service that handles the storage of variables.
 *
 * It does;
 *      - Store variables
 *      - Retrieve variables
 *      - Update variables
 *      - Delete variables
 *      - Check if a variable exists
 *
 * @internal
 */
export default class VariableStore {
    private store = new Map<string, I_Var>();

    /**
     * Checks if a variable exists in the store.
     * @param name
     */
    exists(name: string): boolean {
        return this.store.has(name);
    }

    /** Sets a new variable or updates an existing one
     * @param name The name of the variable (naming conventions should follow the rules of a valid variable name)
     * @param value The value of the variable
     * @param type The type of the variable [Optional: If not specified it is found automatically]
     */
    setVariable(name: string, value: unknown, type?: DataType): void {
        let calcT = type || getRoughType(value);
        this.store.set(name, {value, type: calcT});
    }

    /**
     * Returns the variable if it exists.
     * @param name
     */
    getVariable(name: string): I_Var | undefined {
        return this.store.get(name);
    }

    /**
     * Deletes a variable from the store.
     * @param name
     */
    deleteVariable(name: string): void {
        if (this.store.has(name))
            this.store.delete(name);
    }
}
