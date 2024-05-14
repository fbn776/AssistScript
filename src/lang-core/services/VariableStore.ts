import DataType from "../specs/tokens/DataType";
import {getRoughType} from "../utils/lang_utils";

export interface I_Var {
    value: unknown | unknown[],
    type: DataType,
}

export interface I_Arr {
    value: unknown[],
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
    private readonly var_store = new Map<string, I_Var>();
    private readonly array_store = new Map<string, I_Arr>();

    /** Sets a new variable or updates an existing one
     * @param name The name of the variable (naming conventions should follow the rules of a valid variable name)
     * @param value The value of the variable
     * @param type The type of the variable [Optional: If not specified it is found automatically]
     */
    setVariable(name: string, value: unknown, type?: DataType): void {
        let calcT = type || getRoughType(value);
        this.var_store.set(name, {value, type: calcT});
    }

    /**Sets array variable
     * @param name The name of the array
     * (naming conventions should follow the rules of a valid variable name - not enforced here)
     * @param value The value of the array
     * @internal
     * */
    setArray(name: string, value: unknown[]): void {
        this.array_store.set(name, {value});
    }

    /**
     * Returns the variable if it exists else undefined.
     */
    getVariable(name: string): I_Var | undefined {
        return this.var_store.get(name);
    }

    /**
     * Returns the array if it exists else undefined.
     */
    getArray(name: string): I_Arr | undefined {
        return this.array_store.get(name);
    }

    /**
     * Appends a value to the end of an array if it exists.
     * Does
     *  - Check if the array exists
     *  - Append the value to the array
     * @param name
     * @param value
     */
    appendToArray(name: string, value: unknown): { success: boolean, message?: string } {
        if (!this.array_store.has(name))
            return {
                success: false,
                message: `Array ${name} does not exist.`,
            }

        const arr = this.array_store.get(name)!;
        arr.value.push(value);
        this.array_store.set(name, {
            value: arr.value,
        })

        return {
            success: true,
        }
    }

    /**
     * Deletes a variable or an array from the store.
     */
    deleteVariable(name: string) {
        return this.var_store.delete(name);
    }

    /** Deletes an array from the store*/
    deleteArray(name: string){
        return this.array_store.delete(name);
    }
}
