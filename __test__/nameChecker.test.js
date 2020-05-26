import checkForName from "../src/client/js/nameChecker"
describe(checkForName, () => {
    test("checkForName it is defined", () => {
        expect(checkForName).toBeDefined
    });
});