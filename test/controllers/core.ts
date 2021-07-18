export const resMock = {
  status(code: number) {
    this.result.status = code;
    return this;
  },
  send: () => resMock,
  json: () => resMock,
  result: { status: undefined as number | undefined }, // 処理の結果を保存しておくためのオブジェクト
};
