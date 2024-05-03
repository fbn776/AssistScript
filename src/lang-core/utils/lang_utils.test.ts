import {hasOnlyRepeatedChars, isNameValid} from "./lang_utils";

describe("hasOnlyRepeatedChars", () => {
    test('Checks if `aaaa` has repeated characters or not', () => {
        expect(hasOnlyRepeatedChars("aaaa")).toBe(true);
    })
    test('Check if `aaab` has repeated character or not', () => {
        expect(hasOnlyRepeatedChars("aaab")).toBe(false);
    });
});

describe("isNameValid", () => {
    test('Check if `hello` is a valid name', () => {
        const x = isNameValid("hello")
        expect(x).toBe(true);
    })
});