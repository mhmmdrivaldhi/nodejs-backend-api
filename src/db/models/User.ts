import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface UserAttributes {
  id?: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  roleId?: number | null;
  accessToken?: string | null;
  verified?: boolean | null;
  active?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string | null;
  public email!: string | null;
  public password!: string | null;
  public roleId!: number | null;
  public accessToken!: string | null;
  public verified!: boolean | null;
  public active!: boolean | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  name: {
    field: "name",
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    field: "email",
    allowNull: true,
    type: DataTypes.STRING,
  },
  password: {
    field: "password",
    allowNull: true,
    type: DataTypes.TEXT,
  },
  roleId: {
    field: "roleId",
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  accessToken: {
    field: "accessToken",
    allowNull: true,
    type: DataTypes.TEXT,
  },
  verified: {
    field: "verified",
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  active: {
    field: "active",
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    field: "createdAt",
    allowNull: true,
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updatedAt",
    allowNull: true,
    type: DataTypes.DATE,
  }
}, {
  sequelize: connection,
  underscored: true,
});

export default Users;