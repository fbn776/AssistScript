function gcdAB(a: number, b: number): number {
    if (b === 0) {
        return a;
    }
    return gcdAB(b, a % b);
}

export function gcd(...args: number[]): number {
    let result = args[0];
    for (let i = 1; i < args.length; i++) {
        result = gcdAB(result, args[i]);
    }
    return result;
}
