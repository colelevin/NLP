import { getValue } from '../src/client/js/formHandler'

describe("getValue from handleSubmit function", () => {
    test("it should give the value of an html id", () => {
        const textAnalysis = { text: "text called" };
        document.body.innerHTML = '<input id="text" value="text called">';
        const formText = getValue('#text')
        expect(formText).toEqual(textAnalysis.text)
    });
});