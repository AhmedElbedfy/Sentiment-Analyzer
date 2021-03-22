import 'babel-polyfill';
import handleSubmit from "../js/formHandler";
import { post } from "../js/formHandler";

describe("handleSubmit", () => {
    test("Testing the handleSubmit() function", () => {

        expect(handleSubmit).toBeDefined();
    })
});


