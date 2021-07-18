import express from "express";

export const respondInternalServerError = (
  res: express.Response,
  message: string
) => {
  res.status(500).json({ message });
};

export const respondOK = (res: express.Response, message: string) => {
  res.status(200).send({ message });
};

export const respondUnauthorized = (res: express.Response, message: string) => {
  res.status(401).send({ message });
};
