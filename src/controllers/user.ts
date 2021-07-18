import express from "express"

export const UserIndex: express.Handler = (req, res) => {
  res.send("hoge")
}
