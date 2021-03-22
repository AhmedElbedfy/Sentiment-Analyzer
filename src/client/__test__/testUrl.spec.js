import { checkURL } from "../js/checkURL";

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(typeof checkURL).toBe('function');
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        expect(checkURL(123)).toBe(false);
        expect(checkURL("text")).toBe(false);
        expect(checkURL(".com")).toBe(false);
        expect(checkURL('text&num')).toBe(false);
        expect(checkURL('')).toBe(false);
    })

    test('Testing the checkUrl function return true for valid url', () => {
        expect(checkURL('https://jestjs.io/docs/expect')).toBe(true);
        expect(checkURL('https://en.wikipedia.org/wiki/Sirius')).toBe(true);
        expect(checkURL('https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6')).toBe(true);

    })
})
