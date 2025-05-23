import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface UserAttributes {
  id?: string;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public refreshToken?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // define association here
    // Example: User.hasMany(models.Book)
  }
}

User.init(
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
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "user",
    tableName: "Users",
    timestamps: true,
    underscored: false,
  }
);

export default User;
