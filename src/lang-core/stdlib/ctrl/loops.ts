import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";
import ASGracefulExitError from "../../errors/ASGracefulExitError";
import ASRuntimeError from "../../errors/ASRuntimeError";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

store.addCommand(builder
    .names('break')
    .args(0)
    .docs(new DocsBuilder()
        .name('break')
        .description('Breaks out of the loop in which it is called.')
        .syntax('break')
        .example('(set i 0) (while (TRUE)) ((print (get i) (if (gt (get i) 5) (break))) (set i (add (get i) 1)))')
        .build()
    )
    .returnType(DataType.void)
    .run(_ => {
        if(!_.isInLoop)
            throw new ASRuntimeError('`break` can only be used inside a loop.', {
                state: _.currentState!,
                occurredCmd: _.currentCommand!,
            })
        _.isBreakCalled = true;
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
        console.log('while: condition:', condition())

        let limit = 0;
        _.isInLoop = true;
        while (condition()) {
            if (_.isBreakCalled) {
                _.isBreakCalled = false;
                break;
            }

            if(_.isContinueCalled) {
                _.isContinueCalled = false;
                continue;
            }

            console.log('limit', limit)

            if ((limit++) >= _.LOOP_LIMIT) {
                _.isInLoop = false;
                throw new ASGracefulExitError(`Loop limit of ${_.LOOP_LIMIT} exceeded.`);
            }

            command();
        }
        _.isInLoop = false;
    })
    .build()
)


