import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface CategoryAttributes {
  id?: string;
  name?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id'> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
  public id!: string;
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
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
