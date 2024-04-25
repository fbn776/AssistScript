import BaseContextProvider from "../BaseContextProvider";

/** The command executable function type.*/
export type CmdExec = (ctx: unknown, ...args: any[]) => any;