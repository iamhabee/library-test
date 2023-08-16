import { Request, Response } from "express";
import { User } from "../models/user";

export async function createUser(req: Request, res: Response) {
  const { firstName, lastName, email } = req.body;
  try {
    let user = await User.create(
      {
        email,
        firstName,
        lastName,
      },
      {
        fields: ["email", "firstName", "lastName"],
      }
    );
    return res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json("received");
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll({
      atributes: ["id", "title", "description", "year", "url"],
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}