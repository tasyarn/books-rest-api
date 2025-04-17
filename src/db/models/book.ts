import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface BookAttributes {
  id?: number;
  title?: string | null;
  author?: string | null;
  year?: number | null;
  categoryId?: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookInput extends Optional<BookAttributes, 'id'> {}
export interface BookOutput extends Required<BookAttributes> {}

class Book extends Model<BookAttributes, BookInput> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public year!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  }
}

Book.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    author: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    year: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connection,
    modelName: "book",
    tableName: "Books",
    timestamps: true,
    underscored: false,
  }
);

export default Book;
