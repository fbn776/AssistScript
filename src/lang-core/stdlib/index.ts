/**
 * This is the entry point of the standard library.
 * If you want something to be included in the standard library,
 * then create a file in the stdlib folder and import it here.
 *
 * This file is then imported in the AssistScript.ts file.
 */

/** BASIC **/
import  "./basic/basic";


/** OPERATORS **/
import './operators/logical'
import './operators/comparison'

/** MATHS **/
import "./math/arthemetic";
import "./math/functions";
import "./math/trigonometry";
import "./math/random";
import "./math/constants";

/** CONTROL FLOW **/
import "./ctrl/loops";
import "./ctrl/conditionals";
import "./ctrl/varibles";