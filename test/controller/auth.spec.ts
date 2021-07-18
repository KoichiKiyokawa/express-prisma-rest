import { AuthLogin } from "../../src/controllers/auth";
import { UserRepository } from "../../src/repositories/user";
import bcrypt from "bcryptjs";

jest.mock("../../src/repositories/user");

describe("AuthLogin", () => {
  const dummyUserResponse = {
    email: "dummy@example.com",
    password: bcrypt.hashSync("hogehoge"),
  };
  // @ts-ignore
  UserRepository.prototype.findByEmail.mockResolvedValue(dummyUserResponse);

  it("write to session after login success", async () => {
    const req = {
      body: { email: "", password: "hogehoge" },
      session: { user: undefined },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    // @ts-ignore
    await AuthLogin(req, res);
    expect(req.session.user).toBe(dummyUserResponse);
  });

  it("do not write to session after login failed", async () => {
    const req = {
      body: { email: "", password: "foobar" },
      session: { user: undefined },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    // @ts-ignore
    await AuthLogin(req, res);
    expect(req.session.user).toBeUndefined();
  });
});
