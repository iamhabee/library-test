import { Request, Response } from "express";
import { Author } from "../models/author";
import { User } from "../models/user";

export async function createAuthor(req: Request, res: Response) {
  const { origin, age, userId } = req.body;
  try {
    let author = await Author.create(
      {
        age,
        origin,
        userId
      },
      {
        fields: ["age", "origin", "userId"],
      }
    );
    return res.json(author);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json("received");
}

export async function getAuthors(req: Request, res: Response) {
  try {
    const author = await Author.findAll({
      atributes: ["id", "origin", "age"],
      include: [
        {
          model: User
        }
      ]
    });
    res.json(author);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}