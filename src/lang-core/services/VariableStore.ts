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

    setVariable(name: string, value: unknown, type?: DataType): void {
        let calcT = type || getRoughType(value);
        this.store.set(name, {value, type: calcT});
    }

    getVariable(name: string): I_Var | undefined {
        return this.store.get(name);
    }

    deleteVariable(name: string): void {
        if (this.store.has(name))
            this.store.delete(name);
    }

    updateVariable(name: string, value: unknown, type: DataType): void {
        this.store.set(name, {value, type});
    }
}
