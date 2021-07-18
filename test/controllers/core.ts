export const resMock = {
  status(code: number) {
    this.result.status = code;
    return this;
  },
  send: () => resMock,
  setHeader: () => {},
  json(obj: any) {
    this.result.json = obj;
    return this;
  },
  // 処理の結果を保存しておくためのオブジェクト
  result: {
    status: undefined as number | undefined,
    json: undefined as any,
  },
};
