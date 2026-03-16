import { Request, Response } from "express";
import Roles from "../db/models/Role";

export const getRoles = async(req: Request, res: Response): Promise<void> => {
    try {
        const roles = await Roles.findAll({
                where: { active: true }
        });
        res.status(200).send({
            message: "Roles fetched succcessfully",
            data: roles
        });
    } catch (error) {
        if (error != null && error instanceof Error) {
            res.status(500).send({
                message: error.message,
                errors: error
            });
            return;
        }
        res.status(500).send({
            message: "Interal server error",
            errors: error
        })
        return;
    }
}

export const getRoleById = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "Invalid role ID"
            });
            return;
        }
        const role = await Roles.findByPk(id);
        if (!role) {
            res.status(404).send({
                message: "Role not found"
            });
            return;
        }
        res.status(200).send({
            message: "Role fetched successfully",
            data: role
        });
    } catch (error) {
        if (error != null && error instanceof Error) {
            res.status(500).send({
                message: error.message,
                errors: error
            });
            return;
        }        res.status(500).send({
            message: "Interal server error",
            errors: error
        })
        return;
    }
}

export const createRole = async(req: Request, res: Response): Promise<void> => {
    try {
        const { roleName, active } = req.body;
        const newRole = await Roles.create({
            roleName,
            active
        });
        res.status(201).send({
            message: "Role created successfully",
            data: newRole
        });
    } catch (error) {
        if (error != null && error instanceof Error) {
            res.status(500).send({
                message: error.message,
                errors: error
            });
            return;
        }
        res.status(500).send({
            message: "Interal server error",
            errors: error
        })
        return;
    }
}

export const updateRole = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "Invalid role ID"
            });
            return;
        }

        const { roleName, active } = req.body;
        const role = await Roles.findByPk(id);
        if (!role) {
            res.status(404).send({
                message: "Role not found"
            });
            return;
        }

        role.roleName = roleName;
        role.active = active;
        await role.save();

        res.status(200).send({
            message: "Role updated successfully",
            data: role
        });
    } catch (error) {
        if (error != null && error instanceof Error) {
            res.status(500).send({
                message: error.message,
                errors: error
            });
            return;
        }
        res.status(500).send({
            message: "Interal server error",
            errors: error
        })
        return;
    }
}

export const deleteRole = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                message: "Invalid role ID"
            });
            return;
        }

        const role = await Roles.findByPk(id);
        if (!role) {
            res.status(404).send({
                message: "Role not found"
            });
            return;
        }

        await role.destroy();
        res.status(200).send({
            message: "Role deleted successfully"
        });
    } catch (error) {
        if (error != null && error instanceof Error) {
            res.status(500).send({
                message: error.message,
                errors: error
            });
            return;
        }
        res.status(500).send({
            message: "Interal server error",
            errors: error
        })
        return;
    }
}
