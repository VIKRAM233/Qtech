import express, { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    return res.status(200).json({ username, password });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    return res.status(200).json({ username, password });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};
