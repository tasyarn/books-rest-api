import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface BookAttributes {
  id?: string;
  title?: string | null;
  author?: string | null;
  year?: number | null;
  categoryId?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookInput extends Optional<BookAttributes, 'id'> {}
export interface BookOutput extends Required<BookAttributes> {}

class Book extends Model<BookAttributes, BookInput> implements BookAttributes {
  public id!: string;
  public title!: string;
  public author!: string;
  public year!: number;
  public categoryId!: string;

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
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.UUID,
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
