import { AuthCheck, AuthLogin, AuthLogout } from "../../src/controllers/auth";
import { UserRepository } from "../../src/repositories/user";
import bcrypt from "bcryptjs";
import { FastifyRequest } from "fastify";
import { UnauthorizedException } from "../../src/controllers/core";

jest.mock("../../src/repositories/user");

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
      session: { isLoggedIn: undefined },
    };

    await AuthLogin(req as any);
    expect(req.session.isLoggedIn).toBe(true);
  });

  it("do not write to session after login failed", async () => {
    const req = {
      body: { email: "", password: "foobar" },
      session: { isLoggedIn: undefined },
    };

    await AuthLogin(req as any).catch(() => {});
    expect(req.session.isLoggedIn).toBeFalsy();
  });
});

describe("AuthCheck", () => {
  it("status code 200 if logged in", async () => {
    const req = { session: { isLoggedIn: true } };
    const result = await AuthCheck(req as any);
    expect(result).toBe("ok");
  });

  it("status code 401 if not logged in", () => {
    const req = { session: { user: undefined } };
    return expect(AuthCheck(req as any)).rejects.toThrowError(
      UnauthorizedException
    );
  });
});

describe("AuthLogout", () => {
  it("session is cleared after logout", async () => {
    const req = {
      session: { isLoggedIn: true },
    } as unknown as FastifyRequest;

    await AuthLogout(req);
    expect(req.session.isLoggedIn).toBe(false);
  });
});
