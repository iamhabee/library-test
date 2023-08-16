// import { Author } from "../models/author";
import { Request, Response } from "express";
import { Book } from "../models/book";
import { Author } from "../models/author";
import { User } from "../models/user";


export async function getBooks(req: Request, res: Response) {
  try {
    const books = await Book.findAll({
      atributes: ["id", "title", "description", "year", "url"],
      include: [
        {
          model: Author,
          include: User, // Include User associated with the Author
        },
      ],
    });
    res.json(books);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createBook(req: Request, res: Response) {
  const { title, year, description, url, authorId } = req.body;
  try {
    let newProject = await Book.create(
      {
        title,
        year,
        description,
        url,
        authorId
      },
      {
        fields: ["title", "year", "description", "url", "authorId"],
      }
    );
    return res.json(newProject);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
  // res.json("received");
}

export async function getBook(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const book = await Book.findOne({
      where: {
        id,
      },
    });
    res.json(book);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, url, description } = req.body;

    const book = await Book.findByPk(id);
    book.title = name;
    book.url = url;
    book.description = description;
    await book.save();

    res.json(book);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;
  try {
    // await Author.destroy({
    //   where: {
    //     projectId: id,
    //   },
    // });
    await Book.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAuthorBooks(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const books = await Book.findAll({
      attributes: ["id", "authorId", "title", "description"],
      where: { authorId: id },
    });
    res.json(books);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}