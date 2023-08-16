import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database";
import { Book } from "./book";

export const Author = sequelize.define(
  "authors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    origin: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

Book.belongsTo(Author, { foreinkey: "authorId" });
Author.hasMany(Book, { foreinkey: "authorId" });