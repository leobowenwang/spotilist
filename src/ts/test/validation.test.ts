import { describe, expect, test } from "vitest";
import { validateValue } from "../validation.ts";

describe("validateValue", () => {
  test("should validate a username correctly", () => {
    const result = validateValue("username", "john_doe");
    expect(result).toEqual({
      isValid: true,
      errorMessage: "Username must be at least 4 characters.",
    });

    const result2 = validateValue("username", "abc");
    expect(result2).toEqual({
      isValid: false,
      errorMessage: "Username must be at least 4 characters.",
    });
  });

  test("should validate an age correctly", () => {
    const result = validateValue("age", 25);
    expect(result).toEqual({
      isValid: true,
      errorMessage: "Age must be between 1 and 100.",
    });

    const result2 = validateValue("age", 101);
    expect(result2).toEqual({
      isValid: false,
      errorMessage: "Age must be between 1 and 100.",
    });
  });

  test("should validate a password correctly", () => {
    const result = validateValue("password", "Password123!");
    expect(result).toEqual({
      isValid: true,
      errorMessage:
        "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });

    const result2 = validateValue("password", "abc");
    expect(result2).toEqual({
      isValid: false,
      errorMessage:
        "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  });

  test("should validate an email correctly", () => {
    const result = validateValue("email", "test@example.com");
    expect(result).toEqual({
      isValid: true,
      errorMessage: "Invalid email address.",
    });

    const result2 = validateValue("email", "not-an-email");
    expect(result2).toEqual({
      isValid: false,
      errorMessage: "Invalid email address.",
    });
  });
});
