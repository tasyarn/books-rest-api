import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface CategoryAttributes {
  id?: number;
  name?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id'> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'books',
    });
  }
}

Category.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: "category",
    tableName: "Categories",
    timestamps: true,
    underscored: false,
  }
);

export default Category;
