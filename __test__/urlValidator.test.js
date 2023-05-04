import { isUrlValid } from "../src/client/js/urlValidator";

describe("isUrlValid", () => {
    test("should return true, when URL is valid", () => {
        expect(isUrlValid("https://www.example.com")).toBe(true);
    })
    test("should return false, when URL does not start with http or https", () => {
        expect(isUrlValid("file://www.example.com")).toBe(false);
    })
});
