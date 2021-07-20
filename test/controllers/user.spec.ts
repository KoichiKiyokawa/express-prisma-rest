import { UnauthorizedException } from "../../src/controllers/core";
import { UserCreate, UserIndex } from "../../src/controllers/user";
import { UserRepository } from "../../src/repositories/user";

jest.mock("../../src/repositories/user");

const dummyUser = { email: "hoge@example.com", password: "hogehoge" };

(UserRepository.all as jest.Mock).mockResolvedValue([
  {
    ...dummyUser,
    id: "hoge",
  },
]);

(UserRepository.create as jest.Mock).mockResolvedValue({
  ...dummyUser,
  id: "hoge",
});

describe("User controller index", () => {
  it("auth guard", () => {
    const req = { session: { isLoggedIn: undefined } } as any;
    return expect(UserIndex(req)).rejects.toThrow(UnauthorizedException);
  });

  it("default use case", async () => {
    const req = { session: { isLoggedIn: true } } as any;
    const result = await UserIndex(req);
    expect(result).toEqual([{ ...dummyUser, id: "hoge" }]);
  });
});

describe("User controller create", () => {
  it("auth guard", () => {
    const req = { session: { user: undefined } } as any;
    return expect(UserCreate(req)).rejects.toThrow(UnauthorizedException);
  });

  it("default use case", async () => {
    const req = {
      session: { isLoggedIn: true },
      body: dummyUser,
    } as any;

    const result = await UserCreate(req);
    expect(result).toEqual({ ...dummyUser, id: "hoge" });
  });
});
