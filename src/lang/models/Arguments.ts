enum ArgType {
    number,
    string,
    command
}


export default class Arguments {
    readonly args: ArgType[] = [];
    readonly num;

    constructor(...args: ArgType[]) {
        this.args = args;
        this.num = args.length;
    }
}




