import CommandStore from "../../interpreter/CommandStore";
import {CommandBuilder} from "../../specs/CommandBuilder";
import DataType from "../../specs/tokens/DataType";
import {DocsBuilder} from "../../specs/DocsBuilder";

const store = CommandStore.getInstance();
const builder = new CommandBuilder();

// SINE
store.addCommand(builder
    .names('sin', 'sine')
    .docs(new DocsBuilder()
        .name('sin')
        .aliases('sine')
        .description('Returns the sine of the given angle in radians.')
        .syntax('sin <angle>')
        .example('sin 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.sin(angle))
    .build()
)

// COSINE
store.addCommand(builder
    .names('cos', 'cosine')
    .docs(new DocsBuilder()
        .name('cos')
        .aliases('cosine')
        .description('Returns the cosine of the given angle in radians.')
        .syntax('cos <angle>')
        .example('cos 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.cos(angle))
    .build()
)

// TANGENT
store.addCommand(builder
    .names('tan', 'tangent')
    .docs(new DocsBuilder()
        .name('tan')
        .aliases('tangent')
        .description('Returns the tangent of the given angle in radians.')
        .syntax('tan <angle>')
        .example('tan 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.tan(angle))
    .build()
)

// ARCSINE
store.addCommand(builder
    .names('asin', 'arcsine')
    .docs(new DocsBuilder()
        .name('asin')
        .aliases('arcsine')
        .description('Returns the arcsine of the given angle in radians.')
        .syntax('asin <angle>')
        .example('asin 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.asin(angle))
    .build()
)

// ARCCOSINE
store.addCommand(builder
    .names('acos', 'arccosine')
    .docs(new DocsBuilder()
        .name('acos')
        .aliases('arccosine')
        .description('Returns the arccosine of the given angle in radians.')
        .syntax('acos <angle>')
        .example('acos 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.acos(angle))
    .build()
)

// ARCTANGENT
store.addCommand(builder
    .names('atan', 'arctangent')
    .docs(new DocsBuilder()
        .name('atan')
        .aliases('arctangent')
        .description('Returns the arctangent of the given angle in radians.')
        .syntax('atan <angle>')
        .example('atan 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.atan(angle))
    .build()
)

// ARCTANGENT2
store.addCommand(builder
    .names('atan2', 'arctangent2')
    .docs(new DocsBuilder()
        .name('atan2')
        .aliases('arctangent2')
        .description('Returns the arctangent of the quotient of its arguments.')
        .syntax('atan2 <y> <x>')
        .example('atan2 1 1')
        .build()
    )
    .args(2, DataType.number)
    .returnType(DataType.number)
    .run((_, y, x) => Math.atan2(y, x))
    .build()
)

// HYPERBOLIC SINE
store.addCommand(builder
    .names('sinh', 'hsine')
    .docs(new DocsBuilder()
        .name('sinh')
        .aliases('hsine')
        .description('Returns the hyperbolic sine of the given angle in radians.')
        .syntax('sinh <angle>')
        .example('sinh 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.sinh(angle))
    .build()
)

// HYPERBOLIC COSINE
store.addCommand(builder
    .names('cosh', 'hcosine')
    .docs(new DocsBuilder()
        .name('cosh')
        .aliases('hcosine')
        .description('Returns the hyperbolic cosine of the given angle in radians.')
        .syntax('cosh <angle>')
        .example('cosh 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.cosh(angle))
    .build()
)

// HYPERBOLIC TANGENT
store.addCommand(builder
    .names('tanh', 'htangent')
    .docs(new DocsBuilder()
        .name('tanh')
        .aliases('htangent')
        .description('Returns the hyperbolic tangent of the given angle in radians.')
        .syntax('tanh <angle>')
        .example('tanh 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.tanh(angle))
    .build()
)

// HYPERBOLIC ARCSINE
store.addCommand(builder
    .names('asinh', 'arcsineh')
    .docs(new DocsBuilder()
        .name('asinh')
        .aliases('arcsineh')
        .description('Returns the hyperbolic arcsine of the given angle in radians.')
        .syntax('asinh <angle>')
        .example('asinh 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.asinh(angle))
    .build()
)

// HYPERBOLIC ARCCOSINE
store.addCommand(builder
    .names('acosh', 'arccosineh')
    .docs(new DocsBuilder()
        .name('acosh')
        .aliases('arccosineh')
        .description('Returns the hyperbolic arccosine of the given angle in radians.')
        .syntax('acosh <angle>')
        .example('acosh 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.acosh(angle))
    .build()
)

// HYPERBOLIC ARCTANGENT
store.addCommand(builder
    .names('atanh', 'arctangenth')
    .docs(new DocsBuilder()
        .name('atanh')
        .aliases('arctangenth')
        .description('Returns the hyperbolic arctangent of the given angle in radians.')
        .syntax('atanh <angle>')
        .example('atanh 1')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => Math.atanh(angle))
    .build()
)

// DEGREES TO RADIANS
store.addCommand(builder
    .names('degToRad', 'd2r', 'deg2rad', 'deg')
    .docs(new DocsBuilder()
        .name('deg')
        .aliases('d2r', 'deg2rad', 'degToRad')
        .description('Converts the given angle in degrees to radians.')
        .syntax('degToRad <angle>')
        .example('degToRad 90')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => angle * Math.PI / 180)
    .build()
)

// RADIANS TO DEGREES
store.addCommand(builder
    .names('radToDeg', 'r2d', 'rad2deg', 'rad')
    .docs(new DocsBuilder()
        .name('rad')
        .aliases('r2d', 'rad2deg', 'radToDeg')
        .description('Converts the given angle in radians to degrees.')
        .syntax('radToDeg <angle>')
        .example('radToDeg 1.57')
        .build()
    )
    .args(1, DataType.number)
    .returnType(DataType.number)
    .run((_, angle) => angle * 180 / Math.PI)
    .build()
)
