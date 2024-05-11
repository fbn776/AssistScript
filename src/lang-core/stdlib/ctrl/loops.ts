import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import ASGracefulExitError from "../../errors/ASGracefulExitError";
import ASRuntimeError from "../../errors/ASRuntimeError";
import ASInterrupt from "../../errors/ASInterrupt";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// BREAK
store.addCommand(builder
    .names('break')
    .args(0)
    .docs(new DocsBuilder()
        .name('break')
        .description('Breaks out of the loop in which it is called.')
        .syntax('break')
        .note('Internally it throws an `ASInterrupt` error to interrupt the execution, but is gracefully handled. When implementing your own commands, you should always handle this error')
        .example(`
(set i 0)
(while (lt (get i) 10) (
    (if (eq (get i) 5) (
        (print i is 5)
        (continue)
    ))
    
    (print (get i))    
    (incr i)    
))`)
        .build()
    )
    .returnType(DataType.void)
    .run(_ => {
        if (!_.isInLoop)
            throw new ASRuntimeError('`break` can only be used inside a loop.', {
                state: _.currentState!,
                occurredCmd: _.currentCommand!,
            })
        _.isBreakCalled = true;
        throw new ASInterrupt('Continue called');
    })
    .build()
)

// CONTINUE
store.addCommand(builder
    .names('continue')
    .args(0)
    .docs(new DocsBuilder()
        .name('continue')
        .description('Skips the rest of the loop body and does the next iteration in which it is called.')
        .note('Internally it throws an `ASInterrupt` error to interrupt the execution, but is gracefully handled. When implementing your own commands, you should always handle this error')
        .syntax('continue')
        .example(`
(set i 0)
(while (lt (get i) 10) (
    (if (eq (get i) 5) (
        (print i is 5)
        (break)
    ))
    
    (print (get i))    
    (incr i)    
))`)
        .build()
    )
    .returnType(DataType.void)
    .run(_ => {
        if (!_.isInLoop)
            throw new ASRuntimeError('`continue` can only be used inside a loop.', {
                state: _.currentState!,
                occurredCmd: _.currentCommand!,
            })
        _.isContinueCalled = true;

        throw new ASInterrupt('Continue called');
    })
    .build()
)

// WHILE
store.addCommand(builder
    .names('while')
    .args(2, DataType.command)
    .docs(new DocsBuilder()
        .name('while')
        .description('Loops while the condition is true.')
        .syntax('while <condition> <command>')
        .example('while (TRUE) (p (get i))')
        .build()
    )
    .returnType(DataType.void)
    .run((_, condition: () => boolean, command: () => unknown) => {

        let limit = 0;
        _.isInLoop = true;
        while (condition()) {
            if (_.isBreakCalled) {
                _.isBreakCalled = false;
                break;
            }

            if ((limit++) >= _.LOOP_LIMIT) {
                _.isInLoop = false;
                throw new ASGracefulExitError(`Loop limit of ${_.LOOP_LIMIT} exceeded.`);
            }

            if (_.isContinueCalled) {
                _.isContinueCalled = false;
            } else {
                try {
                    command();
                } catch (e) {
                    if (!(e instanceof ASInterrupt)) {
                        throw e;
                    }
                }
            }
        }
        _.isInLoop = false;
    })
    .build()
)

