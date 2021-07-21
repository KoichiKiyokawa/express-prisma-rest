import bcrypt from "bcryptjs";
import { UnauthorizedException } from "../core/controller";
import { DummySession } from "../core/session.dummy";
import { UserRepository } from "../user/repository";
import { AuthCheck, AuthLogin, AuthLogout } from "./controller";

jest.mock("../user/repository");

const dummyUserResponse = {
  email: "dummy@example.com",
  password: bcrypt.hashSync("hogehoge"),
};

describe("AuthLogin", () => {
  (UserRepository.findByEmail as jest.Mock).mockResolvedValue(
    dummyUserResponse
  );

  it("write to session after login success", async () => {
    const req = {
      body: { email: "", password: "hogehoge" },
      session: new DummySession({ isLoggedIn: undefined }),
    };

    await AuthLogin(req as any);
    expect(req.session.get("isLoggedIn")).toBe(true);
  });

  it("do not write to session after login failed", async () => {
    const req = {
      body: { email: "", password: "foobar" },
      session: new DummySession({ isLoggedIn: undefined }),
    };

    await AuthLogin(req as any).catch(() => {});
    expect(req.session.get("isLoggedIn")).toBeFalsy();
  });
});

describe("AuthCheck", () => {
  it("status code 200 if logged in", async () => {
    const req = { session: new DummySession({ isLoggedIn: true }) };
    const result = await AuthCheck(req as any);
    expect(result).toBe("ok");
  });

  it("status code 401 if not logged in", () => {
    const req = { session: new DummySession({ user: undefined }) };
    return expect(AuthCheck(req as any)).rejects.toThrowError(
      UnauthorizedException
    );
  });
});

describe("AuthLogout", () => {
  it("session is cleared after logout", async () => {
    const req = {
      session: new DummySession({ isLoggedIn: true }),
    };

    await AuthLogout(req as any);
    expect(req.session.get("isLoggedIn")).toBe(false);
  });
});
