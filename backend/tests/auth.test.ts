import { describe, it, expect } from "bun:test";
import { AuthScema } from "../schemas";

describe("loginSchema", () => {

  it("valid input", () => {
    const validData = {
      email: "test@example.com",
      password: "Password123"
    };
    expect(() => AuthScema.parse(validData)).not.toThrow();
  });

  it("rejects invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      password: "password123"
    };
    expect(() => AuthScema.parse(invalidData));
  });

  it("rejects short password", () => {
    const invalidData = {
      email: "test@example.com",
      password: "short"
    };

    expect(() => AuthScema.parse(invalidData)).toThrow();
  });

});

