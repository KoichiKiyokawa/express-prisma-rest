import { UnauthorizedException } from "../core/controller";
import { DummySession } from "../core/session.dummy";
import { UserCreate, UserIndex } from "./controller";
import { UserRepository } from "./repository";

jest.mock("./repository");

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
    const req = { session: new DummySession({ isLoggedIn: undefined }) } as any;
    return expect(UserIndex(req)).rejects.toThrow(UnauthorizedException);
  });

  it("default use case", async () => {
    const req = { session: new DummySession({ isLoggedIn: true }) } as any;
    const result = await UserIndex(req);
    expect(result).toEqual([{ ...dummyUser, id: "hoge" }]);
  });
});

describe("User controller create", () => {
  it("auth guard", () => {
    const req = { session: new DummySession({ isLoggedIn: undefined }) } as any;
    return expect(UserCreate(req)).rejects.toThrow(UnauthorizedException);
  });

  it("default use case", async () => {
    const req = {
      session: new DummySession({ isLoggedIn: true }),
      body: dummyUser,
    } as any;

    const result = await UserCreate(req);
    expect(result).toEqual({ ...dummyUser, id: "hoge" });
  });
});
