import { UserCreate, UserIndex } from "../../src/controllers/user";
import { resMock } from "./core";
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
  it("auth guard", async () => {
    const req = { session: { user: undefined } } as any;
    await UserIndex(req, resMock as any);
    expect(resMock.result.status).toBe(401);
  });

  it("default use case", async () => {
    const req = { session: { user: {} } } as any; // logged in
    await UserIndex(req, resMock as any);
    expect(resMock.result.status).toBe(200);
    expect(resMock.result.json).toEqual([{ ...dummyUser, id: "hoge" }]);
  });
});

describe("User controller create", () => {
  it("auth guard", async () => {
    const req = { session: { user: undefined } } as any;
    UserCreate(req, resMock as any);
    expect(resMock.result.status).toBe(401);
  });

  it("default use case", async () => {
    const req = {
      session: { user: {} },
      body: dummyUser,
    } as any; // logged in

    await UserCreate(req, resMock as any);
    expect(resMock.result.status).toBe(200);
    expect(resMock.result.json).toEqual({ ...dummyUser, id: "hoge" });
  });
});
