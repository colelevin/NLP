import { checkRegExp } from "../src/client/js/nameChecker"

describe("check URL input using checkRegExp", () => {
    test("it should throw error on bad url", () => {
        const input = 'htpak.www.udacity.com';
        const inputCheck = checkRegExp(input);
        expect(inputCheck).toEqual(false);
    });
});