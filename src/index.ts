import AssistScript from "./lang-core/AssistScript";
import BaseContextProvider from "./lang-core/services/BaseContextProvider";
import CommandStore from "./lang-core/interpreter/CommandStore";
import {CommandBuilder} from "./lang-core/specs/CommandBuilder";
import {DocsBuilder} from "./lang-core/specs/DocsBuilder";
import DataType from "./lang-core/specs/tokens/DataType";

/** The actual AssistScript class */
export default AssistScript;

/** Other useful classes */
export {BaseContextProvider, CommandStore, CommandBuilder, DocsBuilder, DataType};