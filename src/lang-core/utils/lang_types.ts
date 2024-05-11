import BaseContextProvider from "../services/BaseContextProvider";

/** The command executable function type.*/
export type CmdExec = (ctx: BaseContextProvider, ...args: any[]) => any;