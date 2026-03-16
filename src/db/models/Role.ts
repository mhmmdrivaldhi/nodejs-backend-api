import {DataTypes, Model, Optional} from 'sequelize';
import connection from '../../config/dbConnect';

interface RoleAttributes {
    id?: number;
    roleName?: string | null;
    active?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Roles extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    public id!: number;
    public roleName!: string | null;
    public active!: boolean | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Roles.init(
    {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        roleName: {
          field: "roleName",
          allowNull: true,
          type: DataTypes.STRING,
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
    })

export default Roles;