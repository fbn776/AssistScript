import DataTypes from "./tokens/DataType";


export default class Arguments {
    readonly args: DataTypes[] = [];
    readonly num;

    constructor(...args: DataTypes[]) {
        this.args = args;
        this.num = args.length;
    }
}




