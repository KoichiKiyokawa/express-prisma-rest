import { AuthLogin, AuthLogout } from "../../src/controllers/auth";
import { UserRepository } from "../../src/repositories/user";
import bcrypt from "bcryptjs";
import { resMock } from "./core";

jest.mock("../../src/repositories/user");

const dummyUserResponse = {
  email: "dummy@example.com",
  password: bcrypt.hashSync("hogehoge"),
};

describe("AuthLogin", () => {
  (UserRepository as jest.Mock).prototype.findByEmail.mockResolvedValue(
    dummyUserResponse
  );

  it("write to session after login success", async () => {
    const req = {
      body: { email: "", password: "hogehoge" },
      session: { user: undefined },
    };
    // @ts-ignore
    await AuthLogin(req, resMock);
    expect(req.session.user).toBe(dummyUserResponse);
  });

  it("do not write to session after login failed", async () => {
    const req = {
      body: { email: "", password: "foobar" },
      session: { user: undefined },
    };

    // @ts-ignore
    await AuthLogin(req, resMock);
    expect(req.session.user).toBeUndefined();
  });
});

describe("AuthLogout", () => {
  it("session is cleared after logout", async () => {
    const req = {
      session: { user: dummyUserResponse },
    };

    // @ts-ignore
    await AuthLogout(req, resMock);
    expect(req.session.user).toBeUndefined();
  });
});
