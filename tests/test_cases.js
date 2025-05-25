// test writing: npm test

const {
    CheckName,
    CheckEmail,
    CheckUsername,
    CheckPoints,
    CheckLocationName
} = require('./validators');

describe('Validation functions', () => {
    test('CheckName', () => {
        expect(CheckName("John Doe")).toBe(false);
        expect(CheckName("John_Doe")).toBe(false);
        expect(CheckName("john123")).toBe(false);
        expect(CheckName("")).toBe(false);
    });

    test('CheckEmail', () => {
        expect(CheckEmail("test@example.com")).toBe(true);
        expect(CheckEmail("test.example.com")).toBe(false);
        expect(CheckEmail("test@.com")).toBe(false);
    });

    test('CheckUsername', () => {
        expect(CheckUsername("User1")).toBe(true);
        expect(CheckUsername("1User")).toBe(false);
        expect(CheckUsername("User_1")).toBe(false);
    });

    test('CheckPoints', () => {
        expect(CheckPoints(10)).toBe(true);
        expect(CheckPoints(10.5)).toBe(false);
        expect(CheckPoints("10")).toBe(false);
    });

    test('CheckLocationName', () => {
        expect(CheckLocationName("Athens1")).toBe(true);
        expect(CheckLocationName("1Athens")).toBe(false);
        expect(CheckLocationName("A!thens")).toBe(false);
        expect(CheckLocationName("A" + "a".repeat(29))).toBe(true); // exactly 30 chars
        expect(CheckLocationName("A" + "a".repeat(30))).toBe(false); // 31 chars
    });

    test('CheckPhone', () => {
        expect(CheckPhone("+30 1234567890")).toBe(true);
        expect(CheckPhone("+301234567890")).toBe(false);
        expect(CheckPhone("1234567890")).toBe(false);
        expect(CheckPhone("+30 123456789")).toBe(false);
    });
});