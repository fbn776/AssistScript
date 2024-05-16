import AssistScript from "./lang-core/AssistScript";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";
import CommandStore from "./lang-core/interpreter/CommandStore";
import {CommandBuilder} from "./lang-core/specs/CommandBuilder";
import {DocsBuilder} from "./lang-core/specs/DocsBuilder";
import DataType from "./lang-core/specs/tokens/DataType";
import ASRuntimeError from "./lang-core/errors/ASRuntimeError";
import ASLangError from "./lang-core/errors/ASLangError";
import ASMakeError from "./lang-core/errors/ASMakeError";
import ASInterrupt from "./lang-core/errors/ASInterrupt";
import ASGracefulExitError from "./lang-core/errors/ASGracefulExitError";
import ASBaseError from "./lang-core/errors/ASBaseError";

const ASErrors = {
    ASBaseError,
    ASRuntimeError,
    ASLangError,
    ASMakeError,
    ASInterrupt,
    ASGracefulExitError
}


/** Other useful classes */
export {AssistScript, BaseContextProvider, CommandStore, CommandBuilder, DocsBuilder, DataType, ASErrors};