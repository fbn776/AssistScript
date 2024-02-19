import {hasOnlyRepeatedChars} from "../../src/lang-core/utils/lang_utils";
import {describe} from "node:test";


describe("hasOnlyRepeatedChars", () => {
    test('Checks if `aaaa` string has only repeated characters or not', () => {
        expect(hasOnlyRepeatedChars("aaaa")).toBe(true);
    })
    test('Check if `aaab` has repeated character or not', () => {
        expect(hasOnlyRepeatedChars("aaab")).toBe(false);
    });
});
