import { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { Author } from "./author";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  {
    timestamps: false,
  }
);


User.hasOne(Author, { foreignKey: 'userId' }); // Adds userId column to User table
Author.belongsTo(User, { foreignKey: 'userId' });