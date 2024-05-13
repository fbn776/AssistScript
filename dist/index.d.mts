declare class Documentation {
    readonly title: string;
    readonly aliases: string[];
    readonly body: string;
    readonly syntax: string;
    readonly example: string | null;
    readonly note: string | null;
    category: string | null;
    constructor(title: string, aliases: string[], body: string, syntax: string, example?: string, note?: string);
}

declare enum DataType {
    number = "number",
    string = "string",
    boolean = "boolean",
    command = "command",
    array = "array",
    any = "any",
    void = "void"
}

declare class Parameters {
    readonly types: DataType[];
    readonly num: number;
    readonly isVariable: boolean;
    readonly lastParam: DataType;
    get getParamsLen(): number;
    constructor(num: number, ...params: DataType[]);
}

interface I_Var {
    value: unknown | unknown[];
    type: DataType;
}
interface I_Arr {
    value: unknown[];
}
declare class VariableStore {
    private readonly var_store;
    private readonly array_store;
    setVariable(name: string, value: unknown, type?: DataType): void;
    setArray(name: string, value: unknown[]): void;
    getVariable(name: string): I_Var | undefined;
    getArray(name: string): I_Arr | undefined;
    appendToArray(name: string, value: unknown): {
        success: boolean;
        message?: string;
    };
    deleteVariable(name: string): boolean;
    deleteArray(name: string): boolean;
}

declare enum TokenType {
    STRING = "TOKEN_STRING",
    NUMBER = "TOKEN_NUMBER",
    BOOLEAN = "TOKEN_BOOLEAN",
    COMMAND = "TOKEN_COMMAND",
    SEPARATOR = "TOKEN_SEPARATOR"
}
declare class LangTokenBase<T> {
    value: T;
    readonly type: TokenType;
    readonly tokenID: string;
    constructor(value: T, type: TokenType);
}

declare class CommandToken extends LangTokenBase<string> {
    readonly params: LangTokenBase<unknown>[];
    readonly isInternal: boolean;
    constructor(name: string, params: LangTokenBase<unknown>[], isInternal?: boolean);
    changeName(name: string): void;
    get commandName(): string;
    appendParam(param: LangTokenBase<unknown>): void;
}

type T_InitialState = {
    rootToken: CommandToken;
    originalStr: string;
};

interface STDOUT {
    print: typeof console.log;
}
declare class BaseContextProvider {
    readonly stdout: STDOUT;
    readonly LOOP_LIMIT: number;
    isBreakCalled: boolean;
    isContinueCalled: boolean;
    isInLoop: boolean;
    readonly storeService: VariableStore;
    private currCmd;
    private currState;
    get currentCommand(): CommandToken | null;
    set currentCommand(cmd: CommandToken | null);
    get currentState(): T_InitialState | null;
    set currentState(state: T_InitialState | null);
}

type CmdExec = (ctx: BaseContextProvider, ...args: any[]) => any;

declare class Command {
    names: string[];
    docs: Documentation;
    params: Parameters;
    returnType: DataType;
    exec: CmdExec;
    constructor(names: string[], docs: Documentation, params: Parameters, returnType: DataType, exec: CmdExec);
}

declare class CommandStore {
    private static _instance;
    private _getStore;
    static getInstance(): CommandStore;
    private constructor();
    hasCommand(name: string): boolean;
    getCommand(name: string): Command | null;
    addCommand(cmd: Command): void;
    get getStore(): Map<string, Command>;
}

declare class AssistScript {
    contextProvider: BaseContextProvider;
    store: CommandStore;
    constructor(ctxProvider?: BaseContextProvider);
    run(str: string): unknown;
    sandboxRun(str: string): unknown;
}

declare class CommandBuilder {
    private _names;
    private _docs;
    private _args;
    private _returnType;
    private _exec;
    private readonly _category;
    constructor(category?: string);
    names(...names: string[]): this;
    directDocs(title: string, aliases: string[] | null, body: string, syntax: string, example?: string, note?: string): this;
    docs(docs: Documentation): this;
    args(num: number, ...params: DataType[]): this;
    returnType(returnType: DataType): this;
    run(exec: CmdExec): this;
    build(): Command;
    reset(): void;
}

declare class DocsBuilder {
    private title1;
    private aliases1;
    private body1;
    private syntax1;
    private example1;
    private note1;
    name(title: string): DocsBuilder;
    aliases(...aliases: string[]): DocsBuilder;
    description(body: string): DocsBuilder;
    syntax(syntax: string): DocsBuilder;
    example(example: string): DocsBuilder;
    note(note: string): DocsBuilder;
    build(): Documentation;
}

export { AssistScript, BaseContextProvider, CommandBuilder, CommandStore, DataType, DocsBuilder };
